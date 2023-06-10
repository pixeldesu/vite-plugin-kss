# vite-plugin-kss

Plugin to integrate KSS (specifically [kss-node](https://github.com/kss-node/kss-node)) into the Vite bundling process.

## Setup

### Installation

```shell
npm i --save-dev vite-plugin-kss
```

### Configuration

Add `ViteKSS` plugin to your `vite.config.{js,ts}` and configure it:

```js
import { ViteKSS } from 'vite-plugin-kss'

export default {
  plugins: [
    ViteKSS({
      dev: {
        // base of the KSS output being available on the Vite dev server
        base: '/prototype/',

        // entry script file (for injection into KSS)
        entry: '/src/main.js',
      },

      kss: {
        // any of the kss-node options can go here
        // reference: https://github.com/kss-node/kss-node#using-the-command-line-tool
        // the important ones you should set are:
        // - source
        // - destination
      },
    }),
  ],
}
```

### Usage

With the plugin configured, KSS generation is now done when running both `vite build` or `vite dev`/`vite serve`.

When doing a production build with `vite build` the plugin automatically collects all JS entrypoints and CSS assets, also outputs them to the configured KSS destination and includes them in the build configuration so they are rendered into the HTML output.

If a development server is running using `vite dev`/`vite serve`, KSS is available at `localhost:5173/prototype/` (or the configured `dev.prefix` location). The plugin automatically injects the Vite client and entrypoint (configured in `dev.entry`) so HMR and all assets work properly.

## License

This project is licensed under the [MIT License](./LICENSE)
