import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Lock, Check, Play, X, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSkillTreeStore } from "../../store/useSkillTreeStore";

interface CustomSkillNodeProps {
  data: {
    nodeId: string;
    titleKey: string;
    levelNumber: number;
    onStartLesson?: (nodeId: string) => void;
  };
}

export const CustomSkillNode: React.FC<CustomSkillNodeProps> = ({ data }) => {
  const { t } = useTranslation();
  const { nodes, selectedNodeId, selectNode } = useSkillTreeStore();
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
      onClick={(e) => {
        e.stopPropagation();
        selectNode(data.nodeId);
      }}
      className={`flex flex-col items-center cursor-pointer group select-none relative ${floatAnimClass}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!opacity-0 !w-0 !h-0 !border-none pointer-events-none"
      />

      {/* Main Circle Node Container (Compact 56px size) */}
      <div className="relative flex items-center justify-center">
        <div
          className={`w-14 h-14 rounded-full border-3 flex items-center justify-center transition-all duration-200 ${
            isLocked
              ? "bg-slate-950 border-slate-700 text-slate-500 opacity-60"
              : isCompleted
              ? "bg-[#2d0938] border-[#ffd700] text-white shadow-[0_0_18px_rgba(255,215,0,0.5)]"
              : "bg-[#1f0528] border-[#00ffcc] text-white shadow-[0_0_18px_rgba(0,255,204,0.5)]"
          } ${isSelected ? "scale-110 ring-4 ring-white/60" : "group-hover:scale-105"}`}
        >
          {isLocked ? (
            <Lock size={18} className="text-slate-500" />
          ) : isCompleted ? (
            <Check size={22} className="text-[#ffd700]" />
          ) : (
            <span className="font-pixel text-sm text-white">0{data.levelNumber}</span>
          )}
        </div>
      </div>

      {/* Node Short Label */}
      <div className="mt-1 text-center max-w-[120px]">
        <span
          className={`text-[11px] font-pixel font-bold block leading-snug drop-shadow ${
            isLocked ? "text-slate-500" : "text-white"
          }`}
        >
          {t(data.titleKey)}
        </span>
      </div>

      {/* DUOLINGO STYLE POPUP CARD */}
      {isSelected && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[270px] z-[9999] animate-fade-in select-none"
        >
          {/* Card Arrow Tip */}
          <div className="w-3.5 h-3.5 bg-slate-900 border-t border-l border-white/20 rotate-45 mx-auto -mb-2 relative z-10" />

          {/* Card Body */}
          {isActive || isCompleted ? (
            <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-4 shadow-2xl text-white flex flex-col gap-3 relative">
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  selectNode("");
                }}
                className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                <X size={16} />
              </button>

              <div className="space-y-1 pr-6">
                <span className="text-xs font-pixel font-bold text-emerald-400 uppercase tracking-wide flex items-center gap-1">
                  <Zap size={14} className="fill-emerald-400" />
                  <span>{t("skillTree.unit", { num: data.levelNumber })}</span>
                </span>
                <h4 className="text-xs font-pixel font-bold text-white leading-tight">
                  {t(data.titleKey)}
                </h4>
              </div>

              {/* Action Start Lesson Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (data.onStartLesson) data.onStartLesson(data.nodeId);
                }}
                className="w-full py-2.5 bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#3ca100] text-white font-pixel text-xs font-bold rounded-2xl shadow-lg active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1"
              >
                <Play size={14} className="fill-white" />
                <span>
                  {isCompleted ? t("skillTree.repeatLessonXP") : t("skillTree.startLessonXP")}
                </span>
              </button>
            </div>
          ) : (
            /* Locked Card State */
            <div className="bg-slate-900 border-2 border-slate-700/60 rounded-3xl p-4 shadow-2xl text-slate-300 flex flex-col gap-2 relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  selectNode("");
                }}
                className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800"
              >
                <X size={16} />
              </button>

              <div className="space-y-1 pr-6">
                <h4 className="text-xs font-pixel font-bold text-slate-200">
                  {t(data.titleKey)}
                </h4>
                <p className="text-xs font-pixel text-slate-400 leading-relaxed">
                  {t("skillTree.lockedMsg")}
                </p>
              </div>

              <div className="w-full py-2 bg-slate-800 border-b-4 border-slate-950 text-slate-500 font-pixel text-xs font-bold rounded-2xl text-center uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-not-allowed mt-1">
                <Lock size={14} />
                <span>{t("skillTree.lockedBadge")}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!opacity-0 !w-0 !h-0 !border-none pointer-events-none"
      />
    </div>
  );
};
