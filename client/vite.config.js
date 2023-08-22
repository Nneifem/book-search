import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3023,
    open: true, 
    proxy: {
      '/graphql': {
        target: 'http://127.0.0.1:3003',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  }
})
