// @ts-check
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, envField, fontProviders } from 'astro/config';
import icon from 'astro-icon';
import rehypeCallouts from 'rehype-callouts';
import remarkBreaks from 'remark-breaks';
import remarkGFM from 'remark-gfm';

import remarkSectionize from './src/utils/remark/sectionize';

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      GISCUS_REPO: envField.string({ context: 'client', access: 'public' }),
      GISCUS_REPO_ID: envField.string({ context: 'client', access: 'public' }),
      GISCUS_CATEGORY: envField.string({ context: 'client', access: 'public' }),
      GISCUS_CATEGORY_ID: envField.string({ context: 'client', access: 'public' }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkGFM, remarkSectionize, remarkBreaks],
    rehypePlugins: [rehypeCallouts],
    shikiConfig: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-frappe',
      },
      defaultColor: false,
    },
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Rubik',
        cssVariable: '--font-rubik',
        weights: ['300 900'],
      },
      {
        provider: 'local',
        name: 'Monaspace Neon',
        cssVariable: '--font-neon',
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/MonaspaceNeon-Regular.woff'],
          },
        ],
      },
    ],
  },
  integrations: [icon(), mdx(), preact()],
});
