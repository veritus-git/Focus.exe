/// <reference types="vite/client" />

interface Window {
  electronAPI?: {
    exitApp: () => void;
  };
}
