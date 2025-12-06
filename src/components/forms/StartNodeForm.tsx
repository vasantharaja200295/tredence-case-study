import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useStore from "@/store/workflowStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { AppState } from "@/types/state";
import { useShallow } from "zustand/react/shallow";
import { startNodeSchema, type StartNodeFormData } from "@/lib/validations";
import { Card, CardContent } from "../ui/card";

const StartNodeForm = () => {
  const { updateNode, selectedNode } = useStore(useShallow(mapStateToProps));

  const {
    register,
    formState: { errors },
    reset,
  } = useForm<StartNodeFormData>({
    resolver: zodResolver(startNodeSchema),
    defaultValues: {
      title: (selectedNode?.data.title as string) || "",
    },
  });

  useEffect(() => {
    if (selectedNode && selectedNode.type === "start") {
      reset({
        title: selectedNode.data.title || "",
      });
    }
  }, [selectedNode, reset]);

  const handleChange = useCallback(
    (value: string) => {
      if (selectedNode && selectedNode.type === "start") {
        updateNode(selectedNode.id, { title: value });
      }
    },
    [selectedNode, updateNode]
  );

  if (!selectedNode || selectedNode.type !== "start") return null;

  return (
    <div className="space-y-6">
      {/* Description Card */}
      <Card className="bg-blue-50 py-3 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="px-3">
          <div className="flex items-start gap-3">
            <div>
              <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100">
                Start Node
              </h4>
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                This is the starting point of your workflow. Give it a
                descriptive title.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            Workflow Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g., Employee Onboarding Workflow"
            {...register("title", {
              onChange: (e) => handleChange(e.target.value),
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
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  updateNode: state.updateNode,
  selectedNode: state.selectedNode,
});

export default StartNodeForm;
