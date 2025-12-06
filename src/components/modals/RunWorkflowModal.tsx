import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import useStore from "@/store/workflowStore";
import { useSimulateMutation } from "@/api";
import { useState } from "react";

type Props = {
  children: ReactNode;
};

const RunWorkflowModal = ({ children }: Props) => {
  const { nodes, edges } = useStore();
  const simulateMutation = useSimulateMutation();
  const [showResults, setShowResults] = useState(false);

  const handleRun = () => {
    simulateMutation.mutate(
      { nodes, edges },
      {
        onSuccess: () => setShowResults(true),
      }
    );
  };

  const steps = simulateMutation.data?.steps || [];
  const summary = simulateMutation.data?.summary;

  return (
    <Dialog >
      <DialogTrigger asChild >{children}</DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Run Workflow</DialogTitle>
          <DialogDescription>Execute, Test, Debug workflows</DialogDescription>
        </DialogHeader>
        <div>
          {simulateMutation.isPending && <p>Executing Workflow...</p>}
          {simulateMutation.isError && (
            <p className="text-red-500">
              Error: {simulateMutation.error?.message || "Simulation failed."}
            </p>
          )}
          {showResults && (
            <ScrollArea className="h-75  border flex-col rounded-md">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex text-sm gap-2 m-1 font-mono items-center"
                >
                  {step.status === "success" ? (
                    <Check color="#84cc16" size={18} />
                  ) : (
                    <X color="#e11d48" size={18} />
                  )}
                  <span>{step.details}</span>
                </div>
              ))}
              {summary && (
                <div className="text-sm font-mono mt-2">
                  <p>-------------------</p>
                  <p>{summary}</p>
                </div>
              )}
            </ScrollArea>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <Button onClick={handleRun} disabled={simulateMutation.isPending}>
            Run
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RunWorkflowModal;
