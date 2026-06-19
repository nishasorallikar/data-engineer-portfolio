import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const nm = id.includes('node_modules');

          if (!nm) {
            if (id.includes('/data/blogPosts'))              return 'data-blog';
            if (id.includes('SQLDataWarehouseProject'))      return 'page-sql-project';
            if (id.includes('/components/Stack'))            return 'comp-stack';

            return; // let Rollup decide for all other app files
          }

          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          ) return 'vendor-react';

          if (id.includes('/node_modules/framer-motion/'))  return 'vendor-framer';

          if (
            id.includes('/node_modules/react-router/') ||
            id.includes('/node_modules/react-router-dom/')
          ) return 'vendor-router';

          if (id.includes('/node_modules/lucide-react/'))   return 'vendor-icons';

          if (id.includes('/node_modules/react-hot-toast/')) return 'vendor-toast';

          return 'vendor-misc';
        },
      },
    },
    target: 'es2020',
    minify: 'esbuild',
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
})
