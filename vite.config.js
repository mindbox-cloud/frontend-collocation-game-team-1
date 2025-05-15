import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import tsConfigPaths from 'rollup-plugin-tsconfig-paths'
import {defineConfig} from 'vite'
import bundlesize from 'vite-plugin-bundlesize'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      tsconfigPaths(),
      bundlesize({
        stats: 'all',
        limits: [
          {name: 'main.js', limit: '300 kB'},
        ],
      }),
    ],
    server: {
      port: 3000,
    },
    // https://vitejs.dev/guide/build.html
    build: {
      target: 'es2019',
      assetsInlineLimit: Number.MAX_SAFE_INTEGER,
      sourcemap: 'hidden',
      // https://rollupjs.org/configuration-options/
      rollupOptions: {
        plugins: [
          tsConfigPaths(),
          nodeResolve({extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.svg']}),
          commonjs(),
        ],
        input: {
          main: 'src/main.ts',
          index: 'index.html',
        },
        output: {
          entryFileNames: '[name].js',
        },
      },
    },
  }
})
