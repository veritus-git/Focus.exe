import { create } from "zustand";
import { ALL_LESSONS } from "../content/courseIndex";

// ═══════════════════════════════════════════════════════════════════
// Skill Tree Store — Dependency-Based Unlocking with Persistence
// ═══════════════════════════════════════════════════════════════════

const STORAGE_KEY = "focusos-skilltree-progress";

export interface SkillNodeState {
  id: string;
  status: "locked" | "active" | "completed" | "unlocking";
  progress: number;
}

interface SkillTreeStore {
  nodes: Record<string, SkillNodeState>;
  selectedNodeId: string | null;
  justCompletedNodeId: string | null;
  newlyUnlockedIds: string[];
  selectNode: (id: string) => void;
  completeNode: (id: string) => void;
  finalizeUnlocks: () => void;
  clearJustCompleted: () => void;
  resetProgress: () => void;
}

/**
 * Build initial node states from the course index.
 * Level 0 ("what-is-information") starts as "active".
 * Everything else starts "locked".
 */
function buildInitialNodes(): Record<string, SkillNodeState> {
  const nodes: Record<string, SkillNodeState> = {};
  for (const lesson of ALL_LESSONS) {
    nodes[lesson.id] = {
      id: lesson.id,
      status: lesson.requires.length === 0 ? "active" : "locked",
      progress: 0,
    };
  }
  return nodes;
}

/**
 * Load progress from localStorage, merging with current lesson definitions.
 * This handles new lessons being added — they'll appear as locked.
 */
function loadPersistedNodes(): Record<string, SkillNodeState> {
  const fresh = buildInitialNodes();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fresh;

    const saved: Record<string, SkillNodeState> = JSON.parse(raw);

    // Merge: keep saved progress for known lessons, add new ones as fresh
    for (const id of Object.keys(fresh)) {
      if (saved[id]) {
        fresh[id] = saved[id];
      }
    }

    return fresh;
  } catch {
    return fresh;
  }
}

/**
 * Save node states to localStorage.
 */
function persistNodes(nodes: Record<string, SkillNodeState>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nodes));
  } catch {
    // silently fail if storage is full
  }
}

/**
 * After completing a node, recalculate which nodes should be unlocked.
 * A node becomes "active" when ALL its prerequisites are "completed".
 */
function recalculateUnlocks(nodes: Record<string, SkillNodeState>): { updated: Record<string, SkillNodeState>, newlyUnlockedIds: string[] } {
  const updated = { ...nodes };
  const newlyUnlockedIds: string[] = [];

  for (const lesson of ALL_LESSONS) {
    const node = updated[lesson.id];
    if (!node || node.status !== "locked") continue;

    // Check if ALL prerequisites are completed
    const allPrereqsMet = lesson.requires.every(
      (reqId) => updated[reqId]?.status === "completed"
    );

    if (allPrereqsMet) {
      updated[lesson.id] = { ...node, status: "unlocking" };
      newlyUnlockedIds.push(lesson.id);
    }
  }

  return { updated, newlyUnlockedIds };
}

export const useSkillTreeStore = create<SkillTreeStore>((set) => ({
  nodes: loadPersistedNodes(),
  selectedNodeId: null,
  justCompletedNodeId: null,
  newlyUnlockedIds: [],

  selectNode: (id) =>
    set((state) => ({
      selectedNodeId: state.selectedNodeId === id ? null : id,
    })),

  clearJustCompleted: () => set({ justCompletedNodeId: null, newlyUnlockedIds: [] }),

  completeNode: (id) =>
    set((state) => {
      let updatedNodes = { ...state.nodes };

      if (updatedNodes[id]) {
        updatedNodes[id] = {
          ...updatedNodes[id],
          status: "completed",
          progress: 100,
        };
      }

      const { updated, newlyUnlockedIds } = recalculateUnlocks(updatedNodes);
      persistNodes(updated);

      return {
        nodes: updated,
        selectedNodeId: null, // close panel on completion
        justCompletedNodeId: id,
        newlyUnlockedIds,
      };
    }),

  finalizeUnlocks: () =>
    set((state) => {
      let updatedNodes = { ...state.nodes };
      let changed = false;
      for (const id of Object.keys(updatedNodes)) {
        if (updatedNodes[id].status === "unlocking") {
          updatedNodes[id] = { ...updatedNodes[id], status: "active" };
          changed = true;
        }
      }
      if (changed) persistNodes(updatedNodes);
      return { nodes: updatedNodes };
    }),

  resetProgress: () =>
    set(() => {
      const freshNodes = buildInitialNodes();
      persistNodes(freshNodes);
      return { nodes: freshNodes, selectedNodeId: null, justCompletedNodeId: null, newlyUnlockedIds: [] };
    }),
}));
