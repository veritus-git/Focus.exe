import React, { useState, useMemo, useRef, useEffect } from "react";
import { ReactFlow, Background, Controls, Edge, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTranslation } from "react-i18next";
import { GitBranch, Minus, Maximize2, Minimize2, X } from "lucide-react";
import { CustomSkillNode } from "./CustomSkillNode";
import { LessonModal } from "./LessonModal";
import { useOSStore } from "../../store/useOSStore";
import { useSkillTreeStore } from "../../store/useSkillTreeStore";
import { LEVEL_0, TRACKS } from "../../content/courseIndex";

// ═══════════════════════════════════════════════════════════════════
// Layout constants — positions for the branching skill map
// ═══════════════════════════════════════════════════════════════════

const COL_SPACING = 300;
const ROW_SPACING = 180;

// Track positions — arranged to minimize cross-track edge crossings.
// Tracks with cross-dependencies are placed adjacent to each other:
//   HW ↔ CRYPTO (sha256 needs hw-bit)
//   CODE ↔ AI (AI needs code-variables)
//   MATH is central (connects to AI, CRYPTO, AUDIO, ENG)
//   NET ↔ ENG (GPS needs net-ip)
const TRACK_POSITIONS: Record<string, { col: number }> = {
  hardware:     { col: -3.5 },
  crypto:       { col: -2.5 },
  programming:  { col: -1.5 },
  ai:           { col: -0.5 },
  math:         { col: 0.5 },
  audio:        { col: 1.5 },
  internet:     { col: 2.5 },
  engineering:  { col: 3.5 },
};

export const SkillTreeWindow: React.FC = () => {
  const { t } = useTranslation();
  const { closeWindow, toggleMinimizeWindow, focusWindow, minimizedWindows } = useOSStore();
  const { selectedNodeId, nodes: nodeStates } = useSkillTreeStore();

  const isMinimized = minimizedWindows.includes("skillTree");
  const [isMaximized, setIsMaximized] = useState(true);
  const [windowPos, setWindowPos] = useState({ x: 60, y: 60 });
  const [activeLessonNodeId, setActiveLessonNodeId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const reactFlowInstance = useRef<any>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, posX: 60, posY: 60 });

  // Auto-fit canvas on maximize toggle
  useEffect(() => {
    if (reactFlowInstance.current) {
      const timer = setTimeout(() => {
        reactFlowInstance.current?.fitView({ padding: 0.3, duration: 250 });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isMaximized]);

  // Smooth RequestAnimationFrame Window Dragging
  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    focusWindow("skillTree");
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: windowPos.x,
      posY: windowPos.y,
    };

    let rafId: number | null = null;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const deltaX = moveEvent.clientX - dragStartRef.current.startX;
        const deltaY = moveEvent.clientY - dragStartRef.current.startY;
        setWindowPos({
          x: Math.max(10, dragStartRef.current.posX + deltaX),
          y: Math.max(10, dragStartRef.current.posY + deltaY),
        });
      });
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleStartLesson = (nodeId: string) => {
    setActiveLessonNodeId(nodeId);
  };

  const nodeTypes = useMemo(() => ({ customSkill: CustomSkillNode }), []);

  // ═══════════════════════════════════════════════════════════════
  // Build ReactFlow nodes & edges from courseIndex
  // ═══════════════════════════════════════════════════════════════

  const { flowNodes, flowEdges } = useMemo(() => {
    const fNodes: Node[] = [];
    const fEdges: Edge[] = [];
    const centerX = 500;
    const topY = 40;

    // ── Level 0 node (centered at top) ──
    fNodes.push({
      id: LEVEL_0.id,
      type: "customSkill",
      position: { x: centerX + 0.5 * COL_SPACING, y: topY },
      data: {
        nodeId: LEVEL_0.id,
        titleKey: LEVEL_0.titleKey,
        icon: LEVEL_0.icon,
        isLevel0: true,
        onStartLesson: handleStartLesson,
      },
    });

    // ── Track nodes ──
    for (const track of TRACKS) {
      const pos = TRACK_POSITIONS[track.id] || { col: 0 };

      for (let li = 0; li < track.lessons.length; li++) {
        const lesson = track.lessons[li];
        const x = centerX + pos.col * COL_SPACING;
        const y = topY + (li + 1) * ROW_SPACING;

        fNodes.push({
          id: lesson.id,
          type: "customSkill",
          position: { x, y },
          data: {
            nodeId: lesson.id,
            titleKey: lesson.titleKey,
            icon: lesson.icon,
            trackColor: track.color,
            trackIcon: track.icon,
            onStartLesson: handleStartLesson,
          },
        });

        // Create edges for prerequisites
        for (const reqId of lesson.requires) {
          const sourceState = nodeStates[reqId];
          const isSourceCompleted = sourceState?.status === "completed";

          // Use bezier for cross-track edges (they curve nicely),
          // smoothstep for same-track (straight vertical lines)
          const isSameTrack = track.lessons.some((l) => l.id === reqId);
          const isFromLevel0 = reqId === "what-is-information";

          fEdges.push({
            id: `e-${reqId}-${lesson.id}`,
            source: reqId,
            target: lesson.id,
            type: isSameTrack || isFromLevel0 ? "smoothstep" : "default",
            animated: isSourceCompleted,
            style: {
              stroke: isSourceCompleted ? track.color : "#475569",
              strokeWidth: isSourceCompleted ? 3 : 2,
              opacity: isSourceCompleted ? 1 : 0.4,
            },
          });
        }
      }
    }

    return { flowNodes: fNodes, flowEdges: fEdges };
  }, [nodeStates]);

  // Apply z-index for selected node
  const nodes = useMemo(() => {
    return flowNodes.map((n) => ({
      ...n,
      zIndex: selectedNodeId === n.id ? 1000 : 1,
    }));
  }, [flowNodes, selectedNodeId]);

  return (
    <>
      <div
        onMouseDown={() => focusWindow("skillTree")}
        style={{
          position: isMaximized ? "fixed" : "fixed",
          top: 0,
          left: 0,
          transform: !isMaximized
            ? `translate3d(${windowPos.x}px, ${windowPos.y}px, 0)`
            : undefined,
          willChange: "transform",
        }}
        className={`${
          isMaximized
            ? "fixed inset-0 top-0 left-0 w-screen h-[calc(100vh-44px)] rounded-none"
            : "w-[85vw] h-[75vh] max-w-[1100px] max-h-[750px] rounded-2xl border border-white/20 shadow-2xl"
        } bg-slate-950 flex flex-col z-30 select-none overflow-hidden ${
          !isDragging ? "transition-all duration-300 ease-in-out" : ""
        } ${
          isMinimized ? "scale-95 opacity-0 pointer-events-none translate-y-8" : "scale-100 opacity-100 translate-y-0"
        }`}
      >
        {/* Titlebar */}
        <div
          onMouseDown={handleTitleMouseDown}
          className={`h-9 px-4 bg-slate-900 border-b border-white/10 flex items-center justify-between ${
            !isMaximized ? "cursor-grab active:cursor-grabbing" : ""
          }`}
        >
          <div className="flex items-center gap-2 text-white font-pixel text-xs tracking-wide">
            <GitBranch size={14} className="text-[#ffd700]" />
            <span className="font-bold">{t("skillTree.windowTitle")}</span>
          </div>

          <div className="flex items-center gap-2" onMouseDown={(e) => e.stopPropagation()}>
            <button
              onClick={() => toggleMinimizeWindow("skillTree")}
              className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-white/20 rounded flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
              title={t("taskbar.minimize")}
            >
              <Minus size={12} />
            </button>

            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-white/20 rounded flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
              title={isMaximized ? t("taskbar.restore") : t("taskbar.maximize")}
            >
              {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
            </button>

            <button
              onClick={() => closeWindow("skillTree")}
              className="w-6 h-6 bg-rose-950/80 hover:bg-rose-800 border border-rose-500/40 rounded flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
              title={t("taskbar.close")}
            >
              <X size={12} />
            </button>
          </div>
        </div>

        {/* Canvas Container */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center">
          <ReactFlow
            nodes={nodes}
            edges={flowEdges}
            nodeTypes={nodeTypes}
            onInit={(instance) => {
              reactFlowInstance.current = instance;
              instance.fitView({ padding: 0.25 });
            }}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            minZoom={0.25}
            maxZoom={1.4}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#334155" gap={32} size={1} />
            <Controls className="!bg-slate-900 !border !border-white/20 !text-white !fill-white" />
          </ReactFlow>
        </div>
      </div>

      {/* Interactive Lesson Modal Popover */}
      {activeLessonNodeId && (
        <LessonModal
          nodeId={activeLessonNodeId}
          onClose={() => setActiveLessonNodeId(null)}
        />
      )}
    </>
  );
};
