import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Bot, Sparkles } from "lucide-react";

export const Mascot: React.FC = () => {
  const { t } = useTranslation();
  const [msgIndex, setMsgIndex] = useState(0);

  const messages = [
    t("mascot.msgWelcome"),
    t("mascot.msgFocus"),
    t("mascot.msgBreak"),
  ];

  const cycleMessage = () => {
    setMsgIndex((prev) => (prev + 1) % messages.length);
  };

  return (
    <div className="fixed bottom-14 right-5 z-30 flex flex-col items-end gap-2 group select-none">
      {/* Speech Bubble */}
      <div className="pixel-window max-w-xs p-2.5 bg-[#1a0521] border border-[#521361] text-[10px] text-white shadow-xl relative">
        <div className="flex items-center gap-1 mb-1 text-[#00ffcc]">
          <Sparkles size={11} className="animate-spin" />
          <span className="font-pixel text-[8px] uppercase tracking-wide">{t("mascot.name")}</span>
        </div>
        <p className="leading-relaxed font-mono-retro text-sm text-slate-200">
          "{messages[msgIndex]}"
        </p>
        
        {/* Speech Bubble Tail */}
        <div className="absolute -bottom-1.5 right-5 w-2.5 h-2.5 bg-[#1a0521] border-r border-b border-[#521361] rotate-45" />
      </div>

      {/* Mascot Icon */}
      <div
        onClick={cycleMessage}
        className="w-11 h-11 bg-[#2b0833] border-2 border-[#ffd700]/70 rounded flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all relative group"
        title="Kliknij towarzysza AI"
      >
        <Bot size={24} className="text-[#00ffcc] animate-pulse" />
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#00ffcc] rounded-full animate-ping" />
      </div>
    </div>
  );
};
