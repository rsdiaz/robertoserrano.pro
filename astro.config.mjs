import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from './src/constants';
import { getSlugsFromCollection } from './src/utils';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'dracula',
      langs: [],
      wrap: true
    }
  },
  integrations: [tailwind({
    // Example: Disable injecting a basic `base.css` import on every page.
    // Useful if you need to define and/or import your own custom `base.css`.
    applyBaseStyles: false
  }), sitemap({
    customPages: getSlugsFromCollection('posts', '/blog'),
  })],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});