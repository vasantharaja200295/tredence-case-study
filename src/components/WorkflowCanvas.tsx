import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import { useTheme } from "./theme/provider";
import useStore from "@/store/workflowStore";
import { useShallow } from "zustand/react/shallow";

import "@xyflow/react/dist/style.css";
import type { AppState } from "@/types/state";

const WorkflowCanvas = () => {
  const { theme } = useTheme();
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(mapStateToProps)
  );

  return (
    <div className=" h-full w-full border rounded-md">
      <ReactFlow
        fitView
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode={theme}
        className="rounded-md"
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
});

export default WorkflowCanvas;
