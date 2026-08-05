import React, { useState } from "react";
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

  const [isSelected, setIsSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSingleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSelected(true);

    if (isOpen) {
      focusWindow(id);
      return;
    }

    // Show cursor loading spinner indicator for 1 second
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      openWindow(id);
    }, 1000);
  };

  return (
    <div
      onClick={handleSingleClick}
      onDoubleClick={handleDoubleClick}
      className={`group inline-flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer select-none transition-all duration-150 ${
        isSelected
          ? "bg-slate-900/30 border border-slate-900/40 backdrop-blur-xs shadow-sm ring-2 ring-indigo-400/40"
          : "hover:bg-slate-900/10 border border-transparent"
      } ${isLoading ? "cursor-wait" : ""}`}
    >
      {/* Icon Box */}
      <div className="w-12 h-12 bg-slate-900/90 border border-white/20 rounded-lg flex items-center justify-center text-white relative shadow-md group-hover:scale-105 transition-transform">
        {icon || <GitBranch size={22} className="text-[#ffd700]" />}

        {/* Loading Spinner Overlay */}
        {isLoading && (
          <div className="absolute -top-1.5 -right-1.5 bg-indigo-500 text-white p-1 rounded-full shadow border border-white animate-spin">
            <Loader2 size={12} />
          </div>
        )}
      </div>

      {/* Label */}
      <span className="text-[10px] text-center text-slate-900 font-pixel font-bold leading-tight mt-1.5 drop-shadow-xs max-w-[90px] truncate">
        {label}
      </span>
    </div>
  );
};
