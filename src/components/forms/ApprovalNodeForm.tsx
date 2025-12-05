import { useCallback } from "react";
import useStore from "@/store/workflowStore";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { MOCK_USERS } from "@/constants/mockData";
import type { AppState } from "@/types/state";
import type { ApprovalNodeData } from "@/types/nodes";
import { useShallow } from "zustand/react/shallow";
import { Card, CardContent } from "../ui/card";
import AssigneeSelect from "@/components/AssigneeSelect";
import { Checkbox } from "../ui/checkbox";

const ApprovalNodeForm = () => {
  const { updateNode, selectedNode } = useStore(useShallow(mapStateToProps));

  const handleChange = useCallback(
    <K extends keyof ApprovalNodeData>(
      field: K,
      value: ApprovalNodeData[K]
    ) => {
      if (selectedNode && selectedNode.type === "approval") {
        updateNode(selectedNode.id, { [field]: value });
      }
    },
    [selectedNode, updateNode]
  );

  const handleApproverChange = useCallback(
    (userId: string) => {
      if (selectedNode && selectedNode.type === "approval") {
        const user = MOCK_USERS.find((u) => u.id === userId);
        if (user) {
          updateNode(selectedNode.id, {
            approver: {
              image: user.image,
              name: user.name,
            },
          });
        }
      }
    },
    [selectedNode, updateNode]
  );

  const handleAutoApproveToggle = useCallback(
    (checked: boolean) => {
      if (selectedNode && selectedNode.type === "approval") {
        const currentAutoApprove = selectedNode.data.autoApprove || {
          isActive: false,
          threshold: 0,
        };
        updateNode(selectedNode.id, {
          autoApprove: {
            ...currentAutoApprove,
            isActive: checked,
          },
        });
      }
    },
    [selectedNode, updateNode]
  );

  const handleThresholdChange = useCallback(
    (value: string) => {
      if (selectedNode && selectedNode.type === "approval") {
        const currentAutoApprove = selectedNode.data.autoApprove || {
          isActive: false,
          threshold: 0,
        };
        const numericValue = parseFloat(value) || 0;
        updateNode(selectedNode.id, {
          autoApprove: {
            ...currentAutoApprove,
            threshold: numericValue,
          },
        });
      }
    },
    [selectedNode, updateNode]
  );

  if (!selectedNode || selectedNode.type !== "approval") return null;

  const data = selectedNode.data;

  return (
    <div className="space-y-6">
      {/* Description Card */}
      <Card className="bg-yellow-50 py-3 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
        <CardContent className="px-3">
          <div className="flex items-start gap-3">
            <div>
              <h4 className="font-semibold text-sm text-yellow-900 dark:text-yellow-100">
                Approval Node
              </h4>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                Require approval from designated approvers before proceeding.
                Configure auto-approval rules for specific conditions.
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
            Approval Title <span className="text-red-500">*</span>
          </Label>
          <Input
            id="title"
            placeholder="e.g., Manager approval required"
            value={data.title || ""}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>

        {/* Approver */}
        <div className="space-y-2">
          <Label htmlFor="approver">
            Approver <span className="text-red-500">*</span>
          </Label>
          <AssigneeSelect
            value={data.approver}
            onValueChange={handleApproverChange}
            placeholder="Select an approver"
          />
        </div>

        {/* Approver Role */}
        <div className="space-y-2">
          <Label htmlFor="approverRole">Approver Role</Label>
          <Input
            id="approverRole"
            placeholder="e.g., Manager, HR Lead, Department Head"
            value={data.approverRole || ""}
            onChange={(e) => handleChange("approverRole", e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Specify the role or position of the approver
          </p>
        </div>

        {/* Auto Approval */}
        <div className="space-y-3 border rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="autoApprove"
              checked={data.autoApprove?.isActive || false}
              onCheckedChange={handleAutoApproveToggle}
            />
            <Label htmlFor="autoApprove" className="cursor-pointer">
              Enable Auto-Approval
            </Label>
          </div>

          {data.autoApprove?.isActive && (
            <div className="space-y-2 ml-6">
              <Label htmlFor="threshold">Auto-Approval Threshold</Label>
              <Input
                id="threshold"
                type="number"
                placeholder="e.g., 5000"
                value={data.autoApprove.threshold || ""}
                onChange={(e) => handleThresholdChange(e.target.value)}
                min="0"
                step="0.01"
              />
              <p className="text-xs text-muted-foreground">
                Automatically approve if value is below this threshold
              </p>
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

export default ApprovalNodeForm;
