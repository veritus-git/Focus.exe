import React, { useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Lock, Check, Play, X, Clock, ChevronLeft, ChevronRight, GitBranch } from "lucide-react";
import { useSkillTreeStore } from "../../store/useSkillTreeStore";
import { getLessonById, lessonHasContent, ALL_LESSONS, getTrackForLesson, LEVEL_0 } from "../../content/courseIndex";

interface LessonSidePanelProps {
  nodeId: string;
  onClose: () => void;
  onStartLesson: (nodeId: string) => void;
  onNavigate: (nodeId: string) => void;
  isLessonOpen: boolean;
}

/**
 * Get direct children of a node (lessons that require this node), sorted left-to-right.
 */
function getDirectChildren(fromId: string, positions: Record<string, { x: number; y: number }>): string[] {
  return ALL_LESSONS
    .filter((l) => l.requires.includes(fromId))
    .sort((a, b) => (positions[a.id]?.x ?? 0) - (positions[b.id]?.x ?? 0))
    .map((l) => l.id);
}

// Positions map (same as SkillTreeWindow)
const P: Record<string, { x: number; y: number }> = {
  "what-is-information": { x: 2500, y: 50 },
  "hw-how-bit-works": { x: 300, y: 400 }, "hw-logic-gates": { x: 150, y: 680 },
  "hw-cpu-instructions": { x: 350, y: 950 }, "hw-pipeline": { x: 120, y: 1230 },
  "hw-cache": { x: 420, y: 1230 }, "hw-ram": { x: 280, y: 1480 },
  "hw-ssd": { x: 500, y: 1700 }, "hw-multithreading": { x: 80, y: 1480 },
  "crypto-sha256": { x: 720, y: 580 }, "crypto-keys": { x: 880, y: 830 },
  "crypto-aes": { x: 760, y: 1100 }, "crypto-digital-signature": { x: 940, y: 1340 },
  "code-variables": { x: 1300, y: 400 }, "code-functions": { x: 1180, y: 680 },
  "code-compiler-vs-interpreter": { x: 1380, y: 950 }, "code-callstack": { x: 1100, y: 950 },
  "code-stack-heap": { x: 1220, y: 1230 }, "code-pointers": { x: 1080, y: 1480 },
  "ai-how-understands-text": { x: 1900, y: 580 }, "ai-tokenization": { x: 1720, y: 850 },
  "ai-embeddings": { x: 2060, y: 850 }, "ai-attention": { x: 1900, y: 1120 },
  "ai-transformer": { x: 1960, y: 1380 }, "ai-chatgpt": { x: 1800, y: 1630 },
  "ai-context-window": { x: 2120, y: 1630 },
  "math-vectors": { x: 2600, y: 400 }, "math-derivatives": { x: 2440, y: 680 },
  "math-vector-space": { x: 2760, y: 680 }, "math-probability": { x: 2350, y: 950 },
  "math-matrices": { x: 2880, y: 950 }, "math-diff-eq": { x: 2500, y: 1230 },
  "math-gradient-descent": { x: 2720, y: 1480 },
  "audio-pcm": { x: 3300, y: 400 }, "audio-fft": { x: 3180, y: 680 },
  "audio-spectrogram": { x: 3340, y: 950 }, "audio-vad": { x: 3220, y: 1230 },
  "net-ip-address": { x: 3800, y: 400 }, "net-dns": { x: 3680, y: 680 },
  "net-tcp": { x: 3960, y: 680 }, "net-what-happens-url": { x: 3820, y: 950 },
  "net-http": { x: 3780, y: 1230 }, "net-https": { x: 3960, y: 1480 },
  "eng-gps": { x: 4400, y: 580 }, "eng-imu": { x: 4280, y: 850 },
  "eng-lidar": { x: 4500, y: 1120 }, "eng-autopilot": { x: 4380, y: 1380 },
};

export const LessonSidePanel: React.FC<LessonSidePanelProps> = ({ nodeId, onClose, onStartLesson, onNavigate, isLessonOpen }) => {
  const { t } = useTranslation();
  const nodeState = useSkillTreeStore((s) => s.nodes[nodeId]) || { status: "locked", progress: 0 };
  const allNodes = useSkillTreeStore((s) => s.nodes);

  const lesson = getLessonById(nodeId);
  const track = getTrackForLesson(nodeId);
  const hasContent = !!(lesson && lessonHasContent(lesson));
  const isLocked = nodeState.status === "locked";
  const isCompleted = nodeState.status === "completed";
  const accentColor = track?.color || "#00ffcc";

  // Find parent node(s) — the lessons this one requires
  const parentId = useMemo(() => {
    if (!lesson) return null;
    return lesson.requires.length > 0 ? lesson.requires[0] : null;
  }, [lesson]);

  // Hierarchical navigation list:
  // If current is Level 0 -> [Level 0, ...directChildrenOfLevel0]
  // Else if current has a parent P -> directChildrenOfP (all siblings on same level)
  // Else -> [nodeId]
  const { navList, currentIndex } = useMemo(() => {
    if (nodeId === LEVEL_0.id) {
      const children = getDirectChildren(LEVEL_0.id, P);
      return { navList: [LEVEL_0.id, ...children], currentIndex: 0 };
    }

    if (parentId) {
      const siblingsOnLevel = getDirectChildren(parentId, P);
      const idx = siblingsOnLevel.indexOf(nodeId);
      if (idx >= 0) {
        return { navList: siblingsOnLevel, currentIndex: idx };
      }
      return { navList: [parentId, ...siblingsOnLevel], currentIndex: 0 };
    }

    return { navList: [nodeId], currentIndex: 0 };
  }, [nodeId, parentId]);

  const canGoPrev = currentIndex > 0 || parentId !== null;
  const canGoNext = currentIndex < navList.length - 1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(navList[currentIndex - 1]);
    } else if (parentId) {
      onNavigate(parentId);
    }
  };

  const handleNext = () => {
    if (currentIndex < navList.length - 1) {
      onNavigate(navList[currentIndex + 1]);
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
