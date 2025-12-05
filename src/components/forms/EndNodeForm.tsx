import { useCallback } from "react";
import useStore from "@/store/workflowStore";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import type { AppState } from "@/types/state";
import type { EndNodeData } from "@/types/nodes";
import { useShallow } from "zustand/react/shallow";
import { Card, CardContent } from "../ui/card";
import { Checkbox } from "../ui/checkbox";

const EndNodeForm = () => {
  const { updateNode, selectedNode } = useStore(useShallow(mapStateToProps));

  const handleChange = useCallback(
    <K extends keyof EndNodeData>(field: K, value: EndNodeData[K]) => {
      if (selectedNode && selectedNode.type === "end") {
        updateNode(selectedNode.id, { [field]: value });
      }
    },
    [selectedNode, updateNode]
  );

  const handleSummaryToggle = useCallback(
    (checked: boolean) => {
      if (selectedNode && selectedNode.type === "end") {
        updateNode(selectedNode.id, { summary: checked });
      }
    },
    [selectedNode, updateNode]
  );

  if (!selectedNode || selectedNode.type !== "end") return null;

  const data = selectedNode.data;

  return (
    <div className="space-y-6">
      {/* Description Card */}
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

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Completion Message */}
        <div className="space-y-2">
          <Label htmlFor="message">
            Completion Message <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            placeholder="e.g., Workflow completed successfully! All tasks have been executed."
            rows={4}
            value={data.message || ""}
            onChange={(e) => handleChange("message", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Message displayed when the workflow reaches completion
          </p>
        </div>

        {/* Generate Summary */}
        <div className="space-y-3 border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="summary"
              checked={data.summary || false}
              onCheckedChange={handleSummaryToggle}
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

        {/* Info Card */}
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
