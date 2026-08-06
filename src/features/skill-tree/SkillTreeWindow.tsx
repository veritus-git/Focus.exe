import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
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
// Mind-map positions — organic layout, not a grid
// ═══════════════════════════════════════════════════════════════════
const P: Record<string, { x: number; y: number }> = {
  "what-is-information": { x: 2500, y: 50 },
  // HW (far left)
  "hw-how-bit-works": { x: 300, y: 400 }, "hw-logic-gates": { x: 150, y: 680 },
  "hw-cpu-instructions": { x: 350, y: 950 }, "hw-pipeline": { x: 120, y: 1230 },
  "hw-cache": { x: 420, y: 1230 }, "hw-ram": { x: 280, y: 1480 },
  "hw-ssd": { x: 500, y: 1700 }, "hw-multithreading": { x: 80, y: 1480 },
  // CRYPTO (near HW)
  "crypto-sha256": { x: 720, y: 580 }, "crypto-keys": { x: 880, y: 830 },
  "crypto-aes": { x: 760, y: 1100 }, "crypto-digital-signature": { x: 940, y: 1340 },
  // CODE (left-center)
  "code-variables": { x: 1300, y: 400 }, "code-functions": { x: 1180, y: 680 },
  "code-compiler-vs-interpreter": { x: 1380, y: 950 }, "code-callstack": { x: 1100, y: 950 },
  "code-stack-heap": { x: 1220, y: 1230 }, "code-pointers": { x: 1080, y: 1480 },
  // AI (between CODE and MATH)
  "ai-how-understands-text": { x: 1900, y: 580 }, "ai-tokenization": { x: 1720, y: 850 },
  "ai-embeddings": { x: 2060, y: 850 }, "ai-attention": { x: 1900, y: 1120 },
  "ai-transformer": { x: 1960, y: 1380 }, "ai-chatgpt": { x: 1800, y: 1630 },
  "ai-context-window": { x: 2120, y: 1630 },
  // MATH (center hub)
  "math-vectors": { x: 2600, y: 400 }, "math-derivatives": { x: 2440, y: 680 },
  "math-vector-space": { x: 2760, y: 680 }, "math-probability": { x: 2350, y: 950 },
  "math-matrices": { x: 2880, y: 950 }, "math-diff-eq": { x: 2500, y: 1230 },
  "math-gradient-descent": { x: 2720, y: 1480 },
  // AUDIO (right of math)
  "audio-pcm": { x: 3300, y: 400 }, "audio-fft": { x: 3180, y: 680 },
  "audio-spectrogram": { x: 3340, y: 950 }, "audio-vad": { x: 3220, y: 1230 },
  // NET (right)
  "net-ip-address": { x: 3800, y: 400 }, "net-dns": { x: 3680, y: 680 },
  "net-tcp": { x: 3960, y: 680 }, "net-what-happens-url": { x: 3820, y: 950 },
  "net-http": { x: 3780, y: 1230 }, "net-https": { x: 3960, y: 1480 },
  // ENG (far right)
  "eng-gps": { x: 4400, y: 580 }, "eng-imu": { x: 4280, y: 850 },
  "eng-lidar": { x: 4500, y: 1120 }, "eng-autopilot": { x: 4380, y: 1380 },
};

export const SkillTreeWindow: React.FC = () => {
  const { t } = useTranslation();
  const { closeWindow, toggleMinimizeWindow, focusWindow, minimizedWindows } = useOSStore();
  const { selectedNodeId, selectNode, nodes: nodeStates } = useSkillTreeStore();

  const isMinimized = minimizedWindows.includes("skillTree");
  const [isMaximized, setIsMaximized] = useState(true);
  const [windowPos, setWindowPos] = useState({ x: 60, y: 60 });
  const [activeLessonNodeId, setActiveLessonNodeId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const reactFlowInstance = useRef<any>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, posX: 60, posY: 60 });
  const prevViewRef = useRef<{ x: number; y: number; zoom: number } | null>(null);

  useEffect(() => {
    if (reactFlowInstance.current) {
      const timer = setTimeout(() => {
        reactFlowInstance.current?.fitView({ padding: 0.15, duration: 250 });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isMaximized]);

  // Zoom to node when selected
  useEffect(() => {
    if (!reactFlowInstance.current) return;
    if (selectedNodeId && P[selectedNodeId]) {
      const vp = reactFlowInstance.current.getViewport();
      prevViewRef.current = { x: vp.x, y: vp.y, zoom: vp.zoom };
      const pos = P[selectedNodeId];
      reactFlowInstance.current.setCenter(pos.x + 30, pos.y + 60, { zoom: 1.3, duration: 400 });
    } else if (!selectedNodeId && prevViewRef.current) {
      reactFlowInstance.current.setViewport(prevViewRef.current, { duration: 400 });
      prevViewRef.current = null;
    }
  }, [selectedNodeId]);

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;
    focusWindow("skillTree");
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartRef.current = { startX: e.clientX, startY: e.clientY, posX: windowPos.x, posY: windowPos.y };
    let rafId: number | null = null;
    const handleMouseMove = (me: MouseEvent) => {
      if (!isDraggingRef.current) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setWindowPos({
          x: Math.max(10, dragStartRef.current.posX + me.clientX - dragStartRef.current.startX),
          y: Math.max(10, dragStartRef.current.posY + me.clientY - dragStartRef.current.startY),
        });
      });
    };
    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleStartLesson = useCallback((nodeId: string) => {
    setActiveLessonNodeId(nodeId);
  }, []);

  // Click on empty canvas = deselect node
  const handlePaneClick = useCallback(() => {
    selectNode("");
  }, [selectNode]);

  const nodeTypes = useMemo(() => ({ customSkill: CustomSkillNode }), []);

  const { flowNodes, flowEdges } = useMemo(() => {
    const fNodes: Node[] = [];
    const fEdges: Edge[] = [];

    // Level 0
    const l0pos = P[LEVEL_0.id] || { x: 2500, y: 50 };
    fNodes.push({
      id: LEVEL_0.id, type: "customSkill", position: l0pos,
      data: { nodeId: LEVEL_0.id, titleKey: LEVEL_0.titleKey, icon: LEVEL_0.icon, isLevel0: true, onStartLesson: handleStartLesson },
    });

    for (const track of TRACKS) {
      for (const lesson of track.lessons) {
        const pos = P[lesson.id] || { x: 2500, y: 500 };
        fNodes.push({
          id: lesson.id, type: "customSkill", position: pos,
          data: { nodeId: lesson.id, titleKey: lesson.titleKey, icon: lesson.icon, trackColor: track.color, trackIcon: track.icon, onStartLesson: handleStartLesson },
        });

        for (const reqId of lesson.requires) {
          const srcState = nodeStates[reqId];
          const done = srcState?.status === "completed";
          const isSameTrack = track.lessons.some((l) => l.id === reqId) || reqId === LEVEL_0.id;
          fEdges.push({
            id: `e-${reqId}-${lesson.id}`, source: reqId, target: lesson.id,
            type: isSameTrack ? "smoothstep" : "default",
            animated: done,
            style: { stroke: done ? track.color : "#334155", strokeWidth: done ? 3 : 1.5, opacity: done ? 0.9 : 0.25 },
          });
        }
      }
    }
    return { flowNodes: fNodes, flowEdges: fEdges };
  }, [nodeStates, handleStartLesson]);

  const nodes = useMemo(() => flowNodes.map((n) => ({
    ...n, zIndex: selectedNodeId === n.id ? 1000 : 1,
  })), [flowNodes, selectedNodeId]);

  return (
    <>
      <div
        onMouseDown={() => focusWindow("skillTree")}
        style={{
          position: "fixed", top: 0, left: 0,
          transform: !isMaximized ? `translate3d(${windowPos.x}px, ${windowPos.y}px, 0)` : undefined,
          willChange: "transform",
        }}
        className={`${
          isMaximized ? "fixed inset-0 w-screen h-[calc(100vh-44px)] rounded-none"
            : "w-[85vw] h-[75vh] max-w-[1100px] max-h-[750px] rounded-2xl border border-white/20 shadow-2xl"
        } bg-slate-950 flex flex-col z-30 select-none overflow-hidden ${
          !isDragging ? "transition-all duration-300 ease-in-out" : ""
        } ${isMinimized ? "scale-95 opacity-0 pointer-events-none translate-y-8" : "scale-100 opacity-100 translate-y-0"}`}
      >
        <div
          onMouseDown={handleTitleMouseDown}
          className={`h-9 px-4 bg-slate-900 border-b border-white/10 flex items-center justify-between ${!isMaximized ? "cursor-grab active:cursor-grabbing" : ""}`}
        >
          <div className="flex items-center gap-2 text-white font-pixel text-xs tracking-wide">
            <GitBranch size={14} className="text-[#ffd700]" />
            <span className="font-bold">{t("skillTree.windowTitle")}</span>
          </div>
          <div className="flex items-center gap-2" onMouseDown={(e) => e.stopPropagation()}>
            <button onClick={() => toggleMinimizeWindow("skillTree")} className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-white/20 rounded flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all" title={t("taskbar.minimize")}><Minus size={12} /></button>
            <button onClick={() => setIsMaximized(!isMaximized)} className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-white/20 rounded flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all" title={isMaximized ? t("taskbar.restore") : t("taskbar.maximize")}>{isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}</button>
            <button onClick={() => closeWindow("skillTree")} className="w-6 h-6 bg-rose-950/80 hover:bg-rose-800 border border-rose-500/40 rounded flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all" title={t("taskbar.close")}><X size={12} /></button>
          </div>
        </div>

        <div className="flex-1 bg-slate-950 relative overflow-hidden">
          <ReactFlow
            nodes={nodes} edges={flowEdges} nodeTypes={nodeTypes}
            onInit={(inst) => { reactFlowInstance.current = inst; inst.fitView({ padding: 0.15 }); }}
            onPaneClick={handlePaneClick}
            fitView fitViewOptions={{ padding: 0.15 }}
            minZoom={0.15} maxZoom={1.6}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#1e293b" gap={40} size={1} />
            <Controls className="!bg-slate-900 !border !border-white/20 !text-white !fill-white" />
          </ReactFlow>
        </div>
      </div>

      {activeLessonNodeId && (
        <LessonModal nodeId={activeLessonNodeId} onClose={() => setActiveLessonNodeId(null)} />
      )}
    </>
  );
};
