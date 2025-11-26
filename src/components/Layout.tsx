import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./mode-toggle";

function App({ children }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="absolute top-0 right-0">
        <ModeToggle />
      </div>
      <div className="min-h-screen bg-background p-4 md:p-8 container">
        {children}
      </div>
    </ThemeProvider>
  );
}

export default App;
