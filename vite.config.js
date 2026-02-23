import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react(), tailwind()],
    
    // Define global constants that can be replaced at build time
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_ENV),
    },
    
    // Server configuration for local development
    server: {
      port: 5173,
      host: true,
      open: true,
    },
    
    // Preview server configuration
    preview: {
      port: 4173,
      host: true,
    },
    
    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: env.VITE_ENV !== 'production',
      // Optimize chunk splitting for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'form-vendor': ['formik', 'yup'],
          },
        },
      },
    },
  }
})
