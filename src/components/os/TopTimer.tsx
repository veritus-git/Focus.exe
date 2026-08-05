import React, { useState, useEffect } from "react";

interface TopTimerProps {
  onTimeChange?: (secondsLeft: number) => void;
}

export const TopTimer: React.FC<TopTimerProps> = ({ onTimeChange }) => {
  const [secondsLeft, setSecondsLeft] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev <= 1 ? 0 : prev - 1;
        if (onTimeChange) onTimeChange(next);
        if (next === 0) clearInterval(interval);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;

  return (
    <div className="fixed top-5 right-8 z-[60] select-none">
      <span className="font-pixel text-3xl font-bold tracking-[0.18em] text-white/35 hover:text-white transition-colors duration-200 cursor-default scale-y-130 inline-block origin-top-right drop-shadow-md">
        {timeFormatted}
      </span>
    </div>
  );
};
