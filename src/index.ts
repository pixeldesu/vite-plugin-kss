import type { ViteKSSPluginOptions } from './types'
import { createContext } from './context'
import { BuildPlugin } from './plugins/build'
import { DevPlugin } from './plugins/dev'
import { MainPlugin } from './plugins/main'

export function ViteKSS(options: ViteKSSPluginOptions) {
  const ctx = createContext(options)

  return [MainPlugin(ctx), BuildPlugin(ctx), DevPlugin(ctx)]
}
