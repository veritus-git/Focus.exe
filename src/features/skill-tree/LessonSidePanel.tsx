import React, { useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Lock, Check, Play, X, Clock, ChevronLeft, ChevronRight, GitBranch } from "lucide-react";
import { useSkillTreeStore } from "../../store/useSkillTreeStore";
import { getLessonById, lessonHasContent, ALL_LESSONS, getTrackForLesson, P } from "../../content/courseIndex";

interface LessonSidePanelProps {
  nodeId: string;
  navGroup?: string[];
  onClose: () => void;
  onStartLesson: (nodeId: string) => void;
  onNavigate: (nodeId: string) => void;
  isLessonOpen: boolean;
}



export const LessonSidePanel: React.FC<LessonSidePanelProps> = ({ nodeId, navGroup, onClose, onStartLesson, onNavigate, isLessonOpen }) => {
  const { t } = useTranslation();
  const allNodes = useSkillTreeStore((s) => s.nodes);

  const lesson = getLessonById(nodeId);
  const status = allNodes[nodeId]?.status || "locked";
  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  const track = getTrackForLesson(nodeId);
  const accentColor = track?.color || "#00ffcc";
  const hasContent = !!(lesson && lessonHasContent(lesson));

  const { navList, currentIndex } = useMemo(() => {
    if (!navGroup || navGroup.length === 0) {
      return { navList: [nodeId], currentIndex: 0 };
    }
    const idx = navGroup.indexOf(nodeId);
    return { navList: navGroup, currentIndex: Math.max(0, idx) };
  }, [nodeId, navGroup]);

  const canGoPrev = navList.length > 1;
  const canGoNext = navList.length > 1;

  const handlePrev = () => {
    if (canGoPrev) {
      const prevIdx = currentIndex > 0 ? currentIndex - 1 : navList.length - 1;
      onNavigate(navList[prevIdx]);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      const nextIdx = currentIndex < navList.length - 1 ? currentIndex + 1 : 0;
      onNavigate(navList[nextIdx]);
    }
  };

  // Keyboard navigation: arrows to traverse, Enter to start lesson
  useEffect(() => {
    if (isLessonOpen) return; // Don't intercept keys when lesson modal is open

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (!isLocked && hasContent) {
          onStartLesson(nodeId);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canGoPrev, canGoNext, navList, currentIndex, isLocked, hasContent, nodeId, onStartLesson, isLessonOpen]);

  // Get prerequisite names for locked lessons
  const prereqNames = useMemo(() => {
    if (!lesson || !isLocked) return [];
    return lesson.requires
      .filter((reqId) => allNodes[reqId]?.status !== "completed")
      .map((reqId) => {
        const req = ALL_LESSONS.find((l) => l.id === reqId);
        return req ? t(req.titleKey) : reqId;
      });
  }, [lesson, isLocked, allNodes, t]);

  // Find children of this node (what it unlocks)
  const unlocksNodes = useMemo(() => {
    return ALL_LESSONS
      .filter((l) => l.requires.includes(nodeId))
      .sort((a, b) => (P[a.id]?.x ?? 0) - (P[b.id]?.x ?? 0));
  }, [nodeId]);

  if (!lesson) return null;

  return (
    <div className="lesson-side-panel h-full flex flex-col bg-slate-950 border-l border-white/10 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-slate-900/80 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">{lesson.icon}</span>
          <span
            className="text-[10px] font-pixel uppercase tracking-wider font-bold"
            style={{ color: accentColor }}
          >
            {track?.icon} {track ? t(track.titleKey) : ""}
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* Content — scrollable */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {/* Status badge */}
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-950/60 border border-amber-500/30">
              <Check size={12} className="text-amber-400" />
              <span className="text-[9px] font-pixel text-amber-400 uppercase tracking-wider font-bold">{t("skillTree.completedBadge")}</span>
            </div>
          ) : isLocked ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-600/30">
              <Lock size={12} className="text-slate-500" />
              <span className="text-[9px] font-pixel text-slate-500 uppercase tracking-wider font-bold">{t("skillTree.lockedBadge")}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border" style={{ backgroundColor: accentColor + "15", borderColor: accentColor + "40" }}>
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor }} />
              <span className="text-[9px] font-pixel uppercase tracking-wider font-bold" style={{ color: accentColor }}>{t("skillTree.activeBadge")}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-slate-500 ml-auto">
            <Clock size={12} />
            <span className="text-[10px] font-pixel">{lesson.readTimeMin} min</span>
          </div>
        </div>

        {/* Title */}
        <h2
          className="text-lg font-pixel font-bold leading-snug"
          style={{ color: isLocked ? "#94a3b8" : "#ffffff" }}
        >
          {t(lesson.titleKey)}
        </h2>

        {/* Description */}
        <p className="text-sm text-slate-400 leading-relaxed">
          {t(lesson.descriptionKey)}
        </p>

        {/* Prerequisites (if locked) */}
        {isLocked && prereqNames.length > 0 && (
          <div className="space-y-2 p-3 rounded-xl bg-slate-900/60 border border-slate-700/40">
            <span className="text-[10px] font-pixel text-slate-500 uppercase tracking-wider">{t("skillTree.requiresLabel")}:</span>
            {prereqNames.map((name, i) => (
              <div key={i} className="flex items-center gap-2 text-[12px] text-amber-400/80">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 shrink-0" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Unlocks section */}
        {unlocksNodes.length > 0 && (
          <div className="space-y-2 p-3 rounded-xl bg-slate-900/60 border border-white/5">
            <div className="flex items-center gap-1.5">
              <GitBranch size={12} className="text-slate-500" />
              <span className="text-[10px] font-pixel text-slate-500 uppercase tracking-wider">{t("skillTree.unlocksLabel")}:</span>
            </div>
            {unlocksNodes.map((node) => {
              const nState = allNodes[node.id];
              const isDone = nState?.status === "completed";
              const isAvailable = nState?.status === "active";
              return (
                <button
                  key={node.id}
                  onClick={() => onNavigate(node.id)}
                  className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-800/80 transition-colors text-left cursor-pointer group"
                >
                  <span className="text-sm">{node.icon}</span>
                  <span className={`text-[11px] font-pixel ${isDone ? "text-amber-400" : isAvailable ? "text-white" : "text-slate-500"} group-hover:text-white transition-colors`}>
                    {t(node.titleKey)}
                  </span>
                  {isDone && <Check size={10} className="text-amber-400 ml-auto" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Action button */}
      <div className="px-5 py-3 border-t border-white/10 space-y-3 shrink-0">
        {!isLocked && hasContent ? (
          <button
            onClick={() => onStartLesson(nodeId)}
            className="w-full py-3.5 bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#3ca100] text-white font-pixel text-xs font-bold rounded-2xl shadow-lg active:scale-98 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play size={14} className="fill-white" />
            <span>{isCompleted ? t("skillTree.repeatLessonXP") : t("skillTree.startLessonXP")}</span>
          </button>
        ) : !isLocked && !hasContent ? (
          <div className="w-full py-3 bg-slate-800/80 border-b-4 border-slate-950 text-slate-500 font-pixel text-[10px] font-bold rounded-2xl text-center uppercase tracking-wider">
            {t("skillTree.comingSoon")}
          </div>
        ) : (
          <div className="w-full py-3 bg-slate-800/80 border-b-4 border-slate-950 text-slate-600 font-pixel text-[10px] font-bold rounded-2xl text-center uppercase tracking-wider flex items-center justify-center gap-1.5">
            <Lock size={12} />
            <span>{t("skillTree.lockedBadge")}</span>
          </div>
        )}

        {/* Navigation arrows */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`flex-1 py-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-pixel text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
              canGoPrev
                ? "bg-slate-800/80 border-slate-600/40 text-slate-300 hover:bg-slate-700 hover:text-white"
                : "bg-slate-900/40 border-slate-800/30 text-slate-700 cursor-not-allowed"
            }`}
          >
            <ChevronLeft size={14} />
            <span>{t("lessonReader.prev")}</span>
          </button>

          <span className="text-[9px] text-slate-600 font-pixel tabular-nums shrink-0">
            {currentIndex + 1}/{navList.length}
          </span>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`flex-1 py-2.5 rounded-xl border flex items-center justify-center gap-1.5 font-pixel text-[10px] uppercase tracking-wider transition-all cursor-pointer ${
              canGoNext
                ? "bg-slate-800/80 border-slate-600/40 text-slate-300 hover:bg-slate-700 hover:text-white"
                : "bg-slate-900/40 border-slate-800/30 text-slate-700 cursor-not-allowed"
            }`}
          >
            <span>{t("lessonReader.next")}</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
