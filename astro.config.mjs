// The Opgeruimde Bende archive, served from the organisation's Pages site.
// Files in public/ (the game builds and the post embeds) are copied to the site unchanged.
import { defineConfig } from 'astro/config';
import rehypeFigures from './src/lib/rehype-figures.mjs';

export default defineConfig({
  site: 'https://opgeruimdebende.github.io',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  markdown: { rehypePlugins: [rehypeFigures] },
});
