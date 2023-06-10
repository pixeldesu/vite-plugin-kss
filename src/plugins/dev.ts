import { HmrContext, Plugin } from 'vite'
import { KSSPluginContext } from '../context'
import kss from 'kss'
import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

const KSS_FILE_CACHE = new Map<string, string>()

export function DevPlugin(ctx: KSSPluginContext) {
  return <Plugin>{
    name: 'vite-plugin-kss:dev',
    apply: 'serve',

    buildStart() {
      // initially build KSS on server start
      kss(ctx.options.kss)
    },

    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url?.startsWith(ctx.options.dev.prefix)) {
          const regex = new RegExp(`^${ctx.options.dev.prefix}(.+)$`, 'g')
          const matches = Array.from(req.url.matchAll(regex))

          if (matches && matches[0]) {
            const fileName = matches[0][1]
            const fullPath = join(ctx.options.kss.destination!, fileName)
            let contents

            if (KSS_FILE_CACHE.has(fullPath)) {
              contents = KSS_FILE_CACHE.get(fullPath)
            } else if (existsSync(fullPath)) {
              contents = readFileSync(fullPath, 'utf-8').replace(
                '</body>',
                `<script type="module" src="/@vite/client"></script><script type="module" src="${ctx.options.dev.entry}"></script></body>`
              )

              KSS_FILE_CACHE.set(fullPath, contents)
            }

            if (contents) {
              res.statusCode = 200
              res.write(contents)
              res.end()
            }
          }
        } else {
          next()
        }
      })
    },

    handleHotUpdate(hmrCtx: HmrContext) {
      // only rebuild KSS if files outside of the prototype directory change
      if (!hmrCtx.file.includes(ctx.options.dev.prefix)) {
        kss(ctx.options.kss)
        KSS_FILE_CACHE.clear()
      }
    },
  }
}
