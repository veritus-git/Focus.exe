import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n/i18n";
import "./index.css";

// Activate cursor confinement from frontend (backup to Rust-side grab)
async function activateKioskMode() {
  try {
    const { getCurrentWebviewWindow } = await import("@tauri-apps/api/webviewWindow");
    const appWindow = getCurrentWebviewWindow();
    await appWindow.setCursorGrab(true);
    console.log("[FOCUS OS] Cursor grab activated from frontend");
  } catch {
    console.log("[FOCUS OS] Running outside Tauri, skipping cursor grab");
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Activate kiosk mode after mount
activateKioskMode();
