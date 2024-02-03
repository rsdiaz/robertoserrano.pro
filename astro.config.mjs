import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: 'https://robertoserrano.pro',
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
  })],
  output: "server",
  adapter: node({
    mode: "standalone"
  })
});