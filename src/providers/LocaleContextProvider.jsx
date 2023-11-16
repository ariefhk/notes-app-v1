import PropTypes from "prop-types";
import { LocaleContext } from "../context/locale-context";
import { useState } from "react";

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
