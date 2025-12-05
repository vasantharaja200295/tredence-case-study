import { v4 as uuidv4 } from "uuid";
import { type Edge, type Node } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: uuidv4(),
    type: "start",
    data: { title: "Workflow 1", metadata: {} },
    position: { x: 0, y: 0 },
  },
];

export const initialEdges: Edge[] = [];
