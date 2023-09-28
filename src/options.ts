import type { ResolvedConfig } from 'vite'
import type { ResolvedViteKSSOptions, ViteKSSPluginOptions } from './types'

import { join } from 'path'

export function resolveOptions(
  userOptions: Partial<ViteKSSPluginOptions>,
  viteConfig: ResolvedConfig,
): ResolvedViteKSSOptions {
  const options = {
    ...userOptions,
    dev: {
      base: userOptions.dev?.base || '/prototype/',
      entry: userOptions.dev?.entry || '',
    },
    kss: {
      source: userOptions.kss?.source || [],
      destination: userOptions.kss?.destination || '',
      css: userOptions.kss?.css || [],
      js: userOptions.kss?.js || [],
    },
  }

  return {
    dev: {
      base: options.dev.base,
      entry: options.dev.entry,
    },
    kss: {
      source: options.kss.source.map((src) => join(viteConfig.root, src)),
      destination: join(viteConfig.root, options.kss.destination),
      js: options.kss.css.map((src) => join(viteConfig.root, src)),
      css: options.kss.js.map((src) => join(viteConfig.root, src)),
    },
  }
}
