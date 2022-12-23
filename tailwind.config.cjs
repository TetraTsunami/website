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
            keyframes: {
                "fade-up": {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(10px)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateY(0)",
                    }
                }
            },
            animation: {
                "bounce-slow": "bounce 2s infinite",
                "fade-up": "fade-up 0.5s ease-out",
            },
        },
    },
    plugins: [],
};
