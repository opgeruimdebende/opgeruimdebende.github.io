import { getCollection, type CollectionEntry } from 'astro:content';
import tags from '../data/tags.json';
import games from '../data/games.json';

export type Entry = CollectionEntry<'entries'>;
export type Game = { name: string; line: string; state: string; shelf: string; play: string; label?: string; labelAlt?: string };
export const kinds = { devlog: 'Devlog', note: 'Note', build: 'Build', statement: 'Statement' } as const;
export const tagList = tags as Record<string, { label: string; about: string }>;
export const gameList = games as Record<string, Game>;
export const tagLabel = (id: string) => tagList[id]?.label ?? id;

/** All entries, newest first; same date sorts by the hidden `time`, then by title. */
export async function allEntries(): Promise<Entry[]> {
  return (await getCollection('entries')).sort(
    (a, b) =>
      b.data.date.valueOf() - a.data.date.valueOf() ||
      (b.data.time ?? '').localeCompare(a.data.time ?? '') ||
      a.data.title.localeCompare(b.data.title),
  );
}

export const entryUrl = (e: Entry) => `/entries/${e.id}/`;
export const fmtDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase();
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);
