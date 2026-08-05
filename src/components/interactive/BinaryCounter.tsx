import React, { useState } from "react";

/**
 * Interactive Binary Counter.
 * Click bits to toggle 0/1. See the decimal value update live.
 * Perfect for Level 0 — "How does a computer think?"
 */
export const BinaryCounter: React.FC = () => {
  const [bits, setBits] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const toggleBit = (index: number) => {
    setBits((prev) => {
      const next = [...prev];
      next[index] = next[index] === 0 ? 1 : 0;
      return next;
    });
  };

  const decimalValue = bits.reduce((acc, bit, i) => acc + bit * Math.pow(2, 7 - i), 0);
  const hexValue = decimalValue.toString(16).toUpperCase().padStart(2, "0");
  const charValue = decimalValue >= 32 && decimalValue <= 126 ? String.fromCharCode(decimalValue) : "—";

  return (
    <div className="my-6 p-5 bg-slate-900 border border-white/15 rounded-2xl select-none">
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">🔮</span>
        <span className="font-pixel text-xs text-emerald-400 font-bold uppercase tracking-wider">
          Interactive: Binary Counter
        </span>
      </div>

      {/* Bit labels (power of 2) */}
      <div className="flex justify-center gap-1.5 mb-1.5">
        {bits.map((_, i) => (
          <div key={`label-${i}`} className="w-10 text-center">
            <span className="text-[9px] font-mono-retro text-slate-500">2^{7 - i}</span>
          </div>
        ))}
      </div>

      {/* Bit value labels */}
      <div className="flex justify-center gap-1.5 mb-2">
        {bits.map((_, i) => (
          <div key={`val-${i}`} className="w-10 text-center">
            <span className="text-[9px] font-mono-retro text-slate-600">{Math.pow(2, 7 - i)}</span>
          </div>
        ))}
      </div>

      {/* Clickable bits */}
      <div className="flex justify-center gap-1.5 mb-5">
        {bits.map((bit, i) => (
          <button
            key={i}
            onClick={() => toggleBit(i)}
            className={`w-10 h-12 rounded-lg border-2 flex items-center justify-center text-lg font-mono-retro font-bold cursor-pointer transition-all active:scale-90 ${
              bit === 1
                ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                : "bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-500"
            }`}
          >
            {bit}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="flex items-center justify-center gap-6">
        <div className="text-center">
          <div className="text-[9px] font-pixel text-slate-500 uppercase mb-0.5">Decimal</div>
          <div className="font-mono-retro text-xl text-white font-bold">{decimalValue}</div>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="text-center">
          <div className="text-[9px] font-pixel text-slate-500 uppercase mb-0.5">Hex</div>
          <div className="font-mono-retro text-xl text-amber-400 font-bold">0x{hexValue}</div>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div className="text-center">
          <div className="text-[9px] font-pixel text-slate-500 uppercase mb-0.5">ASCII</div>
          <div className="font-mono-retro text-xl text-purple-400 font-bold">{charValue}</div>
        </div>
      </div>

      {/* Hint */}
      <p className="text-center text-[10px] font-pixel text-slate-500 mt-3">
        ↑ Click the bits to toggle them. Try making the letter "A" (65) or "Z" (90)!
      </p>
    </div>
  );
};
