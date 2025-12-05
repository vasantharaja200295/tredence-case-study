import { useCallback, useState } from "react";
import useStore from "@/store/workflowStore";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { AppState } from "@/types/state";
import { useShallow } from "zustand/react/shallow";

const StartNodeForm = () => {
  const { updateNode, selectedNode } = useStore(useShallow(mapStateToProps));
  const [title, setTitle] = useState(selectedNode?.data.title);

  const handleChange = useCallback(
    (field: string, value: any) => {
      setTitle(value);
      if (selectedNode) {
        updateNode(selectedNode.id, { [field]: value });
      }
    },
    [title]
  );

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Workflow Title</Label>
        <Input
          id="title"
          placeholder="Enter workflow title"
          value={title as string}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        This is the starting point of your workflow.
      </p>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  updateNode: state.updateNode,
  selectedNode: state.selectedNode,
});

export default StartNodeForm;
