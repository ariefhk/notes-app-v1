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
        },
    },
    plugins: [],
};
