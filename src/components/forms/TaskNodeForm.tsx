import { useCallback } from "react";
import useStore from "@/store/workflowStore";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { MOCK_USERS } from "@/constants/mockData";
import type { AppState } from "@/types/state";
import type { TaskNodeData } from "@/types/nodes";
import { useShallow } from "zustand/react/shallow";
import { Card, CardContent } from "../ui/card";
import AssigneeSelect from "@/components/AssigneeSelect";
import DatePicker from "../DatePicker";

const TaskNodeForm = () => {
  const { updateNode, selectedNode } = useStore(useShallow(mapStateToProps));

  const handleChange = useCallback(
    <K extends keyof TaskNodeData>(field: K, value: TaskNodeData[K]) => {
      if (selectedNode && selectedNode.type === "task") {
        updateNode(selectedNode.id, { [field]: value });
      }
    },
    [selectedNode, updateNode]
  );

  const handleAssigneeChange = useCallback(
    (userId: string) => {
      const user = MOCK_USERS.find((u) => u.id === userId);
      if (user) {
        handleChange("assignee", { image: user.image, name: user.name });
      }
    },
    [handleChange]
  );

  if (!selectedNode || selectedNode.type !== "task") return null;

  return (
    <div className="space-y-6">
      {/* Description Card */}
      <Card className="bg-blue-50 py-3 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="px-3">
          <div className="flex items-start gap-3">
            <div>
              <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100">
                Task Node
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Assign manual tasks to team members with deadlines. Track
                completion and manage workload distribution.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            Task Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g., Collect employee documents"
            value={selectedNode.data.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Maximum 100 characters
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Describe the task in detail..."
            rows={4}
            value={selectedNode.data.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Maximum 500 characters. Provide clear instructions for the assignee
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignee">
            Assignee <span className="text-red-500">*</span>
          </Label>
          <AssigneeSelect
            value={selectedNode.data.assignee}
            onValueChange={handleAssigneeChange}
            placeholder="Select a team member"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">
            Due Date <span className="text-red-500">*</span>
          </Label>
          <DatePicker
            value={selectedNode.data.dueDate}
            onChange={(timestamp) =>
              handleChange("dueDate", timestamp || Date.now())
            }
            placeholder="Select due date"
            minDate={new Date()}
          />
          <p className="text-xs text-muted-foreground">
            Due date must be in the future
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  updateNode: state.updateNode,
  selectedNode: state.selectedNode,
});

export default TaskNodeForm;
