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
          // Normalize separators
          const nm = id.includes('node_modules');

          if (!nm) {
            // ── App data files (rarely change → long cache life) ──────────
            if (id.includes('/data/socModulesData'))         return 'data-soc';
            if (id.includes('/data/networkingModulesData'))  return 'data-net';
            if (id.includes('/data/pentestModulesData'))     return 'data-pentest';
            if (id.includes('/data/csaModulesData'))         return 'data-csa';
            if (id.includes('/data/blogPosts'))              return 'data-blog';

            // ── Heavy project pages (lazy-loaded on demand) ───────────────
            if (id.includes('SOCLabProject'))           return 'page-soc-lab';
            if (id.includes('PhishingDetection'))       return 'page-phishing';

            // ── CSA heavy modules — each gets its OWN chunk ───────────────
            // (Module01=63 kB, Module02=88 kB, Module03=44 kB — too big to group)
            if (id.includes('CSAModule01'))  return 'page-csa-m01';
            if (id.includes('CSAModule02'))  return 'page-csa-m02';
            if (id.includes('CSAModule03'))  return 'page-csa-m03';

            // ── Stack component — 43 kB lazy-loaded from Home ─────────────
            if (id.includes('/components/Stack'))  return 'comp-stack';

            return; // let Rollup decide for all other app files
          }

          // ── Vendor splits — ORDER MATTERS (most specific first) ────────

          // React core + runtime (must come before the misc catch-all)
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

          // Toast notifications — small but standalone
          if (id.includes('/node_modules/react-hot-toast/')) return 'vendor-toast';

          // MDX / remark / rehype pipeline — only loaded with walkthrough pages
          if (
            id.includes('/node_modules/remark') ||
            id.includes('/node_modules/rehype') ||
            id.includes('/node_modules/unified') ||
            id.includes('/node_modules/hast') ||
            id.includes('/node_modules/mdast') ||
            id.includes('/node_modules/micromark') ||
            id.includes('/node_modules/unist') ||
            id.includes('/node_modules/vfile') ||
            id.includes('/node_modules/@mdx-js/')
          ) return 'vendor-mdx';

          // Everything else in node_modules → shared chunk
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
