import type { Plugin } from 'vite'
import type { KSSPluginContext } from '../context'
import { resolveOptions } from '../options'

export function MainPlugin(ctx: KSSPluginContext) {
  return <Plugin>{
    name: 'vite-plugin-kss',
    enforce: 'pre',
    async configResolved(config) {
      ctx.viteConfig = config
      ctx.options = resolveOptions(ctx.userOptions, config)
    },
  }
}
