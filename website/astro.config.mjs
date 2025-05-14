// @ts-check
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import rehypeSectionize from '@hbsnow/rehype-sectionize';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';
import rehypeCallouts from 'rehype-callouts';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import remarkGFM from 'remark-gfm';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    remarkPlugins: [remarkGFM, remarkBreaks],
    rehypePlugins: [rehypeSlug, rehypeSectionize, rehypeCallouts],
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
  integrations: [icon(), mdx(), react()],
});
