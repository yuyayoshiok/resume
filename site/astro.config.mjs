import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yuyayoshiok.github.io',
  base: '/resume',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
});
