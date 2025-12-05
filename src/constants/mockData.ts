import { v4 as uuidv4 } from "uuid";
import { type Edge, type Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  { id: uuidv4(), type: "start", data: {}, position: { x: 0, y: 0 } },
  { id: uuidv4(), type: "task", data: {}, position: { x: 400, y: 0 } },
  { id: uuidv4(), type: "approval", data: {}, position: { x: 800, y: 0 } },
  { id: uuidv4(), type: "automation", data: {}, position: { x: 1250, y: 100 } },
  {
    id: uuidv4(),
    type: "automation",
    data: {},
    position: { x: 1250, y: -200 },
  },
  { id: uuidv4(), type: "end", data: {}, position: { x: 1600, y: -200 } },
  { id: uuidv4(), type: "end", data: {}, position: { x: 1600, y: 100 } },
];

export const initialEdges: Edge[] = [];
