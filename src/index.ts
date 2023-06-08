import { BuildPlugin } from './plugins/build';
import { ViteKSSPluginOptions } from './types';

export function ViteKSS(options: ViteKSSPluginOptions) {
  return [
    BuildPlugin(options)
  ]
}
