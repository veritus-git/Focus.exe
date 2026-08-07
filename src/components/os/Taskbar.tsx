import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Power, GitBranch, Lock, LockOpen, LogOut } from "lucide-react";
import { WindowId, useOSStore } from "../../store/useOSStore";

interface TaskbarProps {
  secondsLeft: number;
  setSecondsLeft: React.Dispatch<React.SetStateAction<number>>;
}

export const Taskbar: React.FC<TaskbarProps> = ({ secondsLeft, setSecondsLeft }) => {
  const { t } = useTranslation();
  const { openWindows, activeWindow, minimizedWindows, focusWindow, toggleMinimizeWindow, language, setLanguage } = useOSStore();
  const [timeStr, setTimeStr] = useState<string>("");
  const [showShutdownModal, setShowShutdownModal] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<boolean>(false);

  // Timer countdown logic
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft, setSecondsLeft]);

  // Real-time clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatCountdown = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const isExitLocked = secondsLeft > 0;

  const handleUnlockAndShutdown = () => {
    if (isExitLocked) {
      if (pinInput === "1234") {
        setSecondsLeft(0); // bypass timer
        if (window.electronAPI) {
          window.electronAPI.exitApp();
        } else {
          alert(t("taskbar.systemShutdownSuccess"));
        }
      } else {
        setPinError(true);
        setTimeout(() => setPinError(false), 2000);
      }
    } else {
      if (window.electronAPI) {
        window.electronAPI.exitApp();
      } else {
        alert(t("taskbar.systemShutdownSuccess"));
      }
    }
  };

  const getWindowIcon = (id: WindowId) => {
    if (id === "skillTree") return <GitBranch size={16} />;
    return null;
  };

  return (
    <>
      <div className="h-11 bg-slate-950/95 border-t border-white/10 px-4 flex items-center justify-between z-40 select-none shadow-lg">
        {/* Left: Power Pill with timer or unlock icon */}
        <div className="flex items-center">
          <div className={`h-6 border rounded-xl overflow-hidden flex items-center shadow-sm ${
            isExitLocked
              ? "bg-rose-950/80 border-rose-500/40"
              : "bg-emerald-950/80 border-emerald-500/40"
          }`}>
            {/* Power Button */}
            <button
              onClick={() => setShowShutdownModal(true)}
              className={`w-8 h-full text-white flex items-center justify-center cursor-pointer transition-colors active:scale-95 border-r shrink-0 ${
                isExitLocked
                  ? "bg-rose-600 hover:bg-rose-500 border-rose-500/40"
                  : "bg-emerald-600 hover:bg-emerald-500 border-emerald-500/40"
              }`}
              title={t("taskbar.shutdownTitle")}
            >
              <Power size={13} />
            </button>

            {/* Timer or Unlock Icon */}
            <div
              onClick={() => setShowShutdownModal(true)}
              className={`px-3 h-full flex items-center gap-1.5 cursor-pointer transition-colors ${
                isExitLocked
                  ? "bg-rose-900/40 hover:bg-rose-900/70"
                  : "bg-emerald-900/40 hover:bg-emerald-900/70"
              }`}
            >
              {isExitLocked ? (
                <>
                  <span className="text-white font-mono-retro text-xs tracking-wider">
                    {formatCountdown(secondsLeft)}
                  </span>
                  <Lock size={10} className="text-rose-300 opacity-90 shrink-0" />
                </>
              ) : (
                <LockOpen size={14} className="text-emerald-300 shrink-0" />
              )}
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
                    focusWindow(id);
                  } else if (isActive) {
                    toggleMinimizeWindow(id);
                  } else {
                    focusWindow(id);
                  }
                }}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer border ${
                  isActive
                    ? "bg-indigo-600/60 border-indigo-400 text-white shadow-sm"
                    : isMinimized
                    ? "bg-slate-900/60 border-slate-700/50 text-slate-500 hover:text-slate-300"
                    : "bg-slate-800/80 border-slate-600 text-slate-300 hover:bg-slate-700"
                }`}
                title={t(`taskbar.${id}`)}
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
          <div className="text-white font-mono-retro text-lg tracking-widest" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}>
            {timeStr}
          </div>
        </div>
      </div>

      {/* Shutdown System UI Modal */}
      {showShutdownModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-6 max-w-sm w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center gap-3 text-rose-400">
              <Power size={24} />
              <h3 className="font-pixel text-lg text-white">
                {t("taskbar.shutdownTitle")}
              </h3>
            </div>

            {isExitLocked ? (
              <>
                <div className="bg-rose-950/40 border border-rose-900/50 rounded-lg p-3 text-xs text-rose-200 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Lock size={12} /> {t("taskbar.sessionLocked")}
                  </p>
                  <p className="text-[11px] opacity-80 leading-relaxed">
                    {t("taskbar.lockReason", {
                      time: formatCountdown(secondsLeft),
                    })}
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-slate-400 block font-medium">
                    {t("taskbar.enterPinPrompt")}
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="••••"
                    className="w-full bg-slate-950 border border-white/10 rounded px-3 py-2 text-center text-lg tracking-widest text-white focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  {pinError && (
                    <p className="text-[10px] text-rose-400 font-medium text-center">
                      {t("taskbar.invalidPin")}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <p className="text-xs text-slate-300 leading-relaxed">
                {t("taskbar.confirmShutdown")}
              </p>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setShowShutdownModal(false);
                  setPinInput("");
                  setPinError(false);
                }}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-medium cursor-pointer transition-colors"
              >
                {t("taskbar.cancel")}
              </button>
              <button
                onClick={handleUnlockAndShutdown}
                className={`px-4 py-2 text-white rounded text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 ${
                  isExitLocked
                    ? "bg-rose-600 hover:bg-rose-500"
                    : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                <LogOut size={12} />
                {isExitLocked ? t("taskbar.unlockAndExit") : t("taskbar.shutdownAction")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
