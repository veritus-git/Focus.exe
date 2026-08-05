import { create } from "zustand";

export interface SkillNodeState {
  id: string;
  status: "locked" | "active" | "completed";
  progress: number;
}

interface SkillTreeStore {
  nodes: Record<string, SkillNodeState>;
  selectedNodeId: string | null;
  selectNode: (id: string) => void;
  completeNode: (id: string) => void;
}

const INITIAL_NODES: Record<string, SkillNodeState> = {
  node_1: { id: "node_1", status: "active", progress: 0 },
  node_2: { id: "node_2", status: "locked", progress: 0 },
  node_3: { id: "node_3", status: "locked", progress: 0 },
};

const NODE_ORDER = ["node_1", "node_2", "node_3"];

export const useSkillTreeStore = create<SkillTreeStore>((set) => ({
  nodes: INITIAL_NODES,
  selectedNodeId: null,

  selectNode: (id) => set({ selectedNodeId: id }),

  completeNode: (id) =>
    set((state) => {
      const updatedNodes = { ...state.nodes };
      
      // Complete current node
      if (updatedNodes[id]) {
        updatedNodes[id] = {
          ...updatedNodes[id],
          status: "completed",
          progress: 100,
        };
      }

      // Automatically unlock the next node in sequence
      const currentIndex = NODE_ORDER.indexOf(id);
      if (currentIndex !== -1 && currentIndex + 1 < NODE_ORDER.length) {
        const nextNodeId = NODE_ORDER[currentIndex + 1];
        if (updatedNodes[nextNodeId] && updatedNodes[nextNodeId].status === "locked") {
          updatedNodes[nextNodeId] = {
            ...updatedNodes[nextNodeId],
            status: "active",
          };
        }
      }

      return {
        nodes: updatedNodes,
        selectedNodeId: id,
      };
    }),
}));
