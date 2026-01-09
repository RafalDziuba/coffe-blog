// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import node from '@astrojs/node'
import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),

  vite: {},

  site: 'https://twoja-domena.pl', // WAŻNE: Zmień na prawdziwy adres URL strony
  compressHTML: true,

  integrations: [mdx(), sitemap()],
})
