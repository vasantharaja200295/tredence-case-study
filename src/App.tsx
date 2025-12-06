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
import ErrorBoundary from "./components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";

function App() {
  const queryClient = new QueryClient();
  const selectedNode = useStore(useShallow((state) => state.selectedNode));

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ReactFlowProvider>
          <ThemeProvider defaultTheme="dark" storageKey="theme-key">
            <SidebarProvider>
              <main className="h-screen w-screen flex">
                <NodesSidebar />

                <div className="h-[92.5vh] w-full flex-col">
                  <Header />
                  <Separator />
                  <div className="h-full w-full p-2">
                    <WorkflowCanvas />
                  </div>
                </div>
              </main>
              {selectedNode && (
                <aside>
                  <div className="w-[400px] border-l h-full">
                    <ConfigPanel />
                  </div>
                </aside>
              )}
              <Toaster position={"top-center"} richColors closeButton />
            </SidebarProvider>
          </ThemeProvider>
        </ReactFlowProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
