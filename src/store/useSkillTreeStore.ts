import { create } from "zustand";

export interface SkillNodeData {
  id: string;
  status: "locked" | "active" | "completed";
  progress: number;
}

interface SkillTreeState {
  nodes: Record<string, SkillNodeData>;
  selectedNodeId: string | null;
  selectNode: (id: string | null) => void;
  completeNode: (id: string) => void;
}

export const useSkillTreeStore = create<SkillTreeState>((set) => ({
  nodes: {
    node_1: { id: "node_1", status: "completed", progress: 100 },
    node_2: { id: "node_2", status: "active", progress: 45 },
    node_3: { id: "node_3", status: "locked", progress: 0 },
  },
  selectedNodeId: "node_2",

  selectNode: (id) => set({ selectedNodeId: id }),

  completeNode: (id) =>
    set((state) => ({
      nodes: {
        ...state.nodes,
        [id]: { ...state.nodes[id], status: "completed", progress: 100 },
      },
    })),
}));
