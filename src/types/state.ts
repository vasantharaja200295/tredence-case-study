import {
  type Edge,
  type Node,
  type OnEdgesChange,
  type OnNodesChange,
  type OnConnect,
} from "@xyflow/react";


export type AppState = {
    nodes: Node[],
    edges: Edge[],
    onNodesChange: OnNodesChange<Node>,
    onEdgesChange: OnEdgesChange,
    onConnect:OnConnect,
    setNodes:(nodes:Node[]) => void,
    setEdges:(edges:Edge[]) => void,
}