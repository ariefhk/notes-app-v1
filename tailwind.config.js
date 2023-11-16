/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
            boxShadow: {
                high: "0px 0px 10px rgba(0, 0, 0, 0.15)",
                low: "0px 0px 4px rgba(0, 0, 0, 0.15)",
            },
            colors: {
                "blum-1": "#E3FDFD",
                "blum-2": "#CBF1F5",
                "blum-3": "#A6E3E9",
                "blum-4": "#71C9CE",
                "dark-1": "#A5D7E8",
                "dark-2": "#576CBC",
                "dark-3": "#19376D",
                "dark-4": "#0B2447",
                "alert-green": "#73CA5C",
                "alert-yellow": "#F9CC00",
                "alert-red": "#FF0000",
            },
            borderRadius: {
                rad4: "4px",
                rad8: "8px",
                rad12: "12px",
                rad16: "16px",
            },
        },
    },
    plugins: [],
};
