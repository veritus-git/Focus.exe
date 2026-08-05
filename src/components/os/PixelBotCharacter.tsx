import React from "react";

export const PixelBotCharacter: React.FC = () => {
  return (
    <div className="flex flex-col items-center select-none animate-float-head">
      {/* Antenna */}
      <div className="w-2.5 h-3 bg-indigo-500 rounded-t-xs" />
      <div className="w-4 h-4 bg-[#00ffcc] rounded-full animate-pulse shadow-[0_0_10px_#00ffcc] -mt-1 z-10" />

      {/* Robot Head (50% smaller, no red dots, no black outer border) */}
      <div className="w-24 h-20 bg-indigo-900 border-2 border-indigo-400/40 rounded-2xl p-1.5 flex items-center justify-center relative shadow-xl">
        {/* Left Ear */}
        <div className="absolute -left-2 top-6 w-2.5 h-6 bg-indigo-700 rounded-l-md" />
        {/* Right Ear */}
        <div className="absolute -right-2 top-6 w-2.5 h-6 bg-indigo-700 rounded-r-md" />

        {/* Screen Display */}
        <div className="w-full h-full bg-[#0b0f19] border border-white/10 rounded-xl flex flex-col items-center justify-center relative px-2.5 py-1.5 overflow-hidden">
          {/* Eyes Row (No red blush dots!) */}
          <div className="flex items-center justify-between w-full px-2">
            {/* Left Glowing Neon Eye */}
            <div className="w-3.5 h-4 bg-[#00ffcc] rounded-xs animate-pixel-blink shadow-[0_0_8px_#00ffcc]" />

            {/* Right Glowing Neon Eye */}
            <div className="w-3.5 h-4 bg-[#00ffcc] rounded-xs animate-pixel-blink shadow-[0_0_8px_#00ffcc]" />
          </div>

          {/* Cute Smile Mouth */}
          <div className="w-5 h-2 bg-[#ffd700] rounded-b-md mt-1.5 shadow-sm" />
        </div>
      </div>
    </div>
  );
};
