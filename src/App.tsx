import NodesSidebar from "./components/NodeSidebar";
import { ThemeProvider } from "./components/theme/provider";
import { Separator } from "./components/ui/separator";
import { SidebarProvider } from "./components/ui/sidebar";
import { ReactFlowProvider } from "@xyflow/react";
import WorkflowCanvas from "./components/WorkflowCanvas";
import ConfigPanel from "./components/ConfigPanel";
import { Toaster } from "sonner";
import useStore from "./store/workflowStore";
import { useShallow } from "zustand/react/shallow";

function App() {
  const selectedNode = useStore(useShallow((state) => state.selectedNode));
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme-key">
      <SidebarProvider>
        <main className="h-screen w-screen flex">
          <NodesSidebar />

          <div className=" h-[92.5vh] w-full flex-col">
            <div className=" h-15.5 p-2 box-border flex items-center">
              {" "}
              Hello
            </div>
            <Separator />
            <div className="h-full w-full p-2">
              <ReactFlowProvider>
                <WorkflowCanvas />
              </ReactFlowProvider>
            </div>
          </div>
        </main>
        {selectedNode && (
          <aside>
            <div className=" w-[400px] border-l h-full">
              <ConfigPanel />
            </div>
          </aside>
        )}
        <Toaster position={"top-center"} richColors closeButton />
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
