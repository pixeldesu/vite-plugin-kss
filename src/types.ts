import type { KssOptions as DefaultKssOptions } from 'kss'

export type KssOptions = {
  destination: string

  js: string[]

  css: string[]
} & DefaultKssOptions

export type ViteKSSPluginOptions = {
  kss: KssOptions
}
