import React, { memo, useEffect, useRef } from "react";
import { Handle, Position } from "@xyflow/react";
import { Lock, Check, Play, X, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSkillTreeStore } from "../../store/useSkillTreeStore";
import { getLessonById, lessonHasContent, ALL_LESSONS } from "../../content/courseIndex";

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

  // Escalate parent ReactFlow node z-index to bring popup to front
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
  const isActive = nodeState.status === "active";

  const lesson = getLessonById(data.nodeId);
  const hasContent = !!(lesson && lessonHasContent(lesson));

  const accentColor = data.trackColor || "#00ffcc";
  const hash = data.nodeId.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const floatClass = `animate-float-node-${(hash % 3) + 1}`;

  // Get prerequisite names for locked lessons
  const getPrereqNames = (): string[] => {
    if (!lesson) return [];
    // We fetch the current state directly from the store to avoid subscribing this node to ALL nodes
    const allNodes = useSkillTreeStore.getState().nodes;
    return lesson.requires
      .filter((reqId) => allNodes[reqId]?.status !== "completed")
      .map((reqId) => {
        const req = ALL_LESSONS.find((l) => l.id === reqId);
        return req ? t(req.titleKey) : reqId;
      });
  };

  return (
    <div
      ref={nodeRef}
      onClick={(e) => { e.stopPropagation(); selectNode(data.nodeId); }}
      className="flex flex-col items-center cursor-pointer group select-none relative"
    >
      <Handle type="target" position={Position.Top} className="!opacity-0 !w-0 !h-0 !border-none pointer-events-none" />

      {/* Circle */}
      <div className={`relative flex items-center justify-center ${floatClass}`}>
        <div
          className={`rounded-full border-3 flex items-center justify-center transition-transform duration-200 ${
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

      {/* Label - fades out when node is selected */}
      <div className={`mt-1.5 text-center max-w-[100px] transition-opacity duration-300 ${isSelected ? "opacity-0" : "opacity-100"}`}>
        <span className={`text-[10px] font-pixel font-bold block leading-tight drop-shadow ${isLocked ? "text-slate-600" : "text-white"}`}>
          {t(data.titleKey)}
        </span>
      </div>

      {/* POPUP CARD */}
      {isSelected && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[85px] w-[300px] z-[9999] animate-card-popup select-none"
          style={{ left: 'calc(50% - 150px)' }}
        >
          <div className="w-3 h-3 bg-slate-900 border-t border-l border-white/15 rotate-45 mx-auto -mb-1.5 relative z-10" />

          {isActive || isCompleted ? (
            <div className="bg-slate-900/98 border border-white/15 rounded-2xl p-5 shadow-2xl text-white flex flex-col gap-4 relative"
              style={{ borderColor: accentColor + "40" }}>
              <button onClick={(e) => { e.stopPropagation(); selectNode(""); }}
                className="absolute top-3 right-3 text-slate-500 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
                <X size={14} />
              </button>

              <div className="pr-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{data.icon}</span>
                  <span className="text-[10px] font-pixel font-bold uppercase tracking-wider" style={{ color: accentColor }}>
                    {data.trackIcon} {t(data.titleKey)}
                  </span>
                </div>
                {lesson && (
                  <p className="text-xs text-slate-400 leading-relaxed">{t(lesson.descriptionKey)}</p>
                )}
                {lesson && (
                  <div className="flex items-center gap-1.5 mt-2 text-slate-500">
                    <Clock size={11} />
                    <span className="text-[10px] font-pixel">{lesson.readTimeMin} min</span>
                  </div>
                )}
              </div>

              {hasContent ? (
                <button onClick={(e) => { e.stopPropagation(); data.onStartLesson?.(data.nodeId); }}
                  className="w-full py-3 bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#3ca100] text-white font-pixel text-xs font-bold rounded-2xl shadow-lg active:scale-98 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                  <Play size={14} className="fill-white" />
                  <span>{isCompleted ? t("skillTree.repeatLessonXP") : t("skillTree.startLessonXP")}</span>
                </button>
              ) : (
                <div className="w-full py-2.5 bg-slate-800/80 border-b-4 border-slate-950 text-slate-500 font-pixel text-[10px] font-bold rounded-2xl text-center uppercase tracking-wider">
                  {t("skillTree.comingSoon")}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-slate-900/98 border border-slate-700/40 rounded-2xl p-5 shadow-2xl text-slate-300 flex flex-col gap-3 relative">
              <button onClick={(e) => { e.stopPropagation(); selectNode(""); }}
                className="absolute top-3 right-3 text-slate-500 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors">
                <X size={14} />
              </button>

              <div className="pr-8">
                <div className="flex items-center gap-2 mb-1">
                  <Lock size={14} className="text-slate-500" />
                  <h4 className="text-xs font-pixel font-bold text-slate-300">{t(data.titleKey)}</h4>
                </div>
                {lesson && (
                  <p className="text-[11px] text-slate-500 leading-relaxed mb-3">{t(lesson.descriptionKey)}</p>
                )}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-pixel text-slate-500 uppercase tracking-wider">{t("skillTree.requiresLabel")}:</span>
                  {getPrereqNames().map((name, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-amber-400/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 shrink-0" />
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full py-2.5 bg-slate-800/80 border-b-4 border-slate-950 text-slate-600 font-pixel text-[10px] font-bold rounded-2xl text-center uppercase tracking-wider flex items-center justify-center gap-1.5">
                <Lock size={12} />
                <span>{t("skillTree.lockedBadge")}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="!opacity-0 !w-0 !h-0 !border-none pointer-events-none" />
    </div>
  );
};

// React.memo prevents re-renders of all 47 nodes when only one is selected
export const CustomSkillNode = memo(CustomSkillNodeInner);
