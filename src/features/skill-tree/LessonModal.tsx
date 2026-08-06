import React, { useState, useEffect, useRef } from "react";
import { X, ArrowLeft, ArrowRight, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSkillTreeStore } from "../../store/useSkillTreeStore";
import { useOSStore } from "../../store/useOSStore";
import { MarkdownRenderer, splitIntoPages } from "../../components/ui/MarkdownRenderer";
import { getLessonById, getLessonMarkdown, COURSES } from "../../content/courseIndex";
import type { Lesson } from "../../content/courseIndex";

interface LessonModalProps {
  nodeId: string;
  onClose: () => void;
}

export const LessonModal: React.FC<LessonModalProps> = ({ nodeId, onClose }) => {
  const { t } = useTranslation();
  const { completeNode } = useSkillTreeStore();
  const { language } = useOSStore();

  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Map nodeId to course
  const courseIndex = parseInt(nodeId.replace("node_", "")) - 1;
  const course = COURSES[courseIndex] || COURSES[0];

  const activeLesson: Lesson | undefined = activeLessonId
    ? getLessonById(activeLessonId)
    : undefined;

  // Get pages for active lesson
  const pages = activeLesson
    ? splitIntoPages(getLessonMarkdown(activeLesson, language))
    : [];
  const totalPages = pages.length || 1;
  const isLastPage = currentPage >= totalPages - 1;

  // Reset scroll on page change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentPage, activeLessonId]);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((p) => p + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((p) => p - 1);
    }
  };

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
                onClick={() => {
                  setActiveLessonId(lesson.id);
                  setCurrentPage(0);
                }}
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

  // ── LESSON READER VIEW (PAGED) ──
  return (
    <div className="fixed inset-0 z-[120] bg-slate-950 flex flex-col select-none animate-fade-in">
      {/* Top Bar */}
      <div className="h-12 px-5 bg-slate-900 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveLessonId(null);
              setCurrentPage(0);
            }}
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
          {/* Page indicator */}
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="text-[10px] font-pixel">
              {currentPage + 1} / {totalPages}
            </span>
          </div>

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

      {/* Page Progress Bar */}
      <div className="h-1 bg-slate-900 shrink-0">
        <div
          className="h-full bg-emerald-500 transition-all duration-300"
          style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
        />
      </div>

      {/* Content */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col"
      >
        <div className="max-w-6xl w-full mx-auto px-6 py-12 flex-1 flex flex-col">
          {pages[currentPage]?.type === "insight" ? (
            <div className="flex-1 flex flex-col items-center justify-center animate-fade-in text-center max-w-3xl mx-auto px-4">
              <span className="text-5xl mb-6">💡</span>
              <h3 className="font-pixel text-lg text-amber-400 font-bold uppercase tracking-widest mb-8">
                Key Insight
              </h3>
              <p className="text-2xl text-amber-100 leading-[1.6] font-medium">
                {pages[currentPage].content}
              </p>
            </div>
          ) : (
            <MarkdownRenderer content={pages[currentPage]?.content || ""} />
          )}
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="h-16 px-6 bg-slate-900 border-t border-white/10 flex items-center justify-between shrink-0">
        {/* Previous */}
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          className={`px-5 py-2.5 rounded-xl font-pixel text-xs font-bold flex items-center gap-2 transition-all ${
            currentPage === 0
              ? "bg-slate-800/50 text-slate-600 cursor-not-allowed"
              : "bg-slate-800 hover:bg-slate-700 text-white cursor-pointer border border-white/10 active:scale-95"
          }`}
        >
          <ArrowLeft size={14} />
          <span>{t("lessonReader.prev")}</span>
        </button>

        {/* Page dots */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                idx === currentPage
                  ? "bg-emerald-400 scale-125"
                  : idx <= currentPage
                  ? "bg-emerald-400/40"
                  : "bg-slate-700"
              }`}
            />
          ))}
        </div>

        {/* Next / Complete */}
        {isLastPage ? (
          <button
            onClick={handleComplete}
            className="px-5 py-2.5 bg-[#58cc02] hover:bg-[#46a302] border-b-3 border-[#3ca100] text-white font-pixel text-xs font-bold rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer flex items-center gap-2"
          >
            <CheckCircle2 size={14} />
            <span>{t("lessonReader.markComplete")}</span>
          </button>
        ) : (
          <button
            onClick={handleNextPage}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-pixel text-xs font-bold rounded-xl shadow-lg active:scale-95 transition-all cursor-pointer flex items-center gap-2 border border-emerald-400/30"
          >
            <span>{t("lessonReader.next")}</span>
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
};
