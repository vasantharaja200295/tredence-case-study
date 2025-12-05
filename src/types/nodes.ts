import type { Node } from "@xyflow/react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image: string;
}

export interface Assignee {
  name: string;
  image: string;
}

export interface Approver {
  name: string;
  image: string;
}

export interface AutoApprovalConfig {
  isActive: boolean;
  threshold: number;
}

export interface ActionParameter {
  name: string;
  value: string;
}

export interface AutomationAction {
  name: string;
  params: ActionParameter[];
}

export interface StartNodeData extends Record<string, unknown> {
  title: string;
}

export interface TaskNodeData extends Record<string, unknown> {
  title: string;
  description: string;
  assignee: Assignee;
  dueDate: number;
}

export interface ApprovalNodeData extends Record<string, unknown> {
  title: string;
  approver: Approver;
  approverRole: string;
  autoApprove: AutoApprovalConfig;
}

export interface AutomationNodeData extends Record<string, unknown> {
  title: string;
  action: AutomationAction;
}

export interface EndNodeData extends Record<string, unknown> {
  message: string;
  summary: boolean;
}

export type StartNode = Node<StartNodeData, "start">;
export type TaskNode = Node<TaskNodeData, "task">;
export type ApprovalNode = Node<ApprovalNodeData, "approval">;
export type AutomationNode = Node<AutomationNodeData, "automation">;
export type EndNode = Node<EndNodeData, "end">;

export type WorkflowNode =
  | StartNode
  | TaskNode
  | ApprovalNode
  | AutomationNode
  | EndNode;
