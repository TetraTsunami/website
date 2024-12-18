import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import typography from "@tailwindcss/typography"

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
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./posts/*.mdx"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-rubik)", ...defaultTheme.fontFamily.sans],
                mono: ["var(--font-neon)", ...defaultTheme.fontFamily.mono],
            },
            keyframes: {
                "fade-up": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(50px)",
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
                "i-sm": "0px 0px 5px 0px #00000005, 0px 2px 10px 0px #00000002, inset 0px 0px 5px 0px hsla(0,0%,100%,.25)",
                "i-md": "0px 0px 15px 0px #00000006, 0px 2px 30px 0px #00000016, inset 0px 0px 5px 0px hsla(0,0%,100%,.25)",
                "i-lg": "0px 0px 30px 0px #00000007, 0px 30px 60px 0px #00000027, inset 0px 0px 5px 0px hsla(0,0%,100%,.25)",
            },
            screens: {
                'can-hover': { 'raw': '(hover: hover)' },
                'hover-none': { 'raw': '(hover: none)' },
            },
            typography: ({ theme }: { theme: any }) => ({
                DEFAULT: {
                    css: {
                        code: {
                            backgroundColor: 'hsl(var(--color-content) / 0.05)',
                            borderRadius: theme('borderRadius.md'),
                            paddingTop: theme('padding[1]'),
                            paddingRight: theme('padding[1.5]'),
                            paddingBottom: theme('padding[1]'),
                            paddingLeft: theme('padding[1.5]'),
                        },
                        'code::before': {
                            content: 'normal',
                        },
                        'code::after': {
                            content: 'normal',
                        },
                    },
                },
            }),
        },
    },
    plugins: [gridColsFlowPlugin, animationDelayPlugin, animationFillPlugin, typography],
};

export default config;
