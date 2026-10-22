import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { allEntries, entryUrl, kinds } from '../lib/entries';

export async function GET(context: APIContext) {
  const entries = await allEntries();
  return rss({
    title: 'Opgeruimde Bende',
    description: 'Devlog, notes and builds from Opgeruimde Bende, a game research practice by Bron van Doen.',
    site: context.site!,
    items: entries.map((e) => ({
      title: e.data.title,
      pubDate: e.data.date,
      description: e.data.summary,
      link: entryUrl(e),
      categories: [kinds[e.data.kind], ...e.data.tags],
    })),
    customData: '<language>en</language>',
  });
}
