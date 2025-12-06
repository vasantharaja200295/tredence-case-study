import { MOCK_AUTOMATION_ACTIONS } from "@/constants/mockData";
import { useQuery, useMutation } from "@tanstack/react-query";
import { delay } from "@/lib/utils";
import { simulateWorkflow } from "./mocks";

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
    mutationFn: simulateWorkflow,
  });
}
