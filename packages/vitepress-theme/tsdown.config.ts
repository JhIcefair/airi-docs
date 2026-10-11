import { defineConfig } from 'tsdown'

// Only the Node.js side is built, the theme itself ships as Vue SFC sources
// and is compiled by the VitePress site that consumes it.
export default defineConfig({
  entry: {
    node: 'src/node.ts',
    unocss: 'src/unocss.ts',
  },
  platform: 'node',
  dts: true,
})
