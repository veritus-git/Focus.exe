import React, { useState, useRef } from "react";
import { Loader2, GitBranch } from "lucide-react";
import { WindowId, useOSStore } from "../../store/useOSStore";

interface DesktopIconProps {
  id: WindowId;
  label: string;
  icon?: React.ReactNode;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ id, label, icon }) => {
  const { openWindow, openWindows, focusWindow } = useOSStore();
  const isOpen = openWindows.includes(id);

  const [position, setPosition] = useState({ x: 30, y: 30 });
  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: position.x,
    posY: position.y,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);

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

        const newX = Math.max(10, dragStartRef.current.posX + deltaX);
        const newY = Math.max(10, dragStartRef.current.posY + deltaY);

        setPosition({ x: newX, y: newY });
      });
    };

    const handleMouseUp = () => {
      if (rafId) cancelAnimationFrame(rafId);
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
    }, 800);
  };

  return (
    <div
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        touchAction: "none",
      }}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      className={`fixed top-0 left-0 group inline-flex flex-col items-center justify-center p-2 rounded-xl cursor-grab active:cursor-grabbing select-none transition-shadow z-10 ${
        isSelected
          ? "bg-slate-900/40 border border-white/30 backdrop-blur-xs shadow-md ring-2 ring-indigo-400/40"
          : "hover:bg-slate-900/20 border border-transparent"
      } ${isLoading ? "cursor-wait" : ""}`}
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

      {/* Label: Full name visible in clean 8-bit text */}
      <span className="text-[10px] text-center text-white font-pixel font-bold leading-tight mt-1.5 drop-shadow-md max-w-[110px] break-words pointer-events-none">
        {label}
      </span>
    </div>
  );
};
