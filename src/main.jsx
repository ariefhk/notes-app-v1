import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

//component
import NotesApp from "./components/NotesApp";

//context
import ThemeContextProvider from "./context/theme-context";
import LocaleContextProvider from "./context/locale-context";

//style
import "./global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <ThemeContextProvider>
            <LocaleContextProvider>
                <NotesApp />
            </LocaleContextProvider>
        </ThemeContextProvider>
    </BrowserRouter>,
);
