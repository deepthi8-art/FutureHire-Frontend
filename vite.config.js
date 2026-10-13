import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      // Forward /api requests to live Render backend or local Spring Boot
      '/api': {
        target: 'https://futurehire-backend.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})

