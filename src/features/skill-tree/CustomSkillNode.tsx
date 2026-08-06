import React, { memo, useEffect, useRef } from "react";
import { Handle, Position } from "@xyflow/react";
import { Lock, Check } from "lucide-react";
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
    onStartLesson?: (nodeId: string) => void;
  };
}

const CustomSkillNodeInner: React.FC<CustomSkillNodeProps> = ({ data }) => {
  const { t } = useTranslation();
  
  // ═══ HIGHLY TARGETED ZUSTAND SELECTORS ═══
  // Avoids re-rendering all 47 nodes when only one changes
  const nodeState = useSkillTreeStore((state) => state.nodes[data.nodeId]) || { status: "locked", progress: 0 };
  const isSelected = useSkillTreeStore((state) => state.selectedNodeId === data.nodeId);
  const selectNode = useSkillTreeStore((state) => state.selectNode);
  const nodeRef = useRef<HTMLDivElement>(null);

  // Escalate parent ReactFlow node z-index to bring selected node to front
  useEffect(() => {
    if (nodeRef.current) {
      const parent = nodeRef.current.closest(".react-flow__node") as HTMLElement;
      if (parent) {
        parent.style.zIndex = isSelected ? "1000" : "1";
      }
    }
  }, [isSelected]);

  const isLocked = nodeState.status === "locked";
  const isCompleted = nodeState.status === "completed";

  const accentColor = data.trackColor || "#00ffcc";
  const hash = data.nodeId.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const floatClass = `animate-float-node-${(hash % 3) + 1}`;

  return (
    <div
      ref={nodeRef}
      onClick={(e) => { e.stopPropagation(); selectNode(data.nodeId); }}
      className="flex flex-col items-center cursor-pointer group select-none relative"
    >
      <Handle type="target" position={Position.Top} className="!opacity-0 !w-0 !h-0 !border-none pointer-events-none" />

      {/* Circle — floats using transform (GPU smooth), blur on zoom is acceptable for the small circle */}
      <div className={`relative flex items-center justify-center ${floatClass}`}>
        <div
          className={`rounded-full border-3 flex items-center justify-center transition-all duration-200 ${
            data.isLevel0 ? "w-16 h-16" : "w-14 h-14"
          } ${
            isLocked ? "bg-slate-950 border-slate-700 text-slate-500 opacity-50"
              : isCompleted ? "bg-[#2d0938] border-[#ffd700] text-white"
              : "bg-[#1f0528] text-white"
          } ${isSelected ? "scale-125 ring-4 ring-white/50" : "group-hover:scale-110"}`}
          style={!isLocked ? { borderColor: isCompleted ? "#ffd700" : accentColor, boxShadow: `0 0 15px ${isCompleted ? "rgba(255,215,0,0.4)" : accentColor + "60"}` } : undefined}
        >
          {isLocked ? <Lock size={16} className="text-slate-600" />
            : isCompleted ? <Check size={20} className="text-[#ffd700]" />
            : <span className="text-lg">{data.icon}</span>}
        </div>
      </div>

      {/* Label — always outside the float wrapper, never blurred */}
      <div className={`mt-1.5 text-center max-w-[100px] transition-opacity duration-300 ${isSelected ? "opacity-40" : "opacity-100"}`}>
        <span 
          className={`text-[10px] font-pixel font-bold block leading-tight ${isLocked ? "text-slate-600" : "text-white"}`}
          style={{ textShadow: isLocked ? "none" : "0 2px 4px rgba(0,0,0,0.8)" }}
        >
          {t(data.titleKey)}
        </span>
      </div>

      <Handle type="source" position={Position.Bottom} className="!opacity-0 !w-0 !h-0 !border-none pointer-events-none" />
    </div>
  );
};

// React.memo prevents re-renders of all 47 nodes when only one is selected
export const CustomSkillNode = memo(CustomSkillNodeInner);
