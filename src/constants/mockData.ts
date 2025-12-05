import { Position, type Edge, type Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: { label: "Node 1" },
    type: "input",
    sourcePosition: Position.Right,
  },
  {
    id: "n2",
    position: { x: 200, y: -100 },
    data: { label: "Node 2" },
    targetPosition: Position.Left,
  },
];

export const initialEdges: Edge[] = [];
