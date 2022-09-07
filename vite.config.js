import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      manifest: {
        name: 'hyōcalc',
        short_name: 'hyōcalc',
        start_url: '/',
        icons: [
          {
            src: './icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: './icons/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: './icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: './icons/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        orientation: 'portrait',
        categories: ['education'],
        description: 'A simple scientific calculator',
        screenshots: [
          {
            src: './images/screenshot.png',
            sizes: '1270x610',
            platform: 'wide',
            label: "A screenshot of hyōcalc's interface",
          },
          {
            src: './images/mobile.png',
            sizes: '360x697',
            platform: 'narrow',
            label: "A screenshot of hyōcalc's interface on mobile",
          },
        ],
      },
    }),
    react(),
  ],
});
