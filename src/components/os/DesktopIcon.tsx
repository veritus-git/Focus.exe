import React, { useRef, useEffect, useCallback } from "react";
import { Loader2, GitBranch } from "lucide-react";
import { WindowId, useOSStore } from "../../store/useOSStore";

interface DesktopIconProps {
  id: WindowId;
  label: string;
  icon?: React.ReactNode;
  initialPos?: { x: number; y: number };
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  label,
  icon,
  initialPos = { x: 30, y: 30 },
}) => {
  const { openWindow, openWindows, focusWindow } = useOSStore();
  const isOpen = openWindows.includes(id);

  const iconRef = useRef<HTMLDivElement>(null);
  const isSelectedRef = useRef(false);
  const isLoadingRef = useRef(false);
  const posRef = useRef({ x: initialPos.x, y: initialPos.y });
  const hasDraggedRef = useRef(false);

  // Force a single re-render only for loading state
  const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (iconRef.current && !iconRef.current.contains(e.target as Node)) {
        if (isSelectedRef.current) {
          isSelectedRef.current = false;
          iconRef.current.classList.remove("icon-selected");
          iconRef.current.classList.add("icon-idle");
        }
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    hasDraggedRef.current = false;

    // Select — direct DOM, no React
    isSelectedRef.current = true;
    if (iconRef.current) {
      iconRef.current.classList.add("icon-selected");
      iconRef.current.classList.remove("icon-idle");
    }

    const startX = e.clientX;
    const startY = e.clientY;
    const startPosX = posRef.current.x;
    const startPosY = posRef.current.y;
    const el = iconRef.current;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasDraggedRef.current = true;

      const newX = Math.max(10, startPosX + dx);
      const newY = Math.max(10, startPosY + dy);
      posRef.current.x = newX;
      posRef.current.y = newY;

      // ═══ DIRECT DOM — ZERO REACT RENDERS ═══
      if (el) {
        el.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, []);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasDraggedRef.current) return; // don't open if we were dragging

    if (isOpen) {
      focusWindow(id);
      return;
    }

    isLoadingRef.current = true;
    forceUpdate();
    setTimeout(() => {
      isLoadingRef.current = false;
      openWindow(id);
      forceUpdate();
    }, 350);
  }, [id, isOpen, focusWindow, openWindow]);

  return (
    <div
      ref={iconRef}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        transform: `translate3d(${initialPos.x}px, ${initialPos.y}px, 0)`,
        willChange: "transform",
      }}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      className="icon-idle group w-28 inline-flex flex-col items-center justify-center p-2 rounded-xl cursor-grab active:cursor-grabbing select-none z-10 border border-transparent hover:bg-slate-900/30"
    >
      {/* Icon Box */}
      <div className="w-12 h-12 bg-slate-900/90 border border-white/20 rounded-lg flex items-center justify-center text-white relative shadow-md group-hover:scale-105 transition-transform pointer-events-none">
        {icon || <GitBranch size={22} className="text-[#ffd700]" />}

        {/* Loading Spinner */}
        {isLoadingRef.current && (
          <div className="absolute -top-1.5 -right-1.5 bg-indigo-500 text-white p-1 rounded-full shadow border border-white animate-spin">
            <Loader2 size={12} />
          </div>
        )}
      </div>

      {/* Label */}
      <span className="text-[9px] text-center text-white font-pixel font-bold leading-tight mt-1.5 drop-shadow-md whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </div>
  );
};
