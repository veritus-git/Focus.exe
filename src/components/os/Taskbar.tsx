import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Power, GitBranch, Calculator, FileText, Lock, LogOut, Clock } from "lucide-react";
import { invoke } from "@tauri-apps/api/core";
import { WindowId, useOSStore } from "../../store/useOSStore";

interface TaskbarProps {
  secondsLeft: number;
  setSecondsLeft: React.Dispatch<React.SetStateAction<number>>;
}

export const Taskbar: React.FC<TaskbarProps> = ({ secondsLeft, setSecondsLeft }) => {
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
  const [showShutdownModal, setShowShutdownModal] = useState(false);

  // 1-second Clock Interval
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

  // 1-second Lockdown Timer Countdown
  useEffect(() => {
    if (secondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, setSecondsLeft]);

  const handleExit = async () => {
    if (secondsLeft > 0) return;

    try {
      await invoke("exit_app");
    } catch (err) {
      console.log("[EXIT] Outside Tauri environment, closing window:", err);
      window.close();
    }
  };

  const formatCountdown = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const isExitLocked = secondsLeft > 0;
  const minutesLeft = Math.ceil(secondsLeft / 60);

  const getWindowIcon = (id: WindowId) => {
    if (id === "skillTree") return <GitBranch size={16} />;
    if (id === "calculator") return <Calculator size={16} />;
    if (id === "notes") return <FileText size={16} />;
    return null;
  };

  return (
    <>
      <div className="h-11 bg-slate-950/90 backdrop-blur-md border-t border-white/10 px-4 flex items-center justify-between z-40 select-none shadow-lg">
        {/* Left: Joined Power Button + Attached Lockdown Timer Pill (Screenshot 4 Style) */}
        <div className="flex items-center">
          <div className="bg-rose-950/90 border border-rose-500/40 rounded-xl overflow-hidden flex items-center shadow-md">
            {/* Shutdown Power Button */}
            <button
              onClick={() => setShowShutdownModal(true)}
              className="bg-rose-700 hover:bg-rose-600 text-white p-2.5 flex items-center justify-center cursor-pointer transition-colors active:scale-95 border-r border-rose-500/40"
              title="Wyłączenie Systemu FocusOS"
            >
              <Power size={15} />
            </button>

            {/* Attached Joined Lighter Timer Pill */}
            <div
              onClick={() => setShowShutdownModal(true)}
              className="bg-rose-900/60 hover:bg-rose-800/80 px-3.5 py-1.5 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Clock size={13} className="text-rose-300 animate-pulse" />
              <span className="text-white font-mono-retro text-sm font-bold tracking-wider">
                {formatCountdown(secondsLeft)}
              </span>
              {isExitLocked && <Lock size={11} className="text-rose-400 opacity-80" />}
            </div>
          </div>
        </div>

        {/* Center: Open windows task list (ICONS ONLY!) */}
        <div className="flex-1 flex items-center justify-start gap-2 px-4 overflow-x-auto">
          {openWindows.map((id) => {
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
                className={`w-9 h-9 rounded-lg border flex items-center justify-center cursor-pointer transition-all ${
                  isActive
                    ? "bg-slate-800 border-white/40 text-[#ffd700] shadow-sm ring-1 ring-white/20"
                    : "bg-slate-900/60 border-white/10 text-slate-400 hover:bg-slate-800/80 hover:text-white"
                }`}
                title={t(`desktop.${id}`)}
              >
                {getWindowIcon(id)}
              </button>
            );
          })}
        </div>

        {/* Right: Language switcher & Live Clock */}
        <div className="flex items-center gap-4">
          {/* Language selector */}
          <div className="flex items-center bg-slate-900 border border-white/10 p-0.5 rounded-lg">
            <button
              onClick={() => setLanguage("pl")}
              className={`px-2 py-0.5 text-[9px] font-pixel cursor-pointer transition-all ${
                language === "pl"
                  ? "bg-white text-slate-900 rounded font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              PL
            </button>
            <span className="text-slate-600 text-[9px] px-0.5">|</span>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-0.5 text-[9px] font-pixel cursor-pointer transition-all ${
                language === "en"
                  ? "bg-white text-slate-900 rounded font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          {/* Readable Live Clock */}
          <div className="text-white font-mono-retro text-lg tracking-widest drop-shadow-sm font-bold">
            {timeStr}
          </div>
        </div>
      </div>

      {/* Shutdown System UI Modal */}
      {showShutdownModal && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center select-none p-4">
          <div className="pixel-window w-[440px] p-6 rounded-2xl bg-slate-900 border border-white/20 text-white flex flex-col items-center gap-4 text-center shadow-2xl">
            <div className="w-12 h-12 bg-rose-950/60 border border-rose-500/40 rounded-full flex items-center justify-center text-rose-400">
              <Power size={24} />
            </div>

            <div className="space-y-1">
              <h3 className="font-pixel text-sm text-white font-bold">Wyłączenie FocusOS</h3>
              <p className="text-xs font-mono-retro text-slate-300 leading-relaxed">
                {isExitLocked
                  ? `Zabronione! Musisz uczyć się jeszcze przez ${minutesLeft} min.`
                  : "Wymagany czas nauki minął. Możesz bezpiecznie wyjść z systemu."}
              </p>
            </div>

            {/* Identical Button Heights & Sizing */}
            <div className="flex items-center gap-3 w-full pt-2">
              <button
                onClick={() => setShowShutdownModal(false)}
                className="h-10 px-4 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-lg text-xs font-pixel text-slate-300 cursor-pointer flex-1 flex items-center justify-center transition-all"
              >
                ANULUJ
              </button>

              <button
                onClick={handleExit}
                disabled={isExitLocked}
                className={`h-10 px-4 rounded-lg text-xs font-pixel flex-1 flex items-center justify-center gap-1.5 transition-all ${
                  isExitLocked
                    ? "bg-slate-800/50 border border-slate-700 text-slate-500 cursor-not-allowed opacity-50"
                    : "bg-rose-600 hover:bg-rose-500 text-white border border-rose-400 cursor-pointer shadow-lg active:scale-95"
                }`}
              >
                {isExitLocked && <Lock size={12} />}
                <LogOut size={14} />
                <span>WYJDŹ Z APKI</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
