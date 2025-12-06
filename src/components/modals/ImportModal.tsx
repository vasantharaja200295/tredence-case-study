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
import { toast } from "sonner";
import useStore from "@/store/workflowStore";
import type { AppState } from "@/types/state";
import { useShallow } from "zustand/react/shallow";
import { Input } from "../ui/input";

type Props = {
  children: ReactNode;
};

const ImportModal = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { setNodes, setEdges } = useStore(useShallow(mapStateToProps));

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    try {
      const text = await selectedFile.text();
      const data = JSON.parse(text);

      if (!data.nodes || !data.edges) {
        toast.error("Invalid workflow file format");
        return;
      }

      setNodes(data.nodes);
      setEdges(data.edges);

      toast.success("Workflow imported successfully!");
      setOpen(false);
      setSelectedFile(null);
    } catch (error) {
      toast.error("Failed to import workflow. Invalid file format.");
      console.error("Import error:", error);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setSelectedFile(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Workflow</DialogTitle>
          <DialogDescription>
            Select a JSON file to import your workflow
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Input type="file" accept=".json" onChange={handleFileSelect} />
          {selectedFile && (
            <p className="text-xs text-muted-foreground">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
          <Button onClick={handleImport} disabled={!selectedFile}>
            Import
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state: AppState) => ({
  setNodes: state.setNodes,
  setEdges: state.setEdges,
});

export default ImportModal;
