import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// User site (username.github.io) is served from the root, so base is '/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
