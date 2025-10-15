// @ts-check
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import node from '@astrojs/node'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),

  vite: {},

  site: 'http://localhost:4321',
  compressHTML: true,

  integrations: [mdx()],
})
