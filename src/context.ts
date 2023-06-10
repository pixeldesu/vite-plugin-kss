import type { ResolvedConfig } from 'vite'
import type { ResolvedViteKSSOptions, ViteKSSPluginOptions } from './types'

export interface KSSPluginContext {
  viteConfig: ResolvedConfig
  userOptions: Partial<ViteKSSPluginOptions>
  options: ResolvedViteKSSOptions
}

export function createContext(
  userOptions: Partial<ViteKSSPluginOptions>
): KSSPluginContext {
  return {
    userOptions,
    options: undefined!,
    viteConfig: undefined!,
  }
}
