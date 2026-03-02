// @ts-check
import * as fs from 'node:fs';
import opengraphImages, { presets } from 'astro-opengraph-images';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://flinky.me',
  integrations: [
    sitemap(),
    robotsTxt(),
    opengraphImages({
      options: {
        fonts: [
          {
            name: 'Roboto',
            weight: 400,
            style: 'normal',
            data: fs.readFileSync('node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff'),
          },
        ],
      },
      render: presets.blackAndWhite,
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
