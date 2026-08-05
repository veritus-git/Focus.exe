import React, { useState, useRef, useEffect } from "react";
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

  const [position, setPosition] = useState(initialPos);
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (iconRef.current && !iconRef.current.contains(e.target as Node)) {
        setIsSelected(false);
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: initialPos.x,
    posY: initialPos.y,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
    setIsDragging(true);

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y,
    };

    let rafId: number | null = null;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const deltaX = moveEvent.clientX - dragStartRef.current.startX;
        const deltaY = moveEvent.clientY - dragStartRef.current.startY;
        setPosition({
          x: Math.max(10, dragStartRef.current.posX + deltaX),
          y: Math.max(10, dragStartRef.current.posY + deltaY),
        });
      });
    };

    const handleMouseUp = () => {
      if (rafId) cancelAnimationFrame(rafId);
      setIsDragging(false);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);

    if (isOpen) {
      focusWindow(id);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      openWindow(id);
    }, 400);
  };

  return (
    <div
      ref={iconRef}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        willChange: "left, top",
      }}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      className={`group inline-flex flex-col items-center justify-center p-2 rounded-xl cursor-grab active:cursor-grabbing select-none z-10 ${
        isSelected
          ? "bg-slate-900/60 border border-white/30 shadow-lg ring-2 ring-indigo-400/40"
          : "hover:bg-slate-900/30 border border-transparent"
      } ${isDragging ? "opacity-90 cursor-grabbing shadow-2xl" : ""}`}
    >
      {/* Icon Box */}
      <div className="w-12 h-12 bg-slate-900/90 border border-white/20 rounded-lg flex items-center justify-center text-white relative shadow-md group-hover:scale-105 transition-transform pointer-events-none">
        {icon || <GitBranch size={22} className="text-[#ffd700]" />}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute -top-1.5 -right-1.5 bg-indigo-500 text-white p-1 rounded-full shadow border border-white animate-spin">
            <Loader2 size={12} />
          </div>
        )}
      </div>

      {/* Label */}
      <span className="text-xs text-center text-white font-pixel font-bold leading-tight mt-1.5 drop-shadow-md max-w-[110px] break-words pointer-events-none">
        {label}
      </span>
    </div>
  );
};
