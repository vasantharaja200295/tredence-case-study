import NodesSidebar from "./components/NodeSidebar";
import { ThemeProvider } from "./components/theme/provider";
import { Separator } from "./components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "./components/ui/sidebar";
import { ReactFlowProvider } from "@xyflow/react";
import WorkflowCanvas from "./components/WorkflowCanvas";

function App() {
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
        <aside>
          <div className=" w-64 border-l h-full">
            <SidebarHeader>Right SideBar</SidebarHeader>
            <SidebarContent></SidebarContent>
          </div>
        </aside>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
