import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/store/workflowStore";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { AppState } from "@/types/state";
import type { AutomationNodeData } from "@/types/nodes";
import { useShallow } from "zustand/react/shallow";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAutomationsQuery } from "@/api/mocks";
import {
  automationNodeSchema,
  type AutomationNodeFormData,
} from "@/lib/validations";

const AutomatedNodeForm = () => {
  const { updateNode, selectedNode } = useStore(useShallow(mapStateToProps));

  const { data: automationActions } = useAutomationsQuery();

  const {
    register,
    formState: { errors },
    reset,
    watch,
  } = useForm<AutomationNodeFormData>({
    resolver: zodResolver(automationNodeSchema),
    defaultValues: {
      title: "",
      action: { name: "", params: [] },
    },
  });

  const currentAction = watch("action");

  useEffect(() => {
    if (selectedNode && selectedNode.type === "automation") {
      reset({
        title: selectedNode.data.title || "",
        action: selectedNode.data.action || { name: "", params: [] },
      });
    }
  }, [selectedNode, reset]);

  const handleChange = useCallback(
    <K extends keyof AutomationNodeData>(
      field: K,
      value: AutomationNodeData[K]
    ) => {
      if (selectedNode && selectedNode.type === "automation") {
        updateNode(selectedNode.id, { [field]: value });
      }
    },
    [selectedNode, updateNode]
  );

  const handleActionSelect = useCallback(
    (actionId: string) => {
      const selectedAction = automationActions?.find(
        (action) => action.id === actionId
      );

      if (selectedAction) {
        const params = selectedAction.params.map((param) => ({
          name: param.name,
          value: "",
        }));

        handleChange("action", {
          name: selectedAction.name,
          params: params,
        });
      }
    },
    [handleChange]
  );

  const handleParamValueChange = useCallback(
    (index: number, value: string) => {
      const updatedParams = [...currentAction.params];
      updatedParams[index] = {
        ...updatedParams[index],
        value: value,
      };
      handleChange("action", {
        ...currentAction,
        params: updatedParams,
      });
    },
    [currentAction, handleChange]
  );

  if (!selectedNode || selectedNode.type !== "automation") return null;

  const data = selectedNode.data;
  const params = currentAction?.params || [];

  return (
    <div className="space-y-6">
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

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            Automation Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g., Send welcome email"
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
          <Label htmlFor="actionSelect">
            Select Action <span className="text-red-500">*</span>
          </Label>
          <Select
            value={
              automationActions?.find(
                (action) => action.name === currentAction?.name
              )?.id || ""
            }
            onValueChange={handleActionSelect}
          >
            <SelectTrigger id="actionSelect" className="h-[45px] w-full">
              <SelectValue placeholder="Choose an automation action" />
            </SelectTrigger>
            <SelectContent>
              {automationActions?.map((action) => (
                <SelectItem key={action.id} value={action.id}>
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{action.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {action.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.action && (
            <p className="text-xs text-red-500">{errors.action.message}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Select an automation action from the available options
          </p>
        </div>

        {params.length > 0 && (
          <div className="space-y-3">
            <Label>Action Parameters</Label>
            <div className="space-y-3">
              {params.map((param, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 space-y-2 bg-muted/30"
                >
                  <Label
                    htmlFor={`param-value-${index}`}
                    className="text-sm font-medium"
                  >
                    {param.name} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`param-value-${index}`}
                    placeholder={
                      automationActions
                        ?.find((action) => action.name === data.action?.name)
                        ?.params.find((p) => p.name === param.name)
                        ?.placeholder || `Enter ${param.name}`
                    }
                    value={param.value}
                    onChange={(e) =>
                      handleParamValueChange(index, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {params.length === 0 && currentAction?.name && (
          <div className="text-sm text-muted-foreground border rounded-lg p-4 text-center">
            No parameters required for this action.
          </div>
        )}

        {!currentAction?.name && (
          <div className="text-sm text-muted-foreground border rounded-lg p-4 text-center">
            Select an action to configure parameters.
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  updateNode: state.updateNode,
  selectedNode: state.selectedNode,
});

export default AutomatedNodeForm;
