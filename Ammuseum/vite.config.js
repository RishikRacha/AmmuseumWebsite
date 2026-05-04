import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {             // Proxy, remove if not needed
    host: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:6969',
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
