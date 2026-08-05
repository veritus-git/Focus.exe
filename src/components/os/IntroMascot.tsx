import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Bot, ArrowRight } from "lucide-react";
import { useOSStore } from "../../store/useOSStore";

export const IntroMascot: React.FC = () => {
  const { t } = useTranslation();
  const { introFinished, finishIntro, language, setLanguage } = useOSStore();

  const [botState, setBotState] = useState<"falling" | "standing">("falling");
  const [showSpeech, setShowSpeech] = useState(false);
  const [dialogStage, setDialogStage] = useState<1 | 2>(1);

  useEffect(() => {
    // 1. Bot falls smoothly for 1.8s
    const fallTimer = setTimeout(() => {
      setBotState("standing");
    }, 1800);

    // 2. Text appears 0.4s after bot stands upright
    const speechTimer = setTimeout(() => {
      setShowSpeech(true);
    }, 2200);

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
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-xs select-none">
      {/* Top right language switcher on Intro screen */}
      <div className="absolute top-4 right-6 flex items-center bg-slate-900/80 border border-white/20 px-2 py-1 rounded-lg backdrop-blur-md">
        <button
          onClick={() => setLanguage("pl")}
          className={`px-2 py-0.5 text-[10px] font-pixel cursor-pointer transition-all ${
            language === "pl"
              ? "bg-white text-slate-900 rounded font-bold"
              : "text-slate-300 hover:text-white"
          }`}
        >
          PL
        </button>
        <span className="text-slate-500 text-[10px] px-1">|</span>
        <button
          onClick={() => setLanguage("en")}
          className={`px-2 py-0.5 text-[10px] font-pixel cursor-pointer transition-all ${
            language === "en"
              ? "bg-white text-slate-900 rounded font-bold"
              : "text-slate-300 hover:text-white"
          }`}
        >
          EN
        </button>
      </div>

      <div className="flex flex-col items-center gap-6 max-w-md w-full p-4">
        {/* Clean Speech Bubble (Only appears after bot stands up) */}
        {showSpeech ? (
          <div
            onClick={advanceDialog}
            className="w-full p-5 bg-slate-900/90 border border-white/20 text-white rounded-2xl shadow-2xl backdrop-blur-md cursor-pointer transition-all hover:border-white/40"
          >
            <p className="text-sm font-pixel leading-relaxed text-slate-100 min-h-[48px] flex items-center justify-center text-center">
              "{dialogStage === 1 ? t("mascot.intro1") : t("mascot.intro2")}"
            </p>

            {/* Simple small arrow icon at bottom right */}
            <div className="flex justify-end pt-2 text-slate-400 hover:text-white transition-colors">
              <div className="flex items-center gap-1 text-[10px] font-pixel">
                <ArrowRight size={14} className="animate-pulse text-indigo-400" />
              </div>
            </div>
          </div>
        ) : (
          /* Empty placeholder to keep vertical layout stable while falling */
          <div className="h-[90px]" />
        )}

        {/* Clean 8-bit Bot Sprite (No boxes, no frames!) */}
        <div className={`transition-all ${botState === "falling" ? "animate-bot-slow-drop" : ""}`}>
          <Bot size={72} className="text-indigo-400 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
        </div>
      </div>
    </div>
  );
};
