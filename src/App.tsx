import { ThemeProvider } from "./components/theme/provider";
import WorkflowCanvas from "./components/WorkflowCanvas";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme-key">
      <main className="h-screen w-screen flex">
        <div className=" h-screen w-full p-4 box-border">
          <WorkflowCanvas />
        </div>
      </main>
    </ThemeProvider>
  );
}

export default App;
