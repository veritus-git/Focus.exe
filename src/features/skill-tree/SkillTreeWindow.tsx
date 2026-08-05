import React, { useState, useMemo } from "react";
import { ReactFlow, Background, Controls, Edge, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTranslation } from "react-i18next";
import { GitBranch, Minus, Maximize2, Minimize2, X } from "lucide-react";
import { CustomSkillNode } from "./CustomSkillNode";
import { useOSStore } from "../../store/useOSStore";

export const SkillTreeWindow: React.FC = () => {
  const { t } = useTranslation();
  const { closeWindow, toggleMinimizeWindow } = useOSStore();
  const [isMaximized, setIsMaximized] = useState(true);

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

  const windowContainerClasses = isMaximized
    ? "fixed inset-0 top-0 left-0 w-screen h-[calc(100vh-44px)] rounded-none"
    : "fixed top-12 left-12 w-[900px] h-[600px] rounded-xl border border-white/20 shadow-2xl";

  return (
    <div
      className={`${windowContainerClasses} bg-slate-950 flex flex-col z-30 select-none shadow-2xl transition-all duration-200 overflow-hidden`}
    >
      {/* Sleek Titlebar */}
      <div className="h-9 px-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-pixel text-[11px] tracking-wide">
          <GitBranch size={14} className="text-[#ffd700]" />
          <span className="font-bold">{t("skillTree.windowTitle")}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Minimalize */}
          <button
            onClick={() => toggleMinimizeWindow("skillTree")}
            className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-white/20 rounded flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
            title="Minimalizuj"
          >
            <Minus size={12} />
          </button>

          {/* Toggle Fullscreen / Maximize / Restore */}
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-white/20 rounded flex items-center justify-center text-white cursor-pointer active:scale-95 transition-all"
            title={isMaximized ? "Przywróć okno" : "Maksymalizuj"}
          >
            {isMaximized ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          </button>

          {/* Close Window */}
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
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.8}
          maxZoom={1.2}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#334155" gap={32} size={1} />
          <Controls className="!bg-slate-900 !border !border-white/20 !text-white !fill-white" />
        </ReactFlow>
      </div>
    </div>
  );
};
