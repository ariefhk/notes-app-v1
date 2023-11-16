import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

//component
import NotesApp from "./components/NotesApp";

//context
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ThemeContextProvider from "./providers/ThemeContextProvider";
import LocaleContextProvider from "./providers/LocaleContextProvider";
const queryClient = new QueryClient();

//style
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <ThemeContextProvider>
                <LocaleContextProvider>
                    <NotesApp />
                </LocaleContextProvider>
            </ThemeContextProvider>
        </QueryClientProvider>
    </BrowserRouter>,
);
