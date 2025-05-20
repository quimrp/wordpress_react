import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': {
        target: 'https://instaltancaments.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/graphql/, '/graphql'),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            // Asegurarse de que el token se envía correctamente
            const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2luc3RhbHRhbmNhbWVudHMuY29tIiwiaWF0IjoxNzQ3NTQ1NjU4LCJuYmYiOjE3NDc1NDU2NTgsImV4cCI6MTc0ODE1MDQ1OCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.aCtPeC2n_cxlmuH9wTPcA_JmQsQnp71wrrO9oW8tHlo';
            proxyReq.setHeader('Authorization', `Bearer ${token}`);
          });
        },
      }
    }
  }
})
