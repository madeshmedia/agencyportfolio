import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://docs.astro.build/en/guides/configuring-astro/
export default defineConfig({
  site: 'https://madeshmedialab.netlify.app',
  integrations: [sitemap()],
});
