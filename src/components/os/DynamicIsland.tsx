import React, { useState, useEffect } from "react";
import { useOSStore } from "../../store/useOSStore";

interface DynamicIslandProps {
  onTimeChange?: (secondsLeft: number) => void;
}

export const DynamicIsland: React.FC<DynamicIslandProps> = ({ onTimeChange }) => {
  const { introFinished } = useOSStore();
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  useEffect(() => {
    if (!introFinished) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev <= 1 ? 0 : prev - 1;
        if (onTimeChange) onTimeChange(next);
        if (next === 0) clearInterval(interval);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [introFinished]);

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="fixed top-0 left-1/2 -translate-x-1/2 z-50 select-none">
      {/* iPhone X Top Notch / Island hanging down directly from top edge */}
      <div className="px-6 h-8 bg-slate-950/95 border-x border-b border-white/20 rounded-b-2xl flex items-center justify-center gap-3 text-white shadow-2xl hover:h-9 transition-all cursor-default group">
        <span className="w-2 h-2 rounded-full bg-[#00ffcc] animate-pulse shadow-[0_0_8px_#00ffcc]" />
        <span className="font-pixel text-[11px] font-bold tracking-widest text-slate-100 group-hover:text-white drop-shadow">
          {timeFormatted}
        </span>
      </div>
    </div>
  );
};
