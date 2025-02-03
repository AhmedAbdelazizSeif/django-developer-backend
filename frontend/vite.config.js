import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // For a user page the base URL is '/'
  base: '/',
  plugins: [react()],
  build: {
    // Change the output directory to "docs" so that GitHub Pages can serve from it
    outDir: 'docs',
  },
})
