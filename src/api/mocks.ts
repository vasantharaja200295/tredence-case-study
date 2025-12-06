import type { Edge } from "@xyflow/react";
import type { WorkflowNode } from "@/types/nodes";
import { delay } from "@/lib/utils";
import { MOCK_AUTOMATION_ACTIONS } from "@/constants/mockData";

// Simulate workflow execution
export async function simulateWorkflow(workflow: {
  nodes: WorkflowNode[];
  edges: Edge[];
}) {
  await delay(500);

  const { nodes, edges } = workflow;
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const edgeMap: Record<string, Edge[]> = {};

  edges.forEach((e) => {
    if (!edgeMap[e.source]) edgeMap[e.source] = [];
    edgeMap[e.source].push(e);
  });

  const visited = new Set<string>();
  const steps: Array<{
    step: number;
    type: string;
    status: "success";
    details: string;
    [key: string]: unknown;
  }> = [];
  let stepNum = 1;

  function traverse(nodeId: string) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const node = nodeMap[nodeId];
    if (!node) return;

    const step = createStepFromNode(node, stepNum++);
    steps.push(step);

    const outgoing = edgeMap[nodeId] || [];
    if (node.type === "approval") {
      const approvedEdge = outgoing.find((e) =>
        (e.sourceHandle || "").includes("true-output")
      );
      if (approvedEdge) traverse(approvedEdge.target);
    } else {
      outgoing.forEach((e) => traverse(e.target));
    }
  }

  const startNode = nodes.find((n) => n.type === "start");
  if (startNode) traverse(startNode.id);

  return {
    steps,
    summary: `Workflow executed with ${steps.length} step${
      steps.length > 1 ? "s" : ""
    }.`,
  };
}

function createStepFromNode(node: WorkflowNode, stepNumber: number) {
  const baseStep = {
    step: stepNumber,
    status: "success" as const,
  };

  switch (node.type) {
    case "start":
      return {
        ...baseStep,
        type: "start",
        details: node.data?.title || "Workflow started.",
      };

    case "task":
      return {
        ...baseStep,
        type: "task",
        details: node.data?.title
          ? `Task '${node.data.title}' completed.`
          : "Task completed.",
        assignee: node.data?.assignee?.name,
      };

    case "approval":
      return {
        ...baseStep,
        type: "approval",
        details: node.data?.title
          ? `Approval '${node.data.title}' granted.`
          : "Approval granted.",
        approver: node.data?.approver?.name,
        role: node.data?.approverRole,
        autoApprove: node.data?.autoApprove?.isActive ? "Enabled" : "Disabled",
      };

    case "automation": {
      const automation = MOCK_AUTOMATION_ACTIONS.find(
        (a) =>
          a.name === node.data?.action?.name || a.id === node.data?.action?.name
      );
      return {
        ...baseStep,
        type: "automation",
        action: automation?.id || node.data?.action?.name || "unknown",
        details: automation
          ? `${automation.name} executed.`
          : "Automation executed.",
        params: node.data?.action?.params || [],
      };
    }

    case "end":
      return {
        ...baseStep,
        type: "end",
        details: node.data?.message || "Workflow ended.",
      };
  }
}
