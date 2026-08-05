import { create } from "zustand";
import i18n from "../i18n/i18n";

export type WindowId = "skillTree" | "calculator" | "notes";

export interface WindowPosition {
  x: number;
  y: number;
}

interface OSState {
  openWindows: WindowId[];
  activeWindow: WindowId | null;
  minimizedWindows: WindowId[];
  windowPositions: Record<WindowId, WindowPosition>;
  language: "pl" | "en";
  introFinished: boolean;
  
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  toggleMinimizeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  updateWindowPosition: (id: WindowId, pos: WindowPosition) => void;
  setLanguage: (lang: "pl" | "en") => void;
  finishIntro: () => void;
}

const DEFAULT_POSITIONS: Record<WindowId, WindowPosition> = {
  skillTree: { x: 50, y: 50 },
  calculator: { x: 120, y: 100 },
  notes: { x: 200, y: 150 },
};

export const useOSStore = create<OSState>((set) => ({
  openWindows: [],
  activeWindow: null,
  minimizedWindows: [],
  windowPositions: DEFAULT_POSITIONS,
  language: "pl",
  introFinished: false,

  openWindow: (id) =>
    set((state) => {
      const isOpen = state.openWindows.includes(id);
      const isMinimized = state.minimizedWindows.includes(id);

      return {
        openWindows: isOpen ? state.openWindows : [...state.openWindows, id],
        minimizedWindows: isMinimized
          ? state.minimizedWindows.filter((win) => win !== id)
          : state.minimizedWindows,
        activeWindow: id,
      };
    }),

  closeWindow: (id) =>
    set((state) => {
      const nextOpen = state.openWindows.filter((w) => w !== id);
      const nextMinimized = state.minimizedWindows.filter((w) => w !== id);
      const nextActive =
        state.activeWindow === id
          ? nextOpen[nextOpen.length - 1] || null
          : state.activeWindow;

      return {
        openWindows: nextOpen,
        minimizedWindows: nextMinimized,
        activeWindow: nextActive,
      };
    }),

  toggleMinimizeWindow: (id) =>
    set((state) => {
      const isMinimized = state.minimizedWindows.includes(id);
      if (isMinimized) {
        return {
          minimizedWindows: state.minimizedWindows.filter((w) => w !== id),
          activeWindow: id,
        };
      } else {
        return {
          minimizedWindows: [...state.minimizedWindows, id],
          activeWindow: state.activeWindow === id ? null : state.activeWindow,
        };
      }
    }),

  focusWindow: (id) =>
    set((state) => ({
      activeWindow: id,
      minimizedWindows: state.minimizedWindows.filter((w) => w !== id),
    })),

  updateWindowPosition: (id, pos) =>
    set((state) => ({
      windowPositions: {
        ...state.windowPositions,
        [id]: pos,
      },
    })),

  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    set({ language: lang });
  },

  finishIntro: () => set({ introFinished: true }),
}));
