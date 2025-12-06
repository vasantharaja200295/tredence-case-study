import { useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { taskNodeSchema, type TaskNodeFormData } from "@/lib/validations";

const TaskNodeForm = () => {
  const { updateNode, selectedNode } = useStore(useShallow(mapStateToProps));

  const {
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<TaskNodeFormData>({
    resolver: zodResolver(taskNodeSchema),
    defaultValues: {
      title: "",
      description: "",
      assignee: { name: "", image: "" },
      dueDate: Date.now(),
    },
  });

  useEffect(() => {
    if (selectedNode && selectedNode.type === "task") {
      reset({
        title: selectedNode.data.title || "",
        description: selectedNode.data.description || "",
        assignee: selectedNode.data.assignee || { name: "", image: "" },
        dueDate: selectedNode.data.dueDate || Date.now(),
      });
    }
  }, [selectedNode, reset]);

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
            {...register("title", {
              onChange: (e) => handleChange("title", e.target.value),
            })}
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="text-xs text-red-500">{errors.title.message}</p>
          )}
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
            {...register("description", {
              onChange: (e) => handleChange("description", e.target.value),
            })}
            className={errors.description ? "border-red-500" : ""}
          />
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Maximum 500 characters. Provide clear instructions for the assignee
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="assignee">
            Assignee <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="assignee"
            control={control}
            render={({ field }) => (
              <AssigneeSelect
                value={field.value}
                onValueChange={handleAssigneeChange}
                placeholder="Select a team member"
              />
            )}
          />
          {errors.assignee && (
            <p className="text-xs text-red-500">{errors.assignee.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="dueDate">
            Due Date <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value}
                onChange={(timestamp) =>
                  handleChange("dueDate", timestamp || Date.now())
                }
                placeholder="Select due date"
                minDate={new Date()}
              />
            )}
          />
          {errors.dueDate && (
            <p className="text-xs text-red-500">{errors.dueDate.message}</p>
          )}
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
