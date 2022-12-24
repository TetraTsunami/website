/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

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
                    },
                },
            },
            animation: {
                "bounce-slow": "bounce 2s infinite",
                "fade-up": "fade-up 0.5s ease-out",
            },
        },
    },
    plugins: [
        plugin(({ matchUtilities, theme }) => {
            matchUtilities(
                {
                    "animation-delay": (value) => {
                        return {
                            "animation-delay": value,
                        };
                    },
                },
                {
                    values: theme("transitionDelay"),
                }
            );
        }),
        plugin(({ matchUtilities, theme }) => {
            matchUtilities(
                {
                    "animation-fill": (value) => {
                        return {
                            "animation-fill-mode": value,
                        };
                    },
                },
                {
                    values: theme('animationFillMode'),
                }
            );
        }, {
            theme: {
                animationFillMode: {
                    'none': 'none',
                    'forward': 'forwards',
                    'backward': 'backwards',
                    'both': 'both',
                }
            }
        }),
    ],
};
