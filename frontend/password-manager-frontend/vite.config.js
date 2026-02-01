import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(),],
    server: {
      port: parseInt(env.VITE_DEV_PORT) || 5173,
    },
  build: {
    outDir:'../static/',
    rollupOptions: {
      input: {
        main: 'src/main.jsx',
        index: 'src/index.css'
      },
      output:{
        
        entryFileNames: '[name].js', // e.g., main.js
        assetFileNames: '[name].[ext]', // e.g., index.css
      }
    }
  },
  }
})
