import { useCallback, useRef, type DragEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
} from "@xyflow/react";
import { useTheme } from "./theme/provider";
import useStore from "@/store/workflowStore";
import { useShallow } from "zustand/react/shallow";

import "@xyflow/react/dist/style.css";
import type { AppState } from "@/types/state";
import { NODES } from "./nodes";
import { DEFAULT_EDGE_STYLES } from "@/constants";

const WorkflowCanvas = () => {
  const { theme } = useTheme();
  const { screenToFlowPosition } = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, setNodes } =
    useStore(useShallow(mapStateToProps));

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || typeof type === undefined) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX - 60,
        y: event.clientY - 60,
      });

      const newNode = {
        id: uuidv4(),
        type,
        position,
        data: {},
      };
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
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
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
});

export default WorkflowCanvas;
