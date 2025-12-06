import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useReactFlow } from "@xyflow/react";
import { toast } from "sonner";

type Props = {
  children: ReactNode;
};

const ExportModal = ({ children }: Props) => {
  const reactFlowRef = useReactFlow();
  const [open, setOpen] = useState(false);

  const handleExport = () => {
    const data = reactFlowRef.toObject();
    const json = JSON.stringify(data, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "flow.json";
    a.click();

    URL.revokeObjectURL(url);
    toast.success("Successfully Exported Workflow");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Workflow</DialogTitle>
          <DialogDescription>Export your workflow into JSON</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <Button onClick={handleExport}>Export</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;
