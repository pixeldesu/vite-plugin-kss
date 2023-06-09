import type { Plugin } from 'vite'
import kss from 'kss'
import { _writeBundle } from '../utils/writeBundle'
import { OutputChunk } from 'rollup'
import { KSSPluginContext } from '../context'

export function BuildPlugin(ctx: KSSPluginContext) {
  return <Plugin>{
    name: 'kss-build',

    writeBundle(_options, bundle) {
      const { kss: kssOptions } = ctx.options

      _writeBundle(bundle, kssOptions)

      const assets = Object.entries(bundle)

      const cssAssets = assets
        .filter(([fileName, _assetInfo]) => fileName.endsWith('.css'))
        .map(([fileName, _assetInfo]) => fileName)
      
      const jsAssets = assets.filter(([fileName, assetInfo]) => {
          return (fileName.endsWith('.js') && (assetInfo as OutputChunk)?.isEntry)
        })
        .map(([fileName, _assetInfo]) => fileName)

      kssOptions.css = kssOptions.css!.concat(cssAssets)
      kssOptions.js = kssOptions.js!.concat(jsAssets)

      kss(kssOptions)
    }
  }
}
