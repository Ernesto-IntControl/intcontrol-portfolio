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

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), preloadCriticalFonts()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Le chunk Three.js (~145 Ko gzip) est chargé à part, quand le navigateur est libre
      chunkSizeWarningLimit: 1000,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
