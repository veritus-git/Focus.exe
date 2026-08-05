import React, { useState, useMemo, useRef, useEffect } from "react";
import { ReactFlow, Background, Controls, Edge, Node, ReactFlowInstance } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTranslation } from "react-i18next";
import { GitBranch, Minus, Maximize2, Minimize2, X } from "lucide-react";
import { CustomSkillNode } from "./CustomSkillNode";
import { LessonModal } from "./LessonModal";
import { useOSStore } from "../../store/useOSStore";

export const SkillTreeWindow: React.FC = () => {
  const { t } = useTranslation();
  const { closeWindow, toggleMinimizeWindow } = useOSStore();
  const [isMaximized, setIsMaximized] = useState(true);
  const [windowPos, setWindowPos] = useState({ x: 60, y: 60 });
  const [activeLessonNodeId, setActiveLessonNodeId] = useState<string | null>(null);

  const reactFlowInstance = useRef<ReactFlowInstance | null>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: 60,
    posY: 60,
  });

  // Automatically trigger fitView when maximize state changes so nodes scale seamlessly inside window
  useEffect(() => {
    if (reactFlowInstance.current) {
      setTimeout(() => {
        reactFlowInstance.current?.fitView({ padding: 0.25, duration: 300 });
      }, 50);
    }
  }, [isMaximized]);

  // Pointer Capture based 60 FPS Buttery-Smooth Window Dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isMaximized) return;
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    e.currentTarget.setPointerCapture(e.pointerId);

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: windowPos.x,
      posY: windowPos.y,
    };

    let rafId: number | null = null;

    const handlePointerMove = (moveEvent: PointerEvent) => {
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

    const handlePointerUp = (upEvent: PointerEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      e.currentTarget.releasePointerCapture(upEvent.pointerId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const handleStartLesson = (nodeId: string) => {
    setActiveLessonNodeId(nodeId);
  };

  const nodeTypes = useMemo(() => ({ customSkill: CustomSkillNode }), []);

  const initialNodes: Node[] = [
    {
      id: "node_1",
      type: "customSkill",
      position: { x: 450, y: 40 },
      data: {
        nodeId: "node_1",
        titleKey: "skillTree.node1Title",
        levelNumber: 1,
        onStartLesson: handleStartLesson,
      },
    },
    {
      id: "node_2",
      type: "customSkill",
      position: { x: 450, y: 220 },
      data: {
        nodeId: "node_2",
        titleKey: "skillTree.node2Title",
        levelNumber: 2,
        onStartLesson: handleStartLesson,
      },
    },
    {
      id: "node_3",
      type: "customSkill",
      position: { x: 450, y: 400 },
      data: {
        nodeId: "node_3",
        titleKey: "skillTree.node3Title",
        levelNumber: 3,
        onStartLesson: handleStartLesson,
      },
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: "e1-2",
      source: "node_1",
      target: "node_2",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#ffd700", strokeWidth: 3 },
    },
    {
      id: "e2-3",
      source: "node_2",
      target: "node_3",
      type: "smoothstep",
      animated: false,
      style: { stroke: "#475569", strokeWidth: 2 },
    },
  ];

  return (
    <>
      <div
        ref={windowRef}
        style={
          !isMaximized
            ? { transform: `translate3d(${windowPos.x}px, ${windowPos.y}px, 0)` }
            : undefined
        }
        className={`${
          isMaximized
            ? "fixed inset-0 top-0 left-0 w-screen h-[calc(100vh-44px)] rounded-none"
            : "fixed top-0 left-0 w-[85vw] h-[75vh] max-w-[1100px] max-h-[750px] rounded-2xl border border-white/20 shadow-2xl"
        } bg-slate-950 flex flex-col z-30 select-none overflow-hidden transition-shadow duration-150`}
      >
        {/* Titlebar with Pointer Capture Dragging */}
        <div
          onPointerDown={handlePointerDown}
          className={`h-9 px-4 bg-slate-900 border-b border-white/10 flex items-center justify-between touch-none ${
            !isMaximized ? "cursor-grab active:cursor-grabbing" : ""
          }`}
        >
          <div className="flex items-center gap-2 text-white font-pixel text-xs tracking-wide">
            <GitBranch size={14} className="text-[#ffd700]" />
            <span className="font-bold">{t("skillTree.windowTitle")}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Minimize */}
            <button
              onClick={() => toggleMinimizeWindow("skillTree")}
              className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-white/20 rounded flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
              title="Minimalizuj"
            >
              <Minus size={12} />
            </button>

            {/* Maximize / Restore */}
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-white/20 rounded flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
              title={isMaximized ? "Przywróć okno" : "Maksymalizuj"}
            >
              {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
            </button>

            {/* Close */}
            <button
              onClick={() => closeWindow("skillTree")}
              className="w-6 h-6 bg-rose-950/80 hover:bg-rose-800 border border-rose-500/40 rounded flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
              title="Zamknij okno"
            >
              <X size={12} />
            </button>
          </div>
        </div>

        {/* Centered Canvas Container */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden flex items-center justify-center">
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            nodeTypes={nodeTypes}
            onInit={(instance) => {
              reactFlowInstance.current = instance;
              instance.fitView({ padding: 0.25 });
            }}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            minZoom={0.6}
            maxZoom={1.3}
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
