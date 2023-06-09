import { ViteKSS } from '../dist/index'

export default {
  root: process.cwd() + '/example/',
  build: {
    assetsDir: '',
    outDir: 'dist/',
    manifest: true,
    rollupOptions: {
      input: './example/src/main.js'
    }
  },
  plugins: [
    ViteKSS({
      kss: {
        source: ['src/'],
        destination: 'prototype/',
        css: [],
        js: [],
      }
    })
  ]
}