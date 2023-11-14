import { useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";

export const ThemeContext = createContext(null);

export default function ThemeContextProvider({ children }) {
    const [theme, setTheme] = useState("light");

    const changeTheme = () => {
        const isDark = theme === "dark";
        setTheme(isDark ? "light" : "dark");
    };

    return <ThemeContext.Provider value={{ theme, changeTheme }}>{children}</ThemeContext.Provider>;
}

ThemeContextProvider.propTypes = {
    children: PropTypes.node,
};
