// Two collections: entries (devlog, note, build, statement) and changelogs (one per game).
// Fields follow the SPEC, section "The archive".
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import tags from './data/tags.json';
import games from './data/games.json';

const tagIds = Object.keys(tags) as [string, ...string[]];
const gameIds = Object.keys(games) as [string, ...string[]];

const entries = defineCollection({
  // One folder per entry: src/content/entries/<id>/index.md, images beside it.
  // The folder name is the entry's address: /entries/<id>/. Never rename a published one.
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/entries',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z
    .object({
      title: z.string(),
      date: z.coerce.date(),
      // Optional time of day (HH:MM). Never shown: it only orders posts that share a date.
      time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
      updated: z.coerce.date().optional(),
      summary: z.string(),
      kind: z.enum(['devlog', 'note', 'build', 'statement']),
      tags: z.array(z.enum(tagIds)).default([]),
      game: z.enum(gameIds).optional(),
      lang: z.string().default('en'),
      status: z.enum(['working', 'settled']).optional(),
      supersedes: z.string().optional(),
      // Builds: the address of the playable folder under /play/.
      href: z.string().optional(),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
    })
    .refine((e) => e.kind !== 'build' || e.href, { message: 'A build entry needs href, the address of its folder under /play/.' })
    .refine((e) => !e.image || e.imageAlt, { message: 'An image needs imageAlt, a description of what it shows.' }),
});

const changelogs = defineCollection({
  // One file per game: src/content/changelogs/<game>.md, served at /changelog/<game>/.
  loader: glob({ pattern: '*.md', base: './src/content/changelogs' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    game: z.enum(gameIds),
  }),
});

export const collections = { entries, changelogs };
