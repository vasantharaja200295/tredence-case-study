import { useCallback } from "react";
import useStore from "@/store/workflowStore";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { AppState } from "@/types/state";
import type { AutomationNodeData, ActionParameter } from "@/types/nodes";
import { useShallow } from "zustand/react/shallow";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";

const AutomatedNodeForm = () => {
  const { updateNode, selectedNode } = useStore(useShallow(mapStateToProps));

  const handleChange = useCallback(
    <K extends keyof AutomationNodeData>(field: K, value: AutomationNodeData[K]) => {
      if (selectedNode && selectedNode.type === "automation") {
        updateNode(selectedNode.id, { [field]: value });
      }
    },
    [selectedNode, updateNode]
  );

  const handleActionNameChange = useCallback(
    (value: string) => {
      if (selectedNode && selectedNode.type === "automation") {
        const currentAction = selectedNode.data.action || { name: "", params: [] };
        updateNode(selectedNode.id, {
          action: {
            ...currentAction,
            name: value,
          },
        });
      }
    },
    [selectedNode, updateNode]
  );

  const handleParamChange = useCallback(
    (index: number, field: keyof ActionParameter, value: string) => {
      if (selectedNode && selectedNode.type === "automation") {
        const currentAction = selectedNode.data.action || { name: "", params: [] };
        const updatedParams = [...currentAction.params];
        updatedParams[index] = {
          ...updatedParams[index],
          [field]: value,
        };
        updateNode(selectedNode.id, {
          action: {
            ...currentAction,
            params: updatedParams,
          },
        });
      }
    },
    [selectedNode, updateNode]
  );

  const handleAddParam = useCallback(() => {
    if (selectedNode && selectedNode.type === "automation") {
      const currentAction = selectedNode.data.action || { name: "", params: [] };
      updateNode(selectedNode.id, {
        action: {
          ...currentAction,
          params: [...currentAction.params, { name: "", value: "" }],
        },
      });
    }
  }, [selectedNode, updateNode]);

  const handleRemoveParam = useCallback(
    (index: number) => {
      if (selectedNode && selectedNode.type === "automation") {
        const currentAction = selectedNode.data.action || { name: "", params: [] };
        const updatedParams = currentAction.params.filter((_, i) => i !== index);
        updateNode(selectedNode.id, {
          action: {
            ...currentAction,
            params: updatedParams,
          },
        });
      }
    },
    [selectedNode, updateNode]
  );

  if (!selectedNode || selectedNode.type !== "automation") return null;

  const data = selectedNode.data;
  const params = data.action?.params || [];

  return (
    <div className="space-y-6">
      {/* Description Card */}
      <Card className="bg-green-50 py-3 dark:bg-green-950/20 border-green-200 dark:border-green-800">
        <CardContent className="px-3">
          <div className="flex items-start gap-3">
            <div>
              <h4 className="font-semibold text-sm text-green-900 dark:text-green-100">
                Automation Node
              </h4>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                Execute automated actions like sending emails, updating
                databases, or triggering webhooks. Configure action parameters
                for dynamic execution.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">
            Automation Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g., Send welcome email"
            value={data.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        {/* Action Name */}
        <div className="space-y-2">
          <Label htmlFor="actionName">
            Action Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="actionName"
            placeholder="e.g., sendEmail, updateDatabase, triggerWebhook"
            value={data.action?.name || ""}
            onChange={(e) => handleActionNameChange(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Specify the automation action to execute
          </p>
        </div>

        {/* Action Parameters */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Action Parameters</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddParam}
              className="h-8"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Parameter
            </Button>
          </div>

          {params.length === 0 ? (
            <div className="text-sm text-muted-foreground border rounded-lg p-4 text-center">
              No parameters configured. Click "Add Parameter" to add action
              parameters.
            </div>
          ) : (
            <div className="space-y-3">
              {params.map((param, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 space-y-3 bg-muted/30"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Parameter {index + 1}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveParam(index)}
                      className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor={`param-name-${index}`} className="text-xs">
                        Parameter Name
                      </Label>
                      <Input
                        id={`param-name-${index}`}
                        placeholder="e.g., recipient, subject"
                        value={param.name}
                        onChange={(e) =>
                          handleParamChange(index, "name", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`param-value-${index}`} className="text-xs">
                        Parameter Value
                      </Label>
                      <Input
                        id={`param-value-${index}`}
                        placeholder="e.g., user@example.com"
                        value={param.value}
                        onChange={(e) =>
                          handleParamChange(index, "value", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  updateNode: state.updateNode,
  selectedNode: state.selectedNode,
});

export default AutomatedNodeForm;
