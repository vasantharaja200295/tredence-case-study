import { useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/store/workflowStore";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import type { AppState } from "@/types/state";
import type { EndNodeData } from "@/types/nodes";
import { useShallow } from "zustand/react/shallow";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { endNodeSchema, type EndNodeFormData } from "@/lib/validations";

const EndNodeForm = () => {
  const { updateNode, selectedNode } = useStore(useShallow(mapStateToProps));

  const {
    register,
    control,
    formState: { errors },
    reset,
  } = useForm<EndNodeFormData>({
    resolver: zodResolver(endNodeSchema),
    defaultValues: {
      message: "",
      summary: false,
    },
  });

  useEffect(() => {
    if (selectedNode && selectedNode.type === "end") {
      reset({
        message: selectedNode.data.message || "",
        summary: selectedNode.data.summary || false,
      });
    }
  }, [selectedNode, reset]);

  const handleChange = useCallback(
    <K extends keyof EndNodeData>(field: K, value: EndNodeData[K]) => {
      if (selectedNode && selectedNode.type === "end") {
        updateNode(selectedNode.id, { [field]: value });
      }
    },
    [selectedNode, updateNode]
  );

  if (!selectedNode || selectedNode.type !== "end") return null;

  return (
    <div className="space-y-6">
      <Card className="bg-slate-50 py-3 dark:bg-slate-950/20 border-slate-200 dark:border-slate-800">
        <CardContent className="px-3">
          <div className="flex items-start gap-3">
            <div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-slate-100">
                End Node
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                Mark the completion of the workflow. Configure final messages
                and summary generation for completed workflows.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="message">
            Completion Message <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            placeholder="e.g., Workflow completed successfully! All tasks have been executed."
            rows={4}
            {...register("message", {
              onChange: (e) => handleChange("message", e.target.value),
            })}
            className={errors.message ? "border-red-500" : ""}
          />
          {errors.message && (
            <p className="text-xs text-red-500">{errors.message.message}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Message displayed when the workflow reaches completion (max 200
            characters)
          </p>
        </div>

        <div className="space-y-3 border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Controller
              name="summary"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="summary"
                  checked={field.value}
                  onCheckedChange={(checked) => {
                    field.onChange(checked);
                    handleChange("summary", checked as boolean);
                  }}
                />
              )}
            />
            <div className="flex-1">
              <Label htmlFor="summary" className="cursor-pointer">
                Generate Workflow Summary
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Automatically generate a detailed summary of all completed
                tasks and actions when the workflow ends
              </p>
            </div>
          </div>
        </div>

        <Card className="bg-blue-50/50 dark:bg-blue-950/10 border-blue-200 dark:border-blue-800">
          <CardContent className="px-3 py-3">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> This is the final step in your workflow.
              Once execution reaches this node, the workflow will be marked as
              complete and no further actions will be executed.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  updateNode: state.updateNode,
  selectedNode: state.selectedNode,
});

export default EndNodeForm;
