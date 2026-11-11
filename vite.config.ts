import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

/**
 * Précharge les polices critiques du hero (texte, mono, accent serif) :
 * elles partent en parallèle du JavaScript au lieu d'attendre le CSS.
 */
function preloadCriticalFonts(): Plugin {
  const critical = [
    /assets\/geist-latin-wght-normal-[\w-]+\.woff2$/,
    /assets\/geist-mono-latin-wght-normal-[\w-]+\.woff2$/,
    /assets\/instrument-serif-latin-400-italic-[\w-]+\.woff2$/,
  ];
  return {
    name: 'preload-critical-fonts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const files = Object.keys(ctx.bundle ?? {}).filter((file) => critical.some((re) => re.test(file)));
        return {
          html,
          tags: files.map((file) => ({
            tag: 'link',
            attrs: {rel: 'preload', as: 'font', type: 'font/woff2', href: `/${file}`, crossorigin: ''},
            injectTo: 'head' as const,
          })),
        };
      },
    },
  };
}

/**
 * Prérend chaque page en HTML à la fin du build client (voir scripts/prerender.mjs).
 * En plugin plutôt qu'en script npm : Vercel lance `vite build` directement.
 */
function prerenderPages(): Plugin {
  return {
    name: 'prerender-pages',
    apply: (_config, env) => env.command === 'build' && !env.isSsrBuild && !process.env.PRERENDERING,
    async closeBundle() {
      const {prerender} = await import('./scripts/prerender.mjs');
      await prerender();
    },
  };
}

export default defineConfig(({isSsrBuild}) => {
  return {
    plugins: [react(), tailwindcss(), preloadCriticalFonts(), prerenderPages()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Le chunk Three.js (~145 Ko gzip) est chargé à part, quand le navigateur est libre
      chunkSizeWarningLimit: 1000,
      rollupOptions: isSsrBuild ? undefined : {
        output: {
          // Isole les dépendances stables (React, routing, animation) dans leurs
          // propres chunks : elles changent rarement, donc restent en cache
          // navigateur d'un déploiement à l'autre au lieu d'être réinvalidées
          // à chaque modification du code applicatif.
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('react-dom') || id.includes('/react/') || id.includes('react-router')) return 'vendor-react';
            if (id.includes('motion')) return 'vendor-motion';
            if (id.includes('lenis')) return 'vendor-lenis';
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
