import { useRoutes } from "react-router-dom";
import { publicRoutes, appRoutes } from "./routes";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "sonner";

function AppRoutes() {
    const element = useRoutes(appRoutes);
    return (
        <ThemeProvider>
            <Toaster richColors closeButton />
            {element}
        </ThemeProvider>
    );
}

function App() {
    const publicElement = useRoutes(publicRoutes);

    if (publicElement) return publicElement;

    return <AppRoutes />;
}

export default App;
