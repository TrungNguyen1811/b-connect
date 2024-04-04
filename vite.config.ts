import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    svgr({
      exportAsDefault: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    // https: true,
    host: true,
    port: 5000,
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'path/to/localhost-key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'path/to/localhost.pem')),
    // },
  },
})
