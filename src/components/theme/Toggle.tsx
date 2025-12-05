import { Button } from "../ui/button";
import { useTheme } from "./provider";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
      variant="outline"
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
}
