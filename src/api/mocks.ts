import { MOCK_AUTOMATION_ACTIONS } from "@/constants/mockData";
import { useQuery, useMutation } from "@tanstack/react-query";


const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// GET /automations
export function useAutomationsQuery() {
  return useQuery({
    queryKey: ["automations"],
    queryFn: async () => {
      await delay(300); 
      return MOCK_AUTOMATION_ACTIONS;
    },
  });
}

// POST /simulate
export function useSimulateMutation() {
  return useMutation({
    mutationFn: async (workflowNodes: any[]) => {
      await delay(500); 
      const steps = workflowNodes.map((node, idx) => {
        switch (node.type) {
          case "start":
            return {
              step: idx + 1,
              type: "start",
              status: "success",
              details: node.data?.title || "Workflow started.",
            };
          case "task":
            return {
              step: idx + 1,
              type: "task",
              status: "success",
              details: node.data?.title
                ? `Task '${node.data.title}' completed.`
                : "Task completed.",
              assignee: node.data?.assignee?.name,
            };
          case "approval":
            return {
              step: idx + 1,
              type: "approval",
              status: "success",
              details: node.data?.title
                ? `Approval '${node.data.title}' granted.`
                : "Approval granted.",
              approver: node.data?.approver?.name,
              role: node.data?.approverRole,
              autoApprove: node.data?.autoApprove?.isActive
                ? "Enabled"
                : "Disabled",
            };
          case "automation": {
            const automation = MOCK_AUTOMATION_ACTIONS.find(
              (a) =>
                a.name === node.data?.action?.name ||
                a.id === node.data?.action?.name
            );
            return {
              step: idx + 1,
              type: "automation",
              action: automation?.id || node.data?.action?.name || "unknown",
              status: "success",
              details: automation
                ? `${automation.name} executed.`
                : "Automation executed.",
              params: node.data?.action?.params || [],
            };
          }
          case "end":
            return {
              step: idx + 1,
              type: "end",
              status: "success",
              details: node.data?.message || "Workflow ended.",
            };
          default:
            return {
              step: idx + 1,
              type: node.type,
              status: "success",
              details: "Step executed.",
            };
        }
      });
      return {
        steps,
        summary: `Workflow executed with ${steps.length} step${
          steps.length > 1 ? "s" : ""
        }.`,
      };
    },
  });
}
