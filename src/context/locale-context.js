import { useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";

export const LocaleContext = createContext(null);

export default function LocaleContextProvider({ children }) {
    const [locale, setLocale] = useState("id");

    const changeLocale = () => {
        const isEn = locale === "en";
        setLocale(isEn ? "id" : "en");
    };

    return <LocaleContext.Provider value={{ locale, changeLocale }}>{children}</LocaleContext.Provider>;
}

LocaleContextProvider.propTypes = {
    children: PropTypes.node,
};
