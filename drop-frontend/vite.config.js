import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'DROP — Every Drop Matters',
        short_name: 'DROP',
        theme_color: '#181411',
        background_color: '#f6f1ea',
        display: 'standalone',
        icons: [],
      },
    }),
  ],
});
