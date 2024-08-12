import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.ts',
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'SpendSmart',
      short_name: 'SpendSmart',
      description: 'controle suas finanças de forma inteligente com o spend smart',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'logo42x42.png',
          sizes: '42x42',
          type: 'image/png',
        },
        {
          src: 'logo72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: 'logo96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: 'logo144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'logo512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'logo1024x1024.png',
          sizes: '1024x1024',
          type: 'image/png',
          purpose: 'maskable'
        },
      ]
    },

    injectManifest: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    },

    devOptions: {
      enabled: true,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
  resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@page": path.resolve(__dirname, "./src/page"),
			"@enums": path.resolve(__dirname, "./src/constants/enums/")
		},
	},
})