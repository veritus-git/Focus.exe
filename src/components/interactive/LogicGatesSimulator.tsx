import { useState } from "react";

type GateType = "AND" | "OR" | "NOT" | "NAND" | "XOR";

const computeGate = (gate: GateType, a: boolean, b: boolean): boolean => {
  switch (gate) {
    case "AND": return a && b;
    case "OR": return a || b;
    case "NOT": return !a;
    case "NAND": return !(a && b);
    case "XOR": return a !== b;
    default: return false;
  }
};

const GateBox = ({ gate, a, b, onToggleA, onToggleB }: { gate: GateType; a: boolean; b: boolean; onToggleA: () => void; onToggleB: () => void }) => {
  const output = computeGate(gate, a, b);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 flex flex-col items-center gap-4 shadow-lg w-full">
      <div className="text-white font-pixel text-sm uppercase tracking-wider">{gate}</div>
      <div className="flex items-center gap-6 w-full justify-center">
        {/* Inputs */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onToggleA}
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg font-mono transition-all ${
              a ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] border-emerald-400" : "bg-slate-800 text-slate-500 border-slate-700"
            } border-2`}
          >
            {a ? "1" : "0"}
          </button>
          {gate !== "NOT" && (
            <button
              onClick={onToggleB}
              className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg font-mono transition-all ${
                b ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] border-emerald-400" : "bg-slate-800 text-slate-500 border-slate-700"
              } border-2`}
            >
              {b ? "1" : "0"}
            </button>
          )}
        </div>

        {/* Wiring visualization */}
        <div className="flex flex-col justify-center relative w-16 h-16">
          <div className={`absolute top-2 left-0 w-8 h-1 ${a ? "bg-emerald-500" : "bg-slate-700"} transition-colors`} />
          {gate !== "NOT" && (
            <div className={`absolute bottom-2 left-0 w-8 h-1 ${b ? "bg-emerald-500" : "bg-slate-700"} transition-colors`} />
          )}
          <div className={`absolute top-1/2 left-8 w-8 h-1 -translate-y-1/2 ${output ? "bg-amber-400" : "bg-slate-700"} transition-colors`} />
          
          <div className="absolute top-1/2 left-8 -translate-y-1/2 -translate-x-1/2 w-6 h-12 bg-slate-800 border-2 border-slate-600 rounded-r-full" />
          {gate === "NOT" || gate === "NAND" ? (
             <div className="absolute top-1/2 left-[44px] -translate-y-1/2 w-2 h-2 rounded-full border-2 border-slate-400 bg-slate-900" />
          ) : null}
        </div>

        {/* Output */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl font-mono transition-all ${
            output ? "bg-amber-400 text-slate-900 shadow-[0_0_20px_rgba(251,191,36,0.6)] border-amber-300" : "bg-slate-800 text-slate-500 border-slate-700"
          } border-2`}
        >
          {output ? "1" : "0"}
        </div>
      </div>
    </div>
  );
};

export const LogicGatesSimulator = () => {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6 my-6 p-6 bg-slate-950/50 rounded-2xl border border-white/5">
      <div className="text-center mb-2">
        <p className="text-slate-400 text-sm font-medium mb-1">Click the input blocks (0/1) to toggle power.</p>
        <div className="flex items-center justify-center gap-4 text-xs font-mono text-slate-500">
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" /> INPUT (Current)</span>
          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-400" /> OUTPUT (Result)</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <GateBox gate="AND" a={a} b={b} onToggleA={() => setA(!a)} onToggleB={() => setB(!b)} />
        <GateBox gate="OR" a={a} b={b} onToggleA={() => setA(!a)} onToggleB={() => setB(!b)} />
        <GateBox gate="NOT" a={a} b={b} onToggleA={() => setA(!a)} onToggleB={() => setB(!b)} />
        <GateBox gate="NAND" a={a} b={b} onToggleA={() => setA(!a)} onToggleB={() => setB(!b)} />
      </div>
    </div>
  );
};

export default LogicGatesSimulator;
