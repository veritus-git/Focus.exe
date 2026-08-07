import React, { memo, useEffect, useRef } from "react";
import { Handle, Position } from "@xyflow/react";
import { Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSkillTreeStore } from "../../store/useSkillTreeStore";

interface CustomSkillNodeProps {
  data: {
    nodeId: string;
    titleKey: string;
    icon: string;
    isLevel0?: boolean;
    trackColor?: string;
    trackIcon?: string;
    onClick?: (nodeId: string) => void;
    onStartLesson?: (nodeId: string) => void;
  };
}

const CustomSkillNodeInner: React.FC<CustomSkillNodeProps> = ({ data }) => {
  const { t } = useTranslation();
  
  // ═══ HIGHLY TARGETED ZUSTAND SELECTORS ═══
  const nodeState = useSkillTreeStore((state) => state.nodes[data.nodeId]) || { status: "locked", progress: 0 };
  const isSelected = useSkillTreeStore((state) => state.selectedNodeId === data.nodeId);
  const nodeRef = useRef<HTMLDivElement>(null);

  // Escalate parent ReactFlow node z-index when selected
  useEffect(() => {
    if (nodeRef.current) {
      const parent = nodeRef.current.closest(".react-flow__node") as HTMLElement;
      if (parent) {
        parent.style.zIndex = isSelected ? "1000" : "1";
      }
    }
  }, [isSelected]);

  const isLocked = nodeState.status === "locked" || nodeState.status === "unlocking";
  const isCompleted = nodeState.status === "completed";
  const isNewlyUnlocked = useSkillTreeStore((state) => state.newlyUnlockedIds.includes(data.nodeId));

  const accentColor = data.trackColor || "#00ffcc";
  const size = data.isLevel0 ? "w-18 h-18" : "w-14 h-14";
  const title = t(data.titleKey);
  const durationClass = isNewlyUnlocked ? "duration-1000" : "duration-200";

  return (
    <div
      ref={nodeRef}
      onClick={(e) => { 
        e.stopPropagation(); 
        if (data.onClick) data.onClick(data.nodeId);
      }}
      className="flex flex-col items-center cursor-pointer group select-none relative"
    >
      <Handle type="target" position={Position.Top} className="!opacity-0 !w-0 !h-0 !border-none pointer-events-none" />

      {/* Circle — no animation, no composite layer, no blur */}
      <div className="relative flex items-center justify-center">
        <div
          className={`rounded-full border-3 flex items-center justify-center transition-all ${durationClass} ${size} ${
            isLocked ? "bg-slate-950 border-slate-700 text-slate-500 opacity-50"
              : isCompleted ? "bg-[#2d0938] border-[#ffd700] text-white"
              : "bg-[#1f0528] text-white"
          } ${isSelected ? "scale-125 ring-4 ring-white/50" : "group-hover:scale-110"}`}
          style={!isLocked ? { borderColor: isCompleted ? "#ffd700" : accentColor, boxShadow: `0 0 15px ${isCompleted ? "rgba(255,215,0,0.4)" : accentColor + "60"}` } : undefined}
        >
          {isLocked ? <Lock size={16} className="text-slate-600" />
            : <span className="text-lg">{data.icon}</span>}
        </div>
      </div>

      {/* Label — always visible, white when available, gray when locked */}
      <div className="mt-3 text-center max-w-[100px]">
        <span
          className={`text-[10px] font-pixel font-bold block leading-tight ${isLocked ? "text-slate-600" : isCompleted ? "text-[#ffd700]" : "text-white"}`}
          style={{ textShadow: isLocked ? "none" : isCompleted ? "0 0 10px rgba(255,215,0,0.5)" : "0 2px 6px rgba(0,0,0,0.9)" }}
        >
          {title}
        </span>
      </div>

      <Handle type="source" position={Position.Bottom} className="!opacity-0 !w-0 !h-0 !border-none pointer-events-none" />
    </div>
  );
};

export const CustomSkillNode = memo(CustomSkillNodeInner);
