import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Calculator, Minus, X } from "lucide-react";
import { useOSStore } from "../../store/useOSStore";

export const CalculatorWindow: React.FC = () => {
  const { t } = useTranslation();
  const { closeWindow, toggleMinimizeWindow, focusWindow } = useOSStore();

  const [display, setDisplay] = useState("0");
  const [prevVal, setPrevVal] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [newNum, setNewNum] = useState(true);

  const [windowPos, setWindowPos] = useState({ x: 120, y: 80 });
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, posX: 120, posY: 80 });

  const handleTitleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    focusWindow("calculator");
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: windowPos.x,
      posY: windowPos.y,
    };

    let rafId: number | null = null;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const deltaX = moveEvent.clientX - dragStartRef.current.startX;
        const deltaY = moveEvent.clientY - dragStartRef.current.startY;
        setWindowPos({
          x: Math.max(10, dragStartRef.current.posX + deltaX),
          y: Math.max(10, dragStartRef.current.posY + deltaY),
        });
      });
    };

    const handleMouseUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      setIsDragging(false);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleNum = (num: string) => {
    if (display === "0" || newNum) {
      setDisplay(num);
      setNewNum(false);
    } else {
      if (display.length < 10) setDisplay(display + num);
    }
  };

  const handleOp = (nextOp: string) => {
    setPrevVal(parseFloat(display));
    setOp(nextOp);
    setNewNum(true);
  };

  const handleEqual = () => {
    if (prevVal === null || op === null) return;
    const current = parseFloat(display);
    let res = 0;
    if (op === "+") res = prevVal + current;
    if (op === "-") res = prevVal - current;
    if (op === "×") res = prevVal * current;
    if (op === "÷") res = current !== 0 ? prevVal / current : 0;

    setDisplay(String(Number(res.toFixed(6))));
    setPrevVal(null);
    setOp(null);
    setNewNum(true);
  };

  const handleClear = () => {
    setDisplay("0");
    setPrevVal(null);
    setOp(null);
    setNewNum(true);
  };

  const buttons = [
    ["C", "÷", "×", "-"],
    ["7", "8", "9", "+"],
    ["4", "5", "6", "="],
    ["1", "2", "3", "0"],
  ];

  const { minimizedWindows } = useOSStore();
  const isMinimized = minimizedWindows.includes("calculator");

  return (
    <div
      onMouseDown={() => focusWindow("calculator")}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        transform: `translate3d(${windowPos.x}px, ${windowPos.y}px, 0)`,
        willChange: "transform",
      }}
      className={`w-[280px] bg-slate-900 border border-white/20 rounded-2xl shadow-2xl z-30 select-none overflow-hidden ${
        !isDragging ? "transition-all duration-300 ease-in-out" : ""
      } ${
        isMinimized ? "scale-95 opacity-0 pointer-events-none translate-y-8" : "scale-100 opacity-100 translate-y-0"
      }`}
    >
      {/* Titlebar */}
      <div
        onMouseDown={handleTitleMouseDown}
        className="h-9 px-3 bg-slate-950 border-b border-white/10 flex items-center justify-between cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2 text-white font-pixel text-xs">
          <Calculator size={14} className="text-emerald-400" />
          <span>{t("calculator.title")}</span>
        </div>

        <div className="flex items-center gap-1.5" onMouseDown={(e) => e.stopPropagation()}>
          <button
            onClick={() => toggleMinimizeWindow("calculator")}
            className="w-5 h-5 bg-slate-800 hover:bg-slate-700 rounded flex items-center justify-center text-white cursor-pointer"
          >
            <Minus size={10} />
          </button>
          <button
            onClick={() => closeWindow("calculator")}
            className="w-5 h-5 bg-rose-900 hover:bg-rose-800 rounded flex items-center justify-center text-white cursor-pointer"
          >
            <X size={10} />
          </button>
        </div>
      </div>

      {/* Screen */}
      <div className="p-4 bg-slate-950">
        <div className="w-full h-14 bg-[#0a0f1d] border border-white/10 rounded-xl p-3 flex flex-col justify-end items-end overflow-hidden shadow-inner">
          <span className="font-mono-retro text-2xl text-emerald-400 tracking-wider font-bold">
            {display}
          </span>
        </div>
      </div>

      {/* Grid Keypad */}
      <div className="p-3 grid grid-cols-4 gap-2 bg-slate-900">
        {buttons.flat().map((btn, idx) => {
          let btnColor = "bg-slate-800 hover:bg-slate-700 text-white border-slate-700";
          if (["÷", "×", "-", "+"].includes(btn)) {
            btnColor = "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-400";
          }
          if (btn === "=") {
            btnColor = "bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-300 font-bold";
          }
          if (btn === "C") {
            btnColor = "bg-rose-600 hover:bg-rose-500 text-white border-rose-400";
          }

          return (
            <button
              key={idx}
              onClick={() => {
                if (btn === "C") handleClear();
                else if (btn === "=") handleEqual();
                else if (["÷", "×", "-", "+"].includes(btn)) handleOp(btn);
                else handleNum(btn);
              }}
              className={`h-11 border rounded-xl font-pixel text-xs shadow cursor-pointer active:scale-95 transition-transform flex items-center justify-center ${btnColor}`}
            >
              {btn}
            </button>
          );
        })}
      </div>
    </div>
  );
};
