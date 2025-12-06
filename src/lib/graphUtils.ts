import type { Edge } from "@xyflow/react";
import type { WorkflowNode } from "@/types/nodes";

/**
 * Check if there's a path from startId to targetId using BFS
 * Used for cycle detection in workflow graphs
 */
export const hasPath = (
  nodes: WorkflowNode[],
  edges: Edge[],
  startId: string,
  targetId: string
): boolean => {
  const visited = new Set<string>();
  const queue = [startId];

  while (queue.length > 0) {
    const currentId = queue.shift()!;

    if (currentId === targetId) return true;
    if (visited.has(currentId)) continue;

    visited.add(currentId);

    const outgoingEdges = edges.filter((e) => e.source === currentId);
    outgoingEdges.forEach((edge) => queue.push(edge.target));
  }

  return false;
};

/**
 * Validate if a new connection would create a cycle
 * Returns true if connection is valid, false if it would create a cycle
 */
export const isValidConnection = (
  nodes: WorkflowNode[],
  edges: Edge[],
  source: string,
  target: string
): boolean => {
  // Prevent self-loops
  if (source === target) {
    return false;
  }

  // Prevent cycles: check if there's already a path from target to source
  // If yes, adding source -> target would create a cycle
  if (hasPath(nodes, edges, target, source)) {
    return false;
  }

  return true;
};
