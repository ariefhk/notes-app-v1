import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//component
import NotesApp from "./components/NotesApp";

//context
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ThemeContextProvider from "./providers/ThemeContextProvider";
import LocaleContextProvider from "./providers/LocaleContextProvider";
const queryClient = new QueryClient();
import { createRoot } from "react-dom/client";

//style
import "react-toastify/dist/ReactToastify.css";
import "./global.css";

// render
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <ThemeContextProvider>
                <LocaleContextProvider>
                    <NotesApp />
                    <ToastContainer />
                </LocaleContextProvider>
            </ThemeContextProvider>
        </QueryClientProvider>
    </BrowserRouter>,
);
