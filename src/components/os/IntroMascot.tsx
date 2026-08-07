import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { useOSStore } from "../../store/useOSStore";
import { PixelBotCharacter } from "./PixelBotCharacter";

export const IntroMascot: React.FC = () => {
  const { t } = useTranslation();
  const { introFinished, finishIntro, language, setLanguage } = useOSStore();

  const [botState, setBotState] = useState<"falling" | "standing">("falling");
  const [showSpeech, setShowSpeech] = useState(false);
  const [dialogStage, setDialogStage] = useState<1 | 2>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force focus on our container to catch keyboard events easily
    if (containerRef.current) {
      containerRef.current.focus();
    }
    
    // 1. Smooth 60 FPS gravity drop (0.65s)
    const fallTimer = setTimeout(() => {
      setBotState("standing");
    }, 650);

    // 2. Speech bubble appears smoothly right after landing (0.8s)
    const speechTimer = setTimeout(() => {
      setShowSpeech(true);
    }, 800);

    return () => {
      clearTimeout(fallTimer);
      clearTimeout(speechTimer);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && showSpeech) {
        e.preventDefault();
        advanceDialog();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSpeech, dialogStage]);

  if (introFinished) return null;

  const advanceDialog = () => {
    if (dialogStage === 1) {
      setDialogStage(2);
    } else {
      finishIntro();
    }
  };

  return (
    <div 
      ref={containerRef}
      tabIndex={0}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 select-none outline-none"
    >
      {/* Top right language switcher */}
      <div className="absolute top-5 right-8 flex items-center bg-slate-900 border border-white/20 px-2.5 py-1 rounded-lg">
        <button
          onClick={(e) => { e.stopPropagation(); setLanguage("pl"); }}
          className={`px-2 py-0.5 text-xs font-pixel cursor-pointer transition-all ${
            language === "pl"
              ? "bg-white text-slate-900 rounded font-bold"
              : "text-slate-300 hover:text-white"
          }`}
        >
          PL
        </button>
        <span className="text-slate-500 text-xs px-1">|</span>
        <button
          onClick={(e) => { e.stopPropagation(); setLanguage("en"); }}
          className={`px-2 py-0.5 text-xs font-pixel cursor-pointer transition-all ${
            language === "en"
              ? "bg-white text-slate-900 rounded font-bold"
              : "text-slate-300 hover:text-white"
          }`}
        >
          EN
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 max-w-md w-full p-4">
        {/* Smooth Fade-in Speech Bubble without ANY layout shift or flicker */}
        <div
          onClick={advanceDialog}
          className={`w-full p-6 bg-slate-900 border border-white/20 text-white rounded-2xl shadow-2xl cursor-pointer transition-all duration-300 relative flex flex-col items-center justify-center text-center ${
            showSpeech
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-3 scale-95 pointer-events-none"
          }`}
        >
          <p className="text-base font-pixel leading-relaxed text-slate-100 min-h-[44px] flex items-center justify-center text-center px-4">
            "{dialogStage === 1 ? t("mascot.intro1") : t("mascot.intro2")}"
          </p>

          {/* Arrow positioned absolute bottom-right */}
          <div className="absolute bottom-2.5 right-3.5 text-indigo-400 hover:text-white transition-colors">
            <ArrowRight size={18} className="animate-pulse" />
          </div>
        </div>

        {/* Smooth 60 FPS Falling Pixel Bot Head */}
        <div className={botState === "falling" ? "animate-bot-smooth-drop" : ""}>
          <PixelBotCharacter />
        </div>
      </div>
    </div>
  );
};
