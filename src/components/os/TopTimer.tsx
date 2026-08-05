import React, { useState, useEffect } from "react";
import { Timer } from "lucide-react";
import { useOSStore } from "../../store/useOSStore";

export const TopTimer: React.FC = () => {
  const { introFinished } = useOSStore();
  const [secondsLeft, setSecondsLeft] = useState(15 * 60);

  useEffect(() => {
    if (!introFinished) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [introFinished]);

  if (!introFinished) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="fixed top-4 right-6 z-40 flex items-center gap-2 text-slate-800/80 hover:text-slate-900 select-none transition-opacity">
      <Timer size={16} className="text-slate-800/70" />
      <span className="font-pixel text-base font-bold tracking-wider drop-shadow-xs">
        {timeFormatted}
      </span>
    </div>
  );
};
