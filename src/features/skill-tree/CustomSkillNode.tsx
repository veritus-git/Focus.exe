import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Lock, Check, Play } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSkillTreeStore } from "../../store/useSkillTreeStore";

interface CustomSkillNodeProps {
  data: {
    nodeId: string;
    titleKey: string;
    levelNumber: number;
  };
}

export const CustomSkillNode: React.FC<CustomSkillNodeProps> = ({ data }) => {
  const { t } = useTranslation();
  const { nodes, selectedNodeId, selectNode, completeNode } = useSkillTreeStore();
  const nodeState = nodes[data.nodeId] || { status: "locked", progress: 0 };
  const isSelected = selectedNodeId === data.nodeId;

  const isLocked = nodeState.status === "locked";
  const isCompleted = nodeState.status === "completed";
  const isActive = nodeState.status === "active";

  let floatAnimClass = "animate-float-node-1";
  if (data.levelNumber === 2) floatAnimClass = "animate-float-node-2";
  if (data.levelNumber === 3) floatAnimClass = "animate-float-node-3";

  return (
    <div
      onClick={() => selectNode(data.nodeId)}
      className={`flex flex-col items-center cursor-pointer group select-none relative ${floatAnimClass}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-[#ffd700] !w-2 !h-2 border-none"
      />

      {/* Circle Node */}
      <div
        className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
          isLocked
            ? "bg-slate-950/80 border-slate-700 text-slate-500 shadow-none opacity-60"
            : isCompleted
            ? "bg-[#2d0938] border-[#ffd700] text-white shadow-[0_0_20px_rgba(255,215,0,0.4)]"
            : "bg-[#1f0528] border-[#00ffcc] text-white shadow-[0_0_20px_rgba(0,255,204,0.4)] animate-pulse"
        } ${isSelected ? "scale-110 ring-4 ring-white/50" : "group-hover:scale-105"}`}
      >
        {isLocked ? (
          <Lock size={26} className="text-slate-500" />
        ) : isCompleted ? (
          <Check size={32} className="text-[#ffd700]" />
        ) : (
          <span className="font-pixel text-xl text-white">0{data.levelNumber}</span>
        )}
      </div>

      {/* GREEN START BUTTON attached directly to the RIGHT of the node when selected & active */}
      {isSelected && isActive && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            completeNode(data.nodeId);
          }}
          className="absolute left-[105%] top-[30px] -translate-y-1/2 bg-emerald-500 hover:bg-emerald-400 border border-emerald-300 text-slate-950 font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-xl active:scale-95 cursor-pointer text-xs font-pixel whitespace-nowrap animate-bounce z-50"
        >
          <Play size={14} className="fill-slate-950" />
          <span>ROZPOCZNIJ</span>
        </button>
      )}

      {/* Short Text Title Below */}
      <div className="mt-2.5 text-center max-w-[140px]">
        <span
          className={`text-[11px] font-pixel block leading-snug drop-shadow ${
            isLocked ? "text-slate-400" : "text-white"
          }`}
        >
          {t(data.titleKey)}
        </span>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-[#ffd700] !w-2 !h-2 border-none"
      />
    </div>
  );
};
