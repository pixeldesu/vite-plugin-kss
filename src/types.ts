import type { KssOptions as DefaultKssOptions } from 'kss'

export type KssOptions = {
  destination?: string

  js?: string[]

  css?: string[]
} & DefaultKssOptions

export type DevPluginOptions = {
  prefix: string
  entry: string
}

export type ViteKSSPluginOptions = {
  dev: DevPluginOptions
  kss: KssOptions
}

export type ResolvedViteKSSOptions = Required<ViteKSSPluginOptions>