import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FileText, Minus, X, Save } from "lucide-react";
import { useOSStore } from "../../store/useOSStore";

export const NotesWindow: React.FC = () => {
  const { t } = useTranslation();
  const { closeWindow, toggleMinimizeWindow, focusWindow } = useOSStore();

  const [text, setText] = useState("");
  const [saved, setSaved] = useState(false);

  const [windowPos, setWindowPos] = useState({ x: 220, y: 120 });
  const windowRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ startX: 0, startY: 0, posX: 220, posY: 120 });

  // Direct DOM transform dragging for 144Hz 0ms lag
  const handleTitleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button")) return;

    focusWindow("notes");
    isDraggingRef.current = true;
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: windowPos.x,
      posY: windowPos.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDraggingRef.current || !windowRef.current) return;
      const deltaX = moveEvent.clientX - dragStartRef.current.startX;
      const deltaY = moveEvent.clientY - dragStartRef.current.startY;
      const newX = Math.max(10, dragStartRef.current.posX + deltaX);
      const newY = Math.max(10, dragStartRef.current.posY + deltaY);

      windowRef.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      const deltaX = upEvent.clientX - dragStartRef.current.startX;
      const deltaY = upEvent.clientY - dragStartRef.current.startY;
      setWindowPos({
        x: Math.max(10, dragStartRef.current.posX + deltaX),
        y: Math.max(10, dragStartRef.current.posY + deltaY),
      });

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div
      ref={windowRef}
      onMouseDown={() => focusWindow("notes")}
      style={{ transform: `translate3d(${windowPos.x}px, ${windowPos.y}px, 0)` }}
      className="fixed top-0 left-0 w-[380px] h-[340px] bg-slate-900 border border-white/20 rounded-2xl shadow-2xl z-30 select-none flex flex-col overflow-hidden"
    >
      {/* Titlebar */}
      <div
        onMouseDown={handleTitleMouseDown}
        className="h-9 px-3 bg-slate-950 border-b border-white/10 flex items-center justify-between cursor-grab active:cursor-grabbing shrink-0"
      >
        <div className="flex items-center gap-2 text-white font-pixel text-xs">
          <FileText size={14} className="text-amber-400" />
          <span>{t("notes.title")}</span>
        </div>

        <div className="flex items-center gap-1.5" onMouseDown={(e) => e.stopPropagation()}>
          <button
            onClick={handleSave}
            className="p-1 bg-emerald-950 hover:bg-emerald-800 border border-emerald-500/40 rounded text-emerald-400 cursor-pointer"
            title="Zapisz"
          >
            <Save size={11} />
          </button>
          <button
            onClick={() => toggleMinimizeWindow("notes")}
            className="w-5 h-5 bg-slate-800 hover:bg-slate-700 rounded flex items-center justify-center text-white cursor-pointer"
          >
            <Minus size={10} />
          </button>
          <button
            onClick={() => closeWindow("notes")}
            className="w-5 h-5 bg-rose-900 hover:bg-rose-800 rounded flex items-center justify-center text-white cursor-pointer"
          >
            <X size={10} />
          </button>
        </div>
      </div>

      {/* Notepad Text Editor */}
      <div className="flex-1 p-3 bg-slate-950 flex flex-col gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t("notes.placeholder")}
          className="flex-1 w-full bg-[#0a0f1d] border border-white/10 rounded-xl p-3 text-xs font-pixel text-slate-200 resize-none focus:outline-none focus:border-amber-400/50 leading-relaxed shadow-inner"
        />

        {/* Footer Bar */}
        <div className="flex items-center justify-between text-[11px] font-pixel text-slate-400 px-1">
          <span>{text.length} znaków</span>
          {saved && <span className="text-emerald-400 font-bold">Zapisano!</span>}
        </div>
      </div>
    </div>
  );
};
