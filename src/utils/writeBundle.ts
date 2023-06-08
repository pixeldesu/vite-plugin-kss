import type { OutputBundle, OutputChunk } from 'rollup'
import type { KssOptions } from '../types'

import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join } from 'path'

export function _writeBundle(bundle: OutputBundle, kssOptions: KssOptions) {
  const assets = Object.entries(bundle)

  const kssDestination = join(process.cwd(), kssOptions.destination)
  if (!existsSync(kssDestination)) {
    mkdirSync(kssDestination)
  }

  assets.forEach(([fileName, assetInfo]) => {
    const filePath = join(kssDestination, fileName)

    if ((assetInfo as OutputChunk).code) {
      writeFileSync(filePath, (assetInfo as OutputChunk).code)
    }
  })
}
