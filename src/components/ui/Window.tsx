import React, { useRef } from "react";
import { X, Minus, Move } from "lucide-react";
import { useOSStore, WindowId } from "../../store/useOSStore";

interface WindowProps {
  id: WindowId;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  height?: string;
  isFullScreen?: boolean;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  children,
  width = "w-[800px]",
  height = "h-[520px]",
  isFullScreen = false,
}) => {
  const {
    activeWindow,
    closeWindow,
    toggleMinimizeWindow,
    focusWindow,
    windowPositions,
    updateWindowPosition,
  } = useOSStore();

  const isActive = activeWindow === id;
  const storedPos = windowPositions[id] || { x: 10, y: 10 };
  const position = isFullScreen ? { x: 10, y: 10 } : storedPos;

  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number }>({
    startX: 0,
    startY: 0,
    posX: position.x,
    posY: position.y,
  });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isFullScreen) return; // Fullscreen windows fixed in place
    e.stopPropagation();
    focusWindow(id);

    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: position.x,
      posY: position.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - dragStartRef.current.startX;
      const deltaY = moveEvent.clientY - dragStartRef.current.startY;

      const newX = Math.max(0, dragStartRef.current.posX + deltaX);
      const newY = Math.max(0, dragStartRef.current.posY + deltaY);

      updateWindowPosition(id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const windowSizeClass = isFullScreen
    ? "w-[calc(100vw-20px)] h-[calc(100vh-70px)]"
    : `${width} ${height}`;

  return (
    <div
      onClick={() => focusWindow(id)}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        zIndex: isActive ? 40 : 20,
      }}
      className={`fixed top-0 left-0 ${windowSizeClass} pixel-window flex flex-col transition-shadow duration-100 ${
        isActive ? "pixel-window-active" : "opacity-95"
      }`}
    >
      {/* Window Titlebar */}
      <div
        onMouseDown={handleMouseDown}
        className={`px-4 py-2.5 flex items-center justify-between select-none border-b border-white/10 ${
          isFullScreen ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        } ${
          isActive
            ? "bg-slate-900/90 text-white"
            : "bg-slate-950/80 text-slate-400"
        }`}
      >
        <div className="flex items-center gap-2 text-[#ffd700] text-xs font-pixel tracking-wide truncate">
          {!isFullScreen && <Move size={12} className="text-slate-400 opacity-60" />}
          {icon && <span>{icon}</span>}
          <span className="truncate text-white font-bold">{title}</span>
        </div>

        {/* Window Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMinimizeWindow(id);
            }}
            className="w-6 h-6 bg-slate-800 hover:bg-slate-700 border border-white/20 rounded flex items-center justify-center text-white active:scale-95 cursor-pointer"
            title="Minimize"
          >
            <Minus size={12} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
            className="w-6 h-6 bg-rose-900/80 hover:bg-rose-800 border border-rose-400/40 rounded flex items-center justify-center text-white active:scale-95 cursor-pointer"
            title="Close"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {/* Window Content Container */}
      <div className="flex-1 bg-slate-950/90 p-4 overflow-auto text-white text-xs relative rounded-b-xl">
        {children}
      </div>
    </div>
  );
};
