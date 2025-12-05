import {
  type Edge,
  type OnEdgesChange,
  type OnNodesChange,
  type OnConnect,
} from "@xyflow/react";
import type { WorkflowNode } from "./nodes";

export type AppState = {
  nodes: WorkflowNode[];
  edges: Edge[];
  selectedNode: WorkflowNode | null;
  onNodesChange: OnNodesChange<WorkflowNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setSelectedNode: (node: WorkflowNode | null) => void;
  updateNode: <T extends WorkflowNode>(
    nodeId: string,
    data: Partial<T["data"]>
  ) => void;
  deleteNode: (nodeId: string) => void;
  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: Edge[]) => void;
};
