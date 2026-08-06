import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n/i18n";
import "./index.css";

// Activate cursor confinement from frontend (backup to Rust-side grab)
async function activateKioskMode() {
  // Electron handles kiosk mode and window constraints natively via main.js
  console.log("[FOCUS OS] Kiosk mode is managed by Electron main process");
}

// ═══════════════════════════════════════════════════════════
// NO React.StrictMode — it DOUBLES every render in dev mode
// which destroys drag performance (60fps → 30fps).
// This is a kiosk app, not a library — we don't need double-checking.
// ═══════════════════════════════════════════════════════════
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);

// Activate kiosk mode after mount
activateKioskMode();
