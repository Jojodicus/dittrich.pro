// @ts-check
import { defineConfig } from 'astro/config';
import { remarkExtractTOC } from './src/utils/remark-extract-toc.ts';
import { remarkCodeCopy } from './src/utils/remark-code-copy.ts';

import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://dittrich.pro',
  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: ['sharp'],
      },
    },
  },

  markdown: {
    remarkPlugins: [remarkExtractTOC, remarkCodeCopy],
  },

  integrations: [
    icon({
      include: {
        lucide: ["*"],
        cib: ["*"],
      },
    }),
    sitemap(),
    mermaid({
      theme: 'dark',
      autoTheme: false,
    }),
    mdx(),
  ],

  redirects: {
    '/atom.xml': '/rss.xml'
  },
});