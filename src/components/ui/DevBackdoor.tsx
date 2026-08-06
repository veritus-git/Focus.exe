import React, { useEffect } from "react";


/**
 * KioskGuard — Invisible system-level keyboard lockdown.
 * 
 * Blocks ALL dangerous keyboard shortcuts that could let a user escape:
 * - Alt+Tab, Alt+F2, Ctrl+Alt+T, Win/Super key, etc.
 * - Browser shortcuts: F5, Ctrl+R, Ctrl+L, Ctrl+W, etc.
 * - Context menu (right-click)
 * 
 * ONLY allows:
 * - Ctrl+Shift+Q → dev backdoor (process kill)
 * - Alt+F4 → dev backdoor (process kill)
 * - Normal typing keys for use inside the app
 */
export const DevBackdoor: React.FC = () => {
  const handleExit = async () => {
    try {
      if (window.electronAPI) {
        window.electronAPI.exitApp();
      } else {
        window.close();
      }
    } catch (err) {
      console.log("[DEV BACKDOOR] Failed to close window:", err);
      window.close();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ═══════════════════════════════════════════════════════
      // DEV BACKDOOR 1: Ctrl + Shift + Q → kill process
      // ═══════════════════════════════════════════════════════
      if (e.ctrlKey && e.shiftKey && (e.key === "Q" || e.key === "q")) {
        e.preventDefault();
        e.stopPropagation();
        console.log("[DEV BACKDOOR] Ctrl+Shift+Q triggered");
        handleExit();
        return;
      }

      // ═══════════════════════════════════════════════════════
      // DEV BACKDOOR 2: Alt + F4 → kill process
      // ═══════════════════════════════════════════════════════
      if (e.altKey && e.key === "F4") {
        e.preventDefault();
        e.stopPropagation();
        console.log("[DEV BACKDOOR] Alt+F4 triggered");
        handleExit();
        return;
      }

      // ═══════════════════════════════════════════════════════
      // BLOCK: All function keys (F1-F12)
      // ═══════════════════════════════════════════════════════
      if (e.key.startsWith("F") && !isNaN(Number(e.key.slice(1)))) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // ═══════════════════════════════════════════════════════
      // BLOCK: Alt+anything (Alt+Tab gets caught at OS level,
      // but we block Alt+F2, Alt+Space, etc.)
      // ═══════════════════════════════════════════════════════
      if (e.altKey && !e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // ═══════════════════════════════════════════════════════
      // BLOCK: Ctrl+dangerous keys
      // ═══════════════════════════════════════════════════════
      if (e.ctrlKey && !e.shiftKey) {
        const blockedKeys = [
          "r", "w", "t", "n", "l", "u", "p", "h", "j", "k", "d",
          "Tab", "Escape"
        ];
        if (blockedKeys.includes(e.key) || blockedKeys.includes(e.key.toLowerCase())) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }

      // ═══════════════════════════════════════════════════════
      // BLOCK: Win/Meta/Super key
      // ═══════════════════════════════════════════════════════
      if (e.key === "Meta" || e.key === "OS") {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // ═══════════════════════════════════════════════════════
      // BLOCK: Escape key (prevents exiting fullscreen)
      // ═══════════════════════════════════════════════════════
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // ═══════════════════════════════════════════════════════
      // BLOCK: Ctrl+Alt combinations (terminal, etc.)
      // ═══════════════════════════════════════════════════════
      if (e.ctrlKey && e.altKey) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    };

    // Block context menu (right-click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Use capture phase to intercept BEFORE anything else
    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("contextmenu", handleContextMenu, true);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("contextmenu", handleContextMenu, true);
    };
  }, []);

  // Invisible safety listener component
  return null;
};
