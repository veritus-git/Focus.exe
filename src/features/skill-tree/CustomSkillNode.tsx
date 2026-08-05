import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Lock, Check } from "lucide-react";
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
  const { nodes, selectedNodeId, selectNode } = useSkillTreeStore();
  const nodeState = nodes[data.nodeId] || { status: "locked", progress: 0 };
  const isSelected = selectedNodeId === data.nodeId;

  const isLocked = nodeState.status === "locked";
  const isCompleted = nodeState.status === "completed";

  return (
    <div
      onClick={() => selectNode(data.nodeId)}
      className="flex flex-col items-center cursor-pointer group select-none"
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
