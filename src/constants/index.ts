import type {
  StartNodeData,
  TaskNodeData,
  ApprovalNodeData,
  AutomationNodeData,
  EndNodeData,
} from "@/types/nodes";

export const HEADER_HEIGHT_OFFSET = 60;

export const DEFAULT_EDGE_STYLES = {
  style: {
    strokeWidth: 5,
  },
} as const;

export const DEFAULT_HANDLE_STYLES = {
  height: "16px",
  width: "16px",
} as const;

export const NODE_TYPES = {
  START: "start",
  END: "end",
  AUTOMATION: "automation",
  APPROVAL: "approval",
  TASK: "task",
} as const;

export type NodeType = (typeof NODE_TYPES)[keyof typeof NODE_TYPES];

export const START_NODE_FIELDS: StartNodeData = {
  title: "",
};

export const TASK_NODE_FIELDS: TaskNodeData = {
  title: "",
  description: "",
  assignee: {
    image: "",
    name: "",
  },
  dueDate: Date.now(),
};

export const APPROVAL_NODE_FIELDS: ApprovalNodeData = {
  title: "",
  approver: {
    image: "",
    name: "",
  },
  approverRole: "",
  autoApprove: {
    isActive: false,
    threshold: 10,
  },
};

export const AUTOMATION_NODE_FIELDS: AutomationNodeData = {
  title: "",
  action: {
    name: "",
    params: [],
  },
};

export const END_NODE_FIELDS: EndNodeData = {
  message: "",
  summary: false,
};
