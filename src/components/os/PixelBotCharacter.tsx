import React from "react";

export const PixelBotCharacter: React.FC = () => {
  return (
    <div className="flex flex-col items-center select-none group">
      {/* Antenna Gem */}
      <div className="w-3.5 h-3.5 bg-[#00ffcc] border-2 border-slate-950 rounded-sm animate-pulse shadow-[0_0_12px_#00ffcc]" />
      {/* Antenna Pole */}
      <div className="w-1.5 h-3.5 bg-indigo-400 border-x border-slate-950" />

      {/* Robot Head (Navy & Indigo Blue) */}
      <div className="w-22 h-18 bg-indigo-900 border-4 border-slate-950 rounded-xl p-1.5 flex flex-col items-center justify-center relative shadow-2xl">
        {/* Left Cute Ear / Headphone */}
        <div className="absolute -left-2.5 top-4 w-3 h-5 bg-sky-500 border-2 border-slate-950 rounded-l-md" />
        {/* Right Cute Ear / Headphone */}
        <div className="absolute -right-2.5 top-4 w-3 h-5 bg-sky-500 border-2 border-slate-950 rounded-r-md" />

        {/* Screen Face Display */}
        <div className="w-full h-full bg-[#0a0f24] border-2 border-slate-950 rounded-lg flex flex-col items-center justify-center relative overflow-hidden px-2 py-1">
          {/* Eyes & Cheeks Row */}
          <div className="flex items-center justify-between w-full px-1">
            {/* Left Eye */}
            <div className="w-3.5 h-4 bg-[#00ffcc] border border-slate-950 rounded-xs animate-pixel-blink shadow-[0_0_8px_#00ffcc]" />
            {/* Blush Cheeks */}
            <div className="w-1.5 h-1 bg-rose-400/80 rounded-full" />
            <div className="w-1.5 h-1 bg-rose-400/80 rounded-full" />
            {/* Right Eye */}
            <div className="w-3.5 h-4 bg-[#00ffcc] border border-slate-950 rounded-xs animate-pixel-blink shadow-[0_0_8px_#00ffcc]" />
          </div>

          {/* Cute Smile Mouth */}
          <div className="w-4 h-1.5 bg-[#ffd700] rounded-b-md mt-1 border-x border-b border-slate-950" />
        </div>
      </div>

      {/* Robot Body & Arms */}
      <div className="w-14 h-9 bg-slate-900 border-x-4 border-b-4 border-slate-950 rounded-b-lg flex items-center justify-center relative">
        {/* Left Arm */}
        <div className="absolute -left-2.5 top-1 w-2.5 h-5 bg-indigo-800 border-2 border-slate-950 rounded-l-sm" />
        {/* Chest Core Gem */}
        <div className="w-3.5 h-3.5 bg-sky-400 border border-slate-950 rounded-full animate-pulse shadow-[0_0_8px_#38bdf8]" />
        {/* Right Arm */}
        <div className="absolute -right-2.5 top-1 w-2.5 h-5 bg-indigo-800 border-2 border-slate-950 rounded-r-sm" />
      </div>
    </div>
  );
};
