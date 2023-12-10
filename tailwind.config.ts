import type { Config } from 'tailwindcss'
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const config: Config = {
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
        plugin(({ matchUtilities, theme }: { matchUtilities: any, theme: any}) => {
            matchUtilities(
                {
                    "grid-cols-flow": (value: any) => {
                        return {
                            "grid-template-columns": `repeat(auto-fill, minmax(${value}, 1fr))`,
                        };
                    },
                },
                {
                    values: theme("width"),
                }
            );
        }),
        plugin(({ matchUtilities, theme }: { matchUtilities: any, theme: any}) => {
            matchUtilities(
                {
                    "animation-delay": (value: any) => {
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
        plugin(
            ({ matchUtilities, theme }: { matchUtilities: any, theme: any}) => {
                matchUtilities(
                    {
                        "animation-fill": (value: any) => {
                            return {
                                "animation-fill-mode": value,
                            };
                        },
                    },
                    {
                        values: theme("animationFillMode"),
                    }
                );
            },
            {
                theme: {
                    animationFillMode: {
                        none: "none",
                        forward: "forwards",
                        backward: "backwards",
                        both: "both",
                    },
                },
            }
        ),
    ],
};
export default config;