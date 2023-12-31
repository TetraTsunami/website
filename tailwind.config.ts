import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const gridColsFlowPlugin = plugin(
    ({ matchUtilities, theme }: { matchUtilities: any; theme: any }) => {
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
    }
);

const animationDelayPlugin = plugin(
    ({ matchUtilities, theme }: { matchUtilities: any; theme: any }) => {
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
    }
);

const animationFillPlugin = plugin(
    ({ matchUtilities, theme }: { matchUtilities: any; theme: any }) => {
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
);

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
                        opacity: "0",
                        transform: "translateY(10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
            },
            animation: {
                "bounce-slow": "bounce 2s infinite",
                "fade-up": "fade-up 0.5s ease-out",
            },
            colors: {
                bkg: 'hsl(var(--color-bkg) / <alpha-value>)',
                content: 'hsl(var(--color-content) / <alpha-value>)',
                accent: 'hsl(var(--color-accent) / <alpha-value>)',
            },
            boxShadow: {
                "i-sm": "0px 0px 5px 0px #00000005, 0px 2px 10px 0px #00000002, inset 0px 0px 1px 0px hsla(0,0%,100%,.15)",
                "i-md": "0px 0px 15px 0px #00000006, 0px 2px 30px 0px #00000016, inset 0px 0px 1px 0px hsla(0,0%,100%,.15)",
                "i-lg": "0px 0px 30px 0px #00000007, 0px 30px 60px 0px #00000027, inset 0px 0px 1px 0px hsla(0,0%,100%,.15)",
            },
        },
    },
    plugins: [gridColsFlowPlugin, animationDelayPlugin, animationFillPlugin],
};

export default config;
