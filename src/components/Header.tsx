import { Download, Play, Upload } from "lucide-react";
import { Button } from "./ui/button";
import ImportModal from "./modals/ImportModal";
import ExportModal from "./modals/ExportModal";
import RunWorkflowModal from "./modals/RunWorkflowModal";

const Header = () => {
  return (
    <div className="h-15.5 p-2 box-border flex items-center justify-between">
      <h3 className="text-lg font-semibold leading-0 mb-0">Canvas</h3>
      <div className=" flex items-center gap-4 mr-4">
        <ExportModal>
          <Button className=" h-8 rounded-sm" variant={"secondary"}>
            <Upload size={18} />
            Export
          </Button>
        </ExportModal>
        <ImportModal>
          <Button className=" h-8 rounded-sm" variant={"secondary"}>
            <Download size={18} />
            Import
          </Button>
        </ImportModal>
        <RunWorkflowModal>
          <Button className=" h-8 rounded-sm">
            <Play size={18} />
            Run Workflow
          </Button>
        </RunWorkflowModal>
      </div>
    </div>
  );
};

export default Header;
