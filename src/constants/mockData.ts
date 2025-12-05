import { type Edge } from "@xyflow/react";
import type { User, WorkflowNode } from "@/types/nodes";

export const initialNodes: WorkflowNode[] = [
  {
    id: "start-node",
    type: "start",
    position: { x: 50, y: 200 },
    data: {
      title: "Employee Onboarding Workflow",
    },
  },

  // Task Node 1
  {
    id: "2",
    type: "task",
    position: { x: 300, y: 100 },
    data: {
      title: "Collect Employee Documents",
      description:
        "Gather all necessary onboarding documents including ID proof, address proof, educational certificates, and previous employment records.",
      assignee: {
        image: "https://avatar.iran.liara.run/public/13",
        name: "User 1",
      },
      dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
    },
  },

  // Task Node 2
  {
    id: "3",
    type: "task",
    position: { x: 300, y: 300 },
    data: {
      title: "Setup Workstation",
      description: "Prepare laptop, phone, and access cards for new employee",
      assignee: {
        image: "https://avatar.iran.liara.run/public/38",
        name: "Bob Johnson",
      }, // Bob Johnson
      dueDate: Date.now() + 3 * 24 * 60 * 60 * 1000, // 3 days
    },
  },

  // Approval Node
  {
    id: "4",
    type: "approval",
    position: { x: 600, y: 200 },
    data: {
      title: "Manager Approval Required",
      approver: {
        image: "https://avatar.iran.liara.run/public/35",
        name: "Manager",
      },
      approverRole: "Direct Manager", // Direct Manager
      autoApprove: {
        isActive: true,
        threshold: 5000,
      },
    },
  },

  // Automated Node 1 (Success Path)
  {
    id: "5",
    type: "automation",
    position: { x: 900, y: 100 },
    data: {
      title: "Send Welcome Email",
      action: {
        name: "Send Email",
        params: [
          { name: "to", value: "new.employee@company.com" },
          { name: "subject", value: "Welcome to the Team!" },
        ],
      },
    },
  },

  // Automated Node 2 (Success Path)
  {
    id: "6",
    type: "automation",
    position: { x: 1200, y: 100 },
    data: {
      title: "Generate Onboarding Document",
      action: {
        name: "Generate Document",
        params: [
          { name: "template", value: "onboarding_checklist" },
          { name: "recipient", value: "new.employee@company.com" },
        ],
      },
    },
  },

  // End Node (Success)
  {
    id: "7",
    type: "end",
    position: { x: 1500, y: 100 },
    data: {
      message:
        "Onboarding completed successfully! All documents verified and welcome email sent.",
      summary: true,
    },
  },

  // End Node (Rejected)
  {
    id: "8",
    type: "end",
    position: { x: 1500, y: 300 },
    data: {
      message:
        "Application rejected. Please review the requirements and reapply.",
      summary: true,
    },
  },
];

export const initialEdges: Edge[] = [
  // Start to Task 1
  {
    id: "e1-2",
    source: "start-node",
    target: "2",
    type: "smoothstep",
    animated: true,
    style: {
      strokeWidth: 3,
      stroke: "#64748b",
    },
  },

  // Start to Task 2
  {
    id: "e1-3",
    source: "1",
    target: "3",
    type: "smoothstep",
    animated: true,
    style: {
      strokeWidth: 3,
      stroke: "#64748b",
    },
  },

  // Task 1 to Approval
  {
    id: "e2-4",
    source: "2",
    target: "4",
    type: "smoothstep",
    animated: true,
    style: {
      strokeWidth: 3,
      stroke: "#64748b",
    },
  },

  // Task 2 to Approval
  {
    id: "e3-4",
    source: "3",
    target: "4",
    type: "smoothstep",
    animated: true,
    style: {
      strokeWidth: 3,
      stroke: "#64748b",
    },
  },

  // Approval (Approved) to Automated 1
  {
    id: "e4-5",
    source: "4",
    target: "5",
    sourceHandle: "4+true-output", // Approved path
    type: "approved",
    animated: true,
  },

  // Automated 1 to Automated 2
  {
    id: "e5-6",
    source: "5",
    target: "6",
    type: "smoothstep",
    animated: true,
    style: {
      strokeWidth: 3,
      stroke: "#64748b",
    },
  },

  // Automated 2 to End (Success)
  {
    id: "e6-7",
    source: "6",
    target: "7",
    type: "smoothstep",
    animated: true,
    style: {
      strokeWidth: 3,
      stroke: "#64748b",
    },
  },

  // Approval (Rejected) to End (Rejected)
  {
    id: "e4-8",
    source: "4",
    target: "8",
    sourceHandle: "4+false-output", // Rejected path
    type: "rejected",
    animated: true,
  },
];

export const MOCK_USERS: User[] = [
  {
    id: "user-1",
    name: "User 1",
    email: "user1@company.com",
    role: "HR Manager",
    image: "https://avatar.iran.liara.run/public/13",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "Department Head",
    image: "https://avatar.iran.liara.run/public/girl",
  },
  {
    id: "user-3",
    name: "Bob Johnson",
    email: "bob.j@company.com",
    role: "Team Lead",
    image: "https://avatar.iran.liara.run/public/38",
  },
  {
    id: "user-4",
    name: "Alice Williams",
    email: "alice.w@company.com",
    role: "HR Coordinator",
    image: "https://avatar.iran.liara.run/public/girl",
  },
  {
    id: "user-5",
    name: "Manager",
    email: "manager@company.com",
    role: "Direct Manager",
    image: "https://avatar.iran.liara.run/public/35",
  },
];

export const MOCK_APPROVER_ROLES = [
  {
    id: "role-1",
    name: "Direct Manager",
    description: "Employee's immediate supervisor",
  },
  { id: "role-2", name: "HR Manager", description: "Human Resources Manager" },
  {
    id: "role-3",
    name: "Department Head",
    description: "Head of the department",
  },
  {
    id: "role-4",
    name: "Finance Manager",
    description: "Financial approval authority",
  },
  { id: "role-5", name: "CEO", description: "Chief Executive Officer" },
];

export const MOCK_AUTOMATION_ACTIONS = [
  {
    id: "send_email",
    name: "Send Email",
    description: "Send automated email notification",
    params: [
      {
        name: "to",
        type: "string",
        required: true,
        placeholder: "recipient@company.com",
      },
      {
        name: "subject",
        type: "string",
        required: true,
        placeholder: "Email subject",
      },
    ],
  },
  {
    id: "generate_doc",
    name: "Generate Document",
    description: "Generate document from template",
    params: [
      { name: "template", type: "string", required: true, placeholder: "Template name" },
      { name: "recipient", type: "string", required: true, placeholder: "recipient@company.com" },
    ],
  },
];
