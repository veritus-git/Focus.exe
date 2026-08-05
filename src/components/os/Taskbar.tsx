import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ShieldCheck, GitBranch } from "lucide-react";
import { useOSStore } from "../../store/useOSStore";

export const Taskbar: React.FC = () => {
  const { t } = useTranslation();
  const {
    openWindows,
    activeWindow,
    minimizedWindows,
    toggleMinimizeWindow,
    focusWindow,
    language,
    setLanguage,
  } = useOSStore();

  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(
        d.toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getWindowLabelAndIcon = () => {
    return {
      label: t("desktop.skillTree"),
      icon: <GitBranch size={13} />,
    };
  };

  return (
    <div className="h-11 bg-[#100314]/90 backdrop-blur-md border-t border-[#4d1357] px-3 flex items-center justify-between z-40 select-none shadow-lg">
      {/* Left: Start / Status */}
      <div className="flex items-center gap-3">
        <div className="pixel-button px-3 py-1 flex items-center gap-2 text-xs bg-[#3b0b45] hover:bg-[#521061] border border-[#6b1b7f]">
          <ShieldCheck size={14} className="text-[#ffd700]" />
          <span className="font-pixel text-[10px] text-white">{t("os.start")}</span>
        </div>

        {/* Kiosk mode indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-2 py-0.5 bg-[#17051d] border border-[#3b0b45] text-[9px] text-[#00ffcc]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-pulse" />
          <span>{t("os.kioskMode")}</span>
        </div>
      </div>

      {/* Center: Open windows task list */}
      <div className="flex-1 flex items-center justify-start gap-1.5 px-4 overflow-x-auto">
        {openWindows.map((id) => {
          const info = getWindowLabelAndIcon();
          const isActive = activeWindow === id && !minimizedWindows.includes(id);
          const isMinimized = minimizedWindows.includes(id);

          return (
            <button
              key={id}
              onClick={() => {
                if (isMinimized) {
                  toggleMinimizeWindow(id);
                } else if (isActive) {
                  toggleMinimizeWindow(id);
                } else {
                  focusWindow(id);
                }
              }}
              className={`px-2.5 py-1 border text-[10px] flex items-center gap-2 cursor-pointer transition-all ${
                isActive
                  ? "bg-[#451052] border-[#ffd700] text-white shadow-[0_0_8px_rgba(255,215,0,0.2)]"
                  : "bg-[#18051f] border-[#3b0b45] text-slate-300 hover:bg-[#2c0933]"
              }`}
            >
              <span className="text-[#ffd700]">{info.icon}</span>
              <span className="truncate max-w-[120px]">{info.label}</span>
            </button>
          );
        })}
      </div>

      {/* Right: Language switcher & Live Clock */}
      <div className="flex items-center gap-3">
        {/* Language selector */}
        <div className="flex items-center bg-[#17051d] border border-[#3b0b45] p-0.5">
          <button
            onClick={() => setLanguage("pl")}
            className={`px-1.5 py-0.5 text-[9px] font-pixel cursor-pointer transition-all ${
              language === "pl"
                ? "bg-[#ffd700] text-[#120414] font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            PL
          </button>
          <span className="text-slate-600 text-[9px] px-0.5">|</span>
          <button
            onClick={() => setLanguage("en")}
            className={`px-1.5 py-0.5 text-[9px] font-pixel cursor-pointer transition-all ${
              language === "en"
                ? "bg-[#ffd700] text-[#120414] font-bold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            EN
          </button>
        </div>

        {/* Live Clock */}
        <div className="bg-[#17051d] border border-[#3b0b45] px-2.5 py-0.5 text-xs text-white font-mono-retro text-sm tracking-wider">
          {timeStr}
        </div>
      </div>
    </div>
  );
};
