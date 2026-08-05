import React, { useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";

export const DevBackdoor: React.FC = () => {
  const handleExit = async () => {
    try {
      await invoke("exit_app");
    } catch (err) {
      console.log("[DEV BACKDOOR] Outside Tauri environment, closing window:", err);
      window.close();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Dev Backdoor shortcut: Ctrl + Shift + Q
      if (e.ctrlKey && e.shiftKey && (e.key === "Q" || e.key === "q")) {
        e.preventDefault();
        console.log("[DEV BACKDOOR] Secret keyboard shortcut triggered: Ctrl+Shift+Q");
        handleExit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Invisible safety listener component
  return null;
};
