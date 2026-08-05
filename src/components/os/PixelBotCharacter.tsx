import React from "react";

export const PixelBotCharacter: React.FC = () => {
  return (
    <div className="flex flex-col items-center select-none animate-float-head cursor-pointer">
      {/* Antenna */}
      <div className="w-4 h-5 bg-indigo-500 border-2 border-slate-950 rounded-t-sm" />
      <div className="w-6 h-6 bg-[#00ffcc] border-3 border-slate-950 rounded-full animate-pulse shadow-[0_0_15px_#00ffcc] -mt-1 z-10" />

      {/* Large Minimalist Robot Head */}
      <div className="w-44 h-36 bg-indigo-900 border-4 border-slate-950 rounded-3xl p-2.5 flex items-center justify-center relative shadow-2xl">
        {/* Left Ear Cup */}
        <div className="absolute -left-3.5 top-10 w-4 h-10 bg-indigo-600 border-3 border-slate-950 rounded-l-lg" />
        {/* Right Ear Cup */}
        <div className="absolute -right-3.5 top-10 w-4 h-10 bg-indigo-600 border-3 border-slate-950 rounded-r-lg" />

        {/* Screen Face Display */}
        <div className="w-full h-full bg-[#0a0f24] border-3 border-slate-950 rounded-2xl flex flex-col items-center justify-center relative px-4 py-3 overflow-hidden shadow-inner">
          {/* Eyes & Cheeks Row */}
          <div className="flex items-center justify-between w-full px-2">
            {/* Left Eye */}
            <div className="w-6 h-7 bg-[#00ffcc] border-2 border-slate-950 rounded-md animate-pixel-blink shadow-[0_0_12px_#00ffcc]" />
            {/* Cute Blush Dots */}
            <div className="w-2.5 h-1.5 bg-rose-400/80 rounded-full" />
            <div className="w-2.5 h-1.5 bg-rose-400/80 rounded-full" />
            {/* Right Eye */}
            <div className="w-6 h-7 bg-[#00ffcc] border-2 border-slate-950 rounded-md animate-pixel-blink shadow-[0_0_12px_#00ffcc]" />
          </div>

          {/* Cute Smile Mouth */}
          <div className="w-8 h-3 bg-[#ffd700] rounded-b-xl mt-2 border-x-2 border-b-2 border-slate-950 shadow-sm" />
        </div>
      </div>
    </div>
  );
};
