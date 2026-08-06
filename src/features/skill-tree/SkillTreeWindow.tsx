import React, { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { ReactFlow, Background, Controls, Edge, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTranslation } from "react-i18next";
import { GitBranch, Minus, Maximize2, Minimize2, X, Trash2 } from "lucide-react";
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
  const { selectNode, nodes: nodeStates, resetProgress } = useSkillTreeStore();
  const selectedNodeId = useSkillTreeStore((state) => state.selectedNodeId);

  const isMinimized = minimizedWindows.includes("skillTree");
  const [isMaximized, setIsMaximized] = useState(true);
  const [windowPos, setWindowPos] = useState({ x: 60, y: 60 });
  const windowContainerRef = useRef<HTMLDivElement>(null);
  const windowPosRef = useRef({ x: 60, y: 60 });
  const [activeLessonNodeId, setActiveLessonNodeId] = useState<string | null>(null);

  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [resetInput, setResetInput] = useState("");

  const reactFlowInstance = useRef<any>(null);
  const isDraggingRef = useRef(false);
  const prevViewRef = useRef<{ x: number; y: number; zoom: number } | null>(null);

  useEffect(() => {
    if (reactFlowInstance.current) {
      const timer = setTimeout(() => {
        reactFlowInstance.current?.fitView({ padding: 0.15, duration: 250 });
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [isMaximized]);

  // Zoom to node when selected (delayed to allow re-render to finish for smooth animation)
  useEffect(() => {
    if (!reactFlowInstance.current) return;
    
    const timer = setTimeout(() => {
      if (selectedNodeId && P[selectedNodeId]) {
        if (!prevViewRef.current) {
          const vp = reactFlowInstance.current.getViewport();
          prevViewRef.current = { x: vp.x, y: vp.y, zoom: vp.zoom };
        }
        const pos = P[selectedNodeId];
        // X + 32 centers the node horizontally (compensating for the node's 64px width)
        reactFlowInstance.current.setCenter(pos.x + 32, pos.y + 150, { zoom: 1.25, duration: 500 });
      } else if (!selectedNodeId && prevViewRef.current) {
        reactFlowInstance.current.setViewport(prevViewRef.current, { duration: 400 });
        prevViewRef.current = null;
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, [selectedNodeId]);

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;
    focusWindow("skillTree");
    isDraggingRef.current = true;

    const startX = e.clientX;
    const startY = e.clientY;
    const startPosX = windowPosRef.current.x;
    const startPosY = windowPosRef.current.y;
    const el = windowContainerRef.current;
    
    // Make entire window "dumb" during drag to skip hit-testing
    if (el) {
      el.classList.add("is-dragging-window");
      el.classList.remove("window-transition"); // CRITICAL: Stop CSS from animating the drag
    }

    const handleMouseMove = (me: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const newX = Math.max(10, startPosX + me.clientX - startX);
      const newY = Math.max(10, startPosY + me.clientY - startY);
      windowPosRef.current.x = newX;
      windowPosRef.current.y = newY;

      // ═══ DIRECT DOM — ZERO REACT RENDERS ═══
      if (el) {
        el.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      }
    };
    const handleMouseUp = () => {
      isDraggingRef.current = false;
      if (el) {
        el.classList.remove("is-dragging-window");
        el.classList.add("window-transition"); // Restore minimize/maximize animations
      }
      // Sync to React state ONCE on drag end
      setWindowPos({ x: windowPosRef.current.x, y: windowPosRef.current.y });
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
          fEdges.push({
            id: `e-${reqId}-${lesson.id}`, source: reqId, target: lesson.id,
            type: "default",
            animated: done,
            style: { stroke: done ? track.color : "#334155", strokeWidth: done ? 3 : 1.5, opacity: done ? 0.9 : 0.25 },
          });
        }
      }
    }
    return { flowNodes: fNodes, flowEdges: fEdges };
  }, [nodeStates, handleStartLesson]);

  const nodes = flowNodes;

  return (
    <>
      <div
        ref={windowContainerRef}
        onMouseDown={() => focusWindow("skillTree")}
        style={{
          position: "fixed", top: 0, left: 0,
          transform: !isMaximized ? `translate3d(${windowPos.x}px, ${windowPos.y}px, 0)` : undefined,
          willChange: "transform",
        }}
        className={`${
          isMaximized ? "fixed inset-0 w-screen h-[calc(100vh-44px)] rounded-none"
            : "w-[85vw] h-[75vh] max-w-[1100px] max-h-[750px] rounded-2xl border border-white/20 shadow-2xl"
        } bg-slate-950 flex flex-col z-30 select-none overflow-hidden window-transition ${
          isMinimized ? "scale-95 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        }`}
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

          {/* Reset Button */}
          <div className="absolute bottom-4 right-4 z-50">
            {!showResetConfirm ? (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="flex items-center gap-2 px-3 py-2 bg-slate-900/80 hover:bg-rose-950/80 border border-slate-700 hover:border-rose-500/50 rounded-xl text-slate-400 hover:text-rose-400 transition-all backdrop-blur-sm cursor-pointer"
              >
                <Trash2 size={14} />
                <span className="font-pixel text-[10px] uppercase font-bold">{t("skillTree.resetProgress")}</span>
              </button>
            ) : (
              <div className="bg-slate-900 border border-rose-500/50 rounded-xl p-3 shadow-2xl backdrop-blur-md flex flex-col gap-3 w-[220px] animate-fade-in">
                <p className="text-[10px] font-pixel text-slate-300 leading-snug">
                  {t("skillTree.resetWarning")}
                </p>
                <input
                  type="text"
                  placeholder={t("skillTree.resetPlaceholder")}
                  value={resetInput}
                  onChange={(e) => setResetInput(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-xs text-white outline-none focus:border-rose-500 font-mono-retro"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setShowResetConfirm(false); setResetInput(""); }}
                    className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-pixel text-[10px] transition-all cursor-pointer"
                  >
                    {t("taskbar.cancel")}
                  </button>
                  <button
                    onClick={() => {
                      const lower = resetInput.trim().toLowerCase();
                      if (lower === "yes" || lower === "tak") {
                        resetProgress();
                        setShowResetConfirm(false);
                        setResetInput("");
                      }
                    }}
                    disabled={resetInput.trim().toLowerCase() !== "yes" && resetInput.trim().toLowerCase() !== "tak"}
                    className="flex-1 py-1.5 bg-rose-600 disabled:bg-slate-800 disabled:text-slate-500 hover:bg-rose-500 rounded-lg text-white font-pixel text-[10px] font-bold transition-all cursor-pointer"
                  >
                    RESET
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {activeLessonNodeId && (
        <LessonModal nodeId={activeLessonNodeId} onClose={() => setActiveLessonNodeId(null)} />
      )}
    </>
  );
};
