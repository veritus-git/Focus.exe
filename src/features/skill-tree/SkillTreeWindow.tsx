import React, { useMemo } from "react";
import { ReactFlow, Background, Controls, Edge, Node } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTranslation } from "react-i18next";
import { GitBranch, Play } from "lucide-react";
import { Window } from "../../components/ui/Window";
import { CustomSkillNode } from "./CustomSkillNode";
import { Button } from "../../components/ui/Button";
import { useSkillTreeStore } from "../../store/useSkillTreeStore";

export const SkillTreeWindow: React.FC = () => {
  const { t } = useTranslation();
  const { selectedNodeId, nodes, completeNode } = useSkillTreeStore();

  const nodeTypes = useMemo(() => ({ customSkill: CustomSkillNode }), []);

  const initialNodes: Node[] = [
    {
      id: "node_1",
      type: "customSkill",
      position: { x: 500, y: 50 },
      data: {
        nodeId: "node_1",
        titleKey: "skillTree.node1Title",
        levelNumber: 1,
      },
    },
    {
      id: "node_2",
      type: "customSkill",
      position: { x: 500, y: 240 },
      data: {
        nodeId: "node_2",
        titleKey: "skillTree.node2Title",
        levelNumber: 2,
      },
    },
    {
      id: "node_3",
      type: "customSkill",
      position: { x: 500, y: 430 },
      data: {
        nodeId: "node_3",
        titleKey: "skillTree.node3Title",
        levelNumber: 3,
      },
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: "e1-2",
      source: "node_1",
      target: "node_2",
      type: "smoothstep",
      animated: true,
      style: { stroke: "#ffd700", strokeWidth: 3 },
    },
    {
      id: "e2-3",
      source: "node_2",
      target: "node_3",
      type: "smoothstep",
      animated: false,
      style: { stroke: "#475569", strokeWidth: 2 },
    },
  ];

  const selectedNode = selectedNodeId ? nodes[selectedNodeId] : null;

  return (
    <Window
      id="skillTree"
      title={t("skillTree.windowTitle")}
      icon={<GitBranch size={16} />}
      isFullScreen={true}
    >
      <div className="flex flex-col h-full gap-3">
        {/* Top Action Header */}
        <div className="flex items-center justify-between bg-slate-900 border border-white/10 px-4 py-2.5 rounded-lg shadow-sm">
          <div className="text-white text-xs font-pixel tracking-wide flex items-center gap-2">
            <span>{t("skillTree.header")}</span>
          </div>
          {selectedNodeId && (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => completeNode(selectedNodeId)}
                disabled={selectedNode?.status === "completed"}
              >
                <Play size={12} />
                <span>{t("skillTree.startLesson")}</span>
              </Button>
            </div>
          )}
        </div>

        {/* React Flow Canvas - Crisp 1:1 scale pixel rendering */}
        <div className="flex-1 border border-white/10 bg-slate-950 relative rounded-lg overflow-hidden">
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            nodeTypes={nodeTypes}
            minZoom={1}
            maxZoom={1}
            zoomOnScroll={false}
            preventScrolling={true}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#334155" gap={32} size={1} />
            <Controls className="!bg-slate-900 !border !border-white/20 !fill-white" />
          </ReactFlow>
        </div>
      </div>
    </Window>
  );
};
