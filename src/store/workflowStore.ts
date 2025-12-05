import { create } from "zustand";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "@xyflow/react";
import { initialEdges, initialNodes } from "@/constants/mockData";
import type { AppState } from "@/types/state";
import { toast } from "sonner";

const useStore = create<AppState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  selectedNode: null,
  onNodesChange: (changes) => {
    const filteredChanges = changes.filter((change) => {
      if (change.type === "remove" && change.id === "start-node") {
        toast.warning("Cannot delete start node");
        return false;
      }
      return true;
    });
    set({
      nodes: applyNodeChanges(filteredChanges, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },

  setSelectedNode: (node) => {
    set({ selectedNode: node });
  },

  updateNode: (nodeId, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  deleteNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== nodeId),
      edges: get().edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      ),
      selectedNode:
        get().selectedNode?.id === nodeId ? null : get().selectedNode,
    });
  },

  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
}));

export default useStore;
