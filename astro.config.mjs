// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import node from '@astrojs/node'
import sitemap from '@astrojs/sitemap'

/** Produkcja: nadpisz `PUBLIC_SITE_URL` (np. w CI / hostingu). */
const site = process.env.PUBLIC_SITE_URL ?? 'https://zakawieni.pl'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),

  vite: {},

  site,
  compressHTML: true,

  integrations: [
    mdx(),
    sitemap(),
  ],
})
