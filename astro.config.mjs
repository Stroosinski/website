// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// Docelowa domena. Zmienimy/potwierdzimy przy podpinaniu stolmar.co.
const SITE = 'https://stolmar.co';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // Statyczny build (SSG) — pełny HTML dla SEO/GEO, zero zbędnego JS.
  output: 'static',
  integrations: [
    react(),
    sitemap({
      i18n: {
        defaultLocale: 'pl',
        locales: { pl: 'pl-PL', en: 'en-US' },
      },
    }),
  ],
  build: {
    // Nazwane pliki CSS/JS zamiast hashy-śmieci — łatwiej debugować.
    assets: '_astro',
  },
});
