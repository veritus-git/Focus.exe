import React, { useState } from "react";

/**
 * Interactive Logic Gates simulator.
 * Toggle inputs and see how AND, OR, NOT gates work.
 */
export const LogicGates: React.FC = () => {
  const [inputA, setInputA] = useState(false);
  const [inputB, setInputB] = useState(false);

  const andResult = inputA && inputB;
  const orResult = inputA || inputB;
  const notAResult = !inputA;

  const BitButton: React.FC<{ value: boolean; onClick: () => void; label: string }> = ({
    value,
    onClick,
    label,
  }) => (
    <button
      onClick={onClick}
      className={`w-14 h-10 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all active:scale-90 gap-0 ${
        value
          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
          : "bg-slate-950 border-slate-700 text-slate-500 hover:border-slate-500"
      }`}
    >
      <span className="text-[8px] font-pixel opacity-60">{label}</span>
      <span className="font-mono-retro text-sm font-bold">{value ? "1" : "0"}</span>
    </button>
  );

  const ResultBit: React.FC<{ value: boolean; label: string; color: string }> = ({
    value,
    label,
    color,
  }) => (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[9px] font-pixel text-slate-500 uppercase">{label}</span>
      <div
        className={`w-14 h-10 rounded-lg border-2 flex items-center justify-center font-mono-retro text-sm font-bold transition-all ${
          value
            ? `bg-opacity-20 shadow-[0_0_12px_rgba(16,185,129,0.3)]`
            : "bg-slate-950 border-slate-700 text-slate-500"
        }`}
        style={
          value
            ? { backgroundColor: `${color}20`, borderColor: color, color: color }
            : undefined
        }
      >
        {value ? "1" : "0"}
      </div>
    </div>
  );

  return (
    <div className="my-6 p-5 bg-slate-900 border border-white/15 rounded-2xl select-none">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">⚡</span>
        <span className="font-pixel text-xs text-emerald-400 font-bold uppercase tracking-wider">
          Interactive: Logic Gates
        </span>
      </div>

      {/* Inputs */}
      <div className="flex items-center justify-center gap-4 mb-5">
        <BitButton value={inputA} onClick={() => setInputA(!inputA)} label="Input A" />
        <BitButton value={inputB} onClick={() => setInputB(!inputB)} label="Input B" />
      </div>

      {/* Gate Results */}
      <div className="flex items-center justify-center gap-5">
        <div className="flex flex-col items-center gap-1.5 p-3 bg-slate-950 rounded-xl border border-white/5">
          <span className="text-[9px] font-pixel text-amber-400 font-bold">A AND B</span>
          <span className="text-[8px] font-pixel text-slate-500 italic">both must be 1</span>
          <ResultBit value={andResult} label="" color="#fbbf24" />
        </div>

        <div className="flex flex-col items-center gap-1.5 p-3 bg-slate-950 rounded-xl border border-white/5">
          <span className="text-[9px] font-pixel text-sky-400 font-bold">A OR B</span>
          <span className="text-[8px] font-pixel text-slate-500 italic">any can be 1</span>
          <ResultBit value={orResult} label="" color="#38bdf8" />
        </div>

        <div className="flex flex-col items-center gap-1.5 p-3 bg-slate-950 rounded-xl border border-white/5">
          <span className="text-[9px] font-pixel text-purple-400 font-bold">NOT A</span>
          <span className="text-[8px] font-pixel text-slate-500 italic">flips value</span>
          <ResultBit value={notAResult} label="" color="#a78bfa" />
        </div>
      </div>

      <p className="text-center text-[10px] font-pixel text-slate-500 mt-3">
        ↑ Click inputs to toggle. From these 3 gates, you can build an entire CPU.
      </p>
    </div>
  );
};
