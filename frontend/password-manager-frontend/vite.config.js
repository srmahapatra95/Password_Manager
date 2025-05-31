import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
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
})
