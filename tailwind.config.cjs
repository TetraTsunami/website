/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["RubikVariable", ...defaultTheme.fontFamily.sans],
            },
            animation: {
                "bounce-slow": "bounce 2s infinite",
            },
        },
    },
    plugins: [],
};
