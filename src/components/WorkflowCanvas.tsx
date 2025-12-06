import { useCallback, type DragEvent } from "react";
import { isValidConnection } from "@/lib/graphUtils";
import { toast } from "sonner";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
  type NodeMouseHandler,
  type Connection,
} from "@xyflow/react";
import { useTheme } from "./theme/provider";
import useStore from "@/store/workflowStore";
import { useShallow } from "zustand/react/shallow";

import "@xyflow/react/dist/style.css";
import type { AppState } from "@/types/state";
import type { WorkflowNode } from "@/types/nodes";
import { NODES } from "./nodes";
import { DEFAULT_EDGE_STYLES, HEADER_HEIGHT_OFFSET } from "@/constants";
import { createNode } from "@/lib/nodeUtils";

const WorkflowCanvas = () => {
  const { theme } = useTheme();
  const { screenToFlowPosition } = useReactFlow();
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setNodes,
    setSelectedNode,
  } = useStore(useShallow(mapStateToProps));

  // Custom connect handler to validate connections
  const handleConnect = useCallback(
    (connection: Connection) => {
      if (
        !isValidConnection(nodes, edges, connection.source, connection.target)
      ) {
        toast.error(
          "Invalid connection: self-loops and cycles are not allowed."
        );
        return;
      }
      onConnect(connection);
    },
    [nodes, edges, onConnect]
  );

  const onNodeClick = useCallback<NodeMouseHandler>(
    (_event, node) => {
      setSelectedNode(node as WorkflowNode);
    },
    [setSelectedNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || typeof type === "undefined") {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX - HEADER_HEIGHT_OFFSET,
        y: event.clientY - HEADER_HEIGHT_OFFSET,
      });

      const newNode = createNode(position, type);
      setNodes([...nodes, newNode]);
    },
    [nodes, setNodes, screenToFlowPosition]
  );

  return (
    <div className=" h-full w-full border rounded-md">
      <ReactFlow
        fitView
        nodes={nodes}
        nodeTypes={NODES}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        colorMode={theme}
        className="rounded-md"
        defaultEdgeOptions={DEFAULT_EDGE_STYLES}
      >
        <Background />
        <Controls />
        <MiniMap position={"bottom-right"} />
      </ReactFlow>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  setNodes: state.setNodes,
  setSelectedNode: state.setSelectedNode,
});

export default WorkflowCanvas;
