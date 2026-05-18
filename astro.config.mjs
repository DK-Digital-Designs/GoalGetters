import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://goalgettersfc.co.za',
  output: 'static',
  integrations: [sitemap()],
});
