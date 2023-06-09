import { createContext } from './context';
import { BuildPlugin } from './plugins/build';
import { ViteKSSPluginOptions } from './types';

export function ViteKSS(options: ViteKSSPluginOptions) {
  const ctx = createContext(options)
  return [
    BuildPlugin(ctx)
  ]
}
