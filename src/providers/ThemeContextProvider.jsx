import PropTypes from "prop-types";
import { ThemeContext } from "../context/theme-context";
import { useState } from "react";

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
