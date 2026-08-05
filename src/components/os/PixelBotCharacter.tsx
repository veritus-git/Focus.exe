import React from "react";

export const PixelBotCharacter: React.FC = () => {
  return (
    <div className="flex flex-col items-center select-none">
      {/* Clean Minimalist 8-Bit Vector Robot */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Antenna */}
        <rect x="38" y="4" width="4" height="10" fill="#6366f1" />
        <rect x="36" y="2" width="8" height="4" fill="#00ffcc" />

        {/* Head Outer Container */}
        <rect x="16" y="14" width="48" height="40" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="4" />

        {/* Screen Face */}
        <rect x="22" y="20" width="36" height="28" rx="4" fill="#0f172a" />

        {/* Eyes (Glowing Pixel Style) */}
        <rect x="28" y="28" width="6" height="8" rx="1" fill="#00ffcc" />
        <rect x="46" y="28" width="6" height="8" rx="1" fill="#00ffcc" />

        {/* Minimalist Smile Mouth */}
        <path d="M34 42 H46" stroke="#ffd700" strokeWidth="3" strokeLinecap="round" />

        {/* Neck */}
        <rect x="34" y="54" width="12" height="6" fill="#334155" />

        {/* Body Base */}
        <path d="M20 60 H60 V72 H20 Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="4" />
        <circle cx="40" cy="66" r="3" fill="#00ffcc" />
      </svg>
    </div>
  );
};
