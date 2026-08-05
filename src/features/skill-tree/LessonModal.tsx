import React, { useState, useEffect, useRef } from "react";
import { X, Award, ArrowLeft, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSkillTreeStore } from "../../store/useSkillTreeStore";
import { MarkdownRenderer } from "../../components/ui/MarkdownRenderer";
import { getLessonById, COURSES } from "../../content/courseIndex";
import type { Lesson } from "../../content/courseIndex";

interface LessonModalProps {
  nodeId: string;
  onClose: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({ nodeId, onClose }) => {
  const { t } = useTranslation();
  const { completeNode } = useSkillTreeStore();

  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Map nodeId to course
  const courseIndex = parseInt(nodeId.replace("node_", "")) - 1;
  const course = COURSES[courseIndex] || COURSES[0];

  const activeLesson: Lesson | undefined = activeLessonId
    ? getLessonById(activeLessonId)
    : undefined;

  // Track scroll progress
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !activeLesson) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const progress = Math.min(100, (scrollTop / (scrollHeight - clientHeight)) * 100);
      setReadProgress(progress);
      if (progress > 90 && !hasFinished) {
        setHasFinished(true);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeLesson, hasFinished]);

  // Reset state when switching lessons
  useEffect(() => {
    setReadProgress(0);
    setHasFinished(false);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeLessonId]);

  const handleComplete = () => {
    completeNode(nodeId);
    onClose();
  };

  // ── LESSON PICKER VIEW ──
  if (!activeLesson) {
    return (
      <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-6 select-none animate-fade-in">
        <div className="w-full max-w-[620px] bg-slate-900 border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{course.icon}</span>
              <div>
                <h2 className="font-pixel text-base font-bold text-white">{t(course.titleKey)}</h2>
                <p className="text-[11px] font-pixel text-slate-400 mt-0.5">
                  {t("lessonReader.pickLesson")}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl text-slate-400 hover:text-white cursor-pointer transition-all"
            >
              <X size={16} />
            </button>
          </div>

          {/* Lesson Cards */}
          <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
            {course.lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setActiveLessonId(lesson.id)}
                className="w-full p-4 bg-slate-800/60 hover:bg-slate-800 border border-white/10 hover:border-white/25 rounded-2xl cursor-pointer transition-all flex items-center gap-4 group text-left"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ backgroundColor: `${course.color}15`, border: `1px solid ${course.color}40` }}
                >
                  {lesson.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-pixel text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                    {t(lesson.titleKey)}
                  </h3>
                  <p className="text-[10px] font-pixel text-slate-400 mt-0.5 truncate">
                    {t(lesson.descriptionKey)}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 shrink-0">
                  <Clock size={12} />
                  <span className="text-[10px] font-pixel">{lesson.readTimeMin} min</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── LESSON READER VIEW ──
  return (
    <div className="fixed inset-0 z-[120] bg-slate-950 flex flex-col select-none animate-fade-in">
      {/* Top Bar */}
      <div className="h-12 px-5 bg-slate-900 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveLessonId(null)}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-all flex items-center gap-1.5"
          >
            <ArrowLeft size={14} />
            <span className="text-[10px] font-pixel hidden sm:inline">{t("lessonReader.back")}</span>
          </button>

          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-emerald-400" />
            <span className="font-pixel text-xs text-white font-bold truncate max-w-[300px]">
              {t(activeLesson.titleKey)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Reading time */}
          <div className="flex items-center gap-1.5 text-slate-500">
            <Clock size={12} />
            <span className="text-[10px] font-pixel">{activeLesson.readTimeMin} min</span>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg text-slate-400 hover:text-white cursor-pointer transition-all"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-slate-900 shrink-0">
        <div
          className="h-full bg-emerald-500 transition-all duration-200"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Content */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden"
      >
        <div className="max-w-[720px] mx-auto px-8 py-10">
          <MarkdownRenderer content={activeLesson.markdown} />

          {/* Completion Card (appears after scrolling to bottom) */}
          {hasFinished && (
            <div className="mt-10 mb-6 p-6 bg-slate-900 border-2 border-emerald-500/50 rounded-3xl flex flex-col items-center text-center gap-4 animate-fade-in">
              <div className="w-14 h-14 bg-emerald-500/15 border-2 border-emerald-500 rounded-full flex items-center justify-center text-emerald-400">
                <Award size={28} />
              </div>
              <div>
                <h3 className="font-pixel text-base font-bold text-white">{t("lessonReader.complete")}</h3>
                <p className="text-xs font-pixel text-slate-400 mt-1">{t("lessonReader.completeDesc")}</p>
              </div>
              <button
                onClick={handleComplete}
                className="px-8 py-3 bg-[#58cc02] hover:bg-[#46a302] border-b-4 border-[#3ca100] text-white font-pixel text-xs font-bold rounded-2xl shadow-lg active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 size={16} />
                <span>{t("lessonReader.markComplete")}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
