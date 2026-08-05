import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "gold" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "gold",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  let baseClass = "pixel-button uppercase cursor-pointer flex items-center justify-center gap-2";
  
  if (variant === "danger") {
    baseClass += " bg-[#660000] text-[#ff6666] border-[#ff3333] hover:bg-[#990000]";
  } else if (variant === "ghost") {
    baseClass += " bg-transparent border-transparent text-[#ffd700] hover:bg-[#3d003d]";
  }

  let sizeClass = "px-3 py-2 text-xs";
  if (size === "sm") sizeClass = "px-2 py-1 text-[10px]";
  if (size === "lg") sizeClass = "px-5 py-3 text-sm";

  return (
    <button className={`${baseClass} ${sizeClass} ${className}`} {...props}>
      {children}
    </button>
  );
};
