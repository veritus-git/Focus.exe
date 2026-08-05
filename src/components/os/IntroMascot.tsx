import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    // 1. Gravity fall takes 1.8s
    const fallTimer = setTimeout(() => {
      setBotState("standing");
    }, 1800);

    // 2. Speech bubble appears 0.2s after bot lands
    const speechTimer = setTimeout(() => {
      setShowSpeech(true);
    }, 2000);

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
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/50 backdrop-blur-xs select-none">
      {/* Top right language switcher */}
      <div className="absolute top-5 right-8 flex items-center bg-slate-900/80 border border-white/20 px-2.5 py-1 rounded-lg backdrop-blur-md">
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
        {/* Perfectly Centered Speech Bubble */}
        {showSpeech ? (
          <div
            onClick={advanceDialog}
            className="w-full p-6 bg-slate-900/90 border border-white/20 text-white rounded-2xl shadow-2xl backdrop-blur-md cursor-pointer transition-all hover:border-white/40 relative flex flex-col items-center justify-center text-center"
          >
            <p className="text-sm font-pixel leading-relaxed text-slate-100 min-h-[44px] flex items-center justify-center text-center px-4">
              "{dialogStage === 1 ? t("mascot.intro1") : t("mascot.intro2")}"
            </p>

            {/* Arrow positioned absolute bottom-right */}
            <div className="absolute bottom-2.5 right-3.5 text-indigo-400 hover:text-white transition-colors">
              <ArrowRight size={15} className="animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="h-[90px]" />
        )}

        {/* Animated Custom 8-Bit Pixel Bot */}
        <div className={botState === "falling" ? "animate-bot-fall" : ""}>
          <PixelBotCharacter />
        </div>
      </div>
    </div>
  );
};
