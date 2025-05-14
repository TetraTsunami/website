// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Rubik",
        cssVariable: "--font-rubik",
        weights: ["300 900"]
      },
      {
        provider: "local",
        name: "Monaspace Neon",
        cssVariable: "--font-neon",
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/MonaspaceNeon-Regular.woff"],
          },
        ],
      },
    ],
  },

  integrations: [icon(), mdx()],
});