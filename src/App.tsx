import { ThemeProvider } from "./components/theme/provider";
import { ThemeToggle } from "./components/theme/toggle";
import { Sidebar, SidebarProvider } from "./components/ui/sidebar";
import WorkflowCanvas from "./components/WorkflowCanvas";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme-key">
      <SidebarProvider>
        <main className="h-screen w-screen flex">
          <Sidebar>
            <ThemeToggle />
          </Sidebar>
          <div className=" h-screen w-full p-4 box-border">
            <WorkflowCanvas />
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}

export default App;
