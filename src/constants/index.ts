export const DEFAULT_EDGE_STYLES = {
  style: {
    strokeWidth: 5,
  },
};

export const DEFAULT_HANDLE_STYLES = { height: "16px", width: "16px" };

export const NODE_TYPES = {
  START: "start",
  END: "end",
  AUTOMATION: "automation",
  APPROVAL: "approval",
  TASK: "task",
};

export const START_NODE_FIELDS = {
  title: "",
};

export const TASK_NODE_FIELDS = {
  title: "",
  description: "",
  assignee: "",
  dueDate: Date.now(),
};

export const APPROVAL_NODE_FIELDS = {
  title: "",
  approverRole: "",
  autoApprove: {
    isActive: false,
    threshold: 10,
  },
};

export const AUTOMATION_NODE_FIELDS = {
  title: "",
  action: {
    name: "",
    params: [],
  },
};

export const ENDE_NODE_FIELDS = {
  message: "",
  summary: false,
};
