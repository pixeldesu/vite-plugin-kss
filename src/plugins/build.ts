import type { Plugin } from 'vite'
import type { OutputChunk } from 'rollup'
import type { KSSPluginContext } from '../context'
import kss from 'kss'
import { _writeBundle } from '../utils/writeBundle'

export function BuildPlugin(ctx: KSSPluginContext) {
  return <Plugin>{
    name: 'vite-plugin-kss:build',
    apply: 'build',

    writeBundle(_options, bundle) {
      const { kss: kssOptions } = ctx.options

      _writeBundle(bundle, kssOptions)

      const assets = Object.entries(bundle)

      const cssAssets = assets
        .filter(([fileName]) => fileName.endsWith('.css'))
        .map(([fileName]) => fileName)

      const jsAssets = assets
        .filter(([fileName, assetInfo]) => {
          return fileName.endsWith('.js') && (assetInfo as OutputChunk)?.isEntry
        })
        .map(([fileName]) => fileName)

      kssOptions.css = kssOptions.css!.concat(cssAssets)
      kssOptions.js = kssOptions.js!.concat(jsAssets)

      kss(kssOptions)
    },
  }
}
