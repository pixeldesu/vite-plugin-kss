import { createContext } from './context';
import { BuildPlugin } from './plugins/build';
import { DevPlugin } from './plugins/dev';
import { MainPlugin } from './plugins/main';
import { ViteKSSPluginOptions } from './types';

export function ViteKSS(options: ViteKSSPluginOptions) {
  const ctx = createContext(options)

  return [
    MainPlugin(ctx),
    BuildPlugin(ctx),
    DevPlugin(ctx)
  ]
}
