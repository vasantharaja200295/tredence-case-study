import type { AppState } from "@/types/state";
import useStore from "@/store/workflowStore";
import { useShallow } from "zustand/react/shallow";
import StartNodeForm from "./forms/StartNodeForm";
import { NODE_TYPES } from "@/constants";
import TaskNodeForm from "./forms/TaskNodeForm";
import ApprovalNodeForm from "./forms/ApprovalNodeForm";
import AutomatedNodeForm from "./forms/AutomatedNodeForm";
import EndNodeForm from "./forms/EndNodeForm";
import EmptyForm from "./forms/EmptyForm";
import { SidebarContent, SidebarFooter, SidebarHeader } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { toast } from "sonner";

const ConfigPanel = () => {
  const { selectedNode, deleteNode } = useStore(useShallow(mapStateToProps));

  const handleDeleteNode = () => {
    if (selectedNode && selectedNode.type !== NODE_TYPES.START) {
      deleteNode(selectedNode.id);
      toast.success("Node Successfully Deleted");
    } else {
      toast.warning("Cannot delete Start Node");
    }
  };

  const renderForms = () => {
    if (selectedNode) {
      switch (selectedNode.type) {
        case NODE_TYPES.START:
          return <StartNodeForm />;
        case NODE_TYPES.TASK:
          return <TaskNodeForm />;
        case NODE_TYPES.APPROVAL:
          return <ApprovalNodeForm />;
        case NODE_TYPES.AUTOMATION:
          return <AutomatedNodeForm />;
        case NODE_TYPES.END:
          return <EndNodeForm />;
        default:
          return <EmptyForm />;
      }
    } else {
      return <EmptyForm />;
    }
  };

  return (
    <div>
      <SidebarHeader className=" flex-row h-15.5 items-center">
        <p className="font-semibold ">Configure Nodes</p>
      </SidebarHeader>
      <Separator />
      <SidebarContent className="p-2 h-[87vh]">{renderForms()}</SidebarContent>
      {selectedNode && (
        <SidebarFooter>
          <Button onClick={handleDeleteNode}>Delete Node</Button>
        </SidebarFooter>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedNode: state.selectedNode,
  deleteNode: state.deleteNode,
  setSelectedNode: state.setSelectedNode,
});

export default ConfigPanel;
