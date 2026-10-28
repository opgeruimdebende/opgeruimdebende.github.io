# Working in this repository

This is the Opgeruimde Bende archive, an Astro site served at https://opgeruimdebende.github.io. Every push to `main` is built and deployed by `.github/workflows/deploy.yml`. Pushing to `main` is publishing: do it only after the owner says "publish", after he has seen a preview. Any project with push access and related work may publish this way; two conversations never write here at the same time. One exception: a game's changelog is written and pushed by that game's coding lead as part of closing a release; it needs no "publish" and no preview. When it goes up is set in that game's lead skill (Klaar!: `klaar-lead`, Closing a release). If the owner then does not push that build, the lead reverts the entry.

The look comes from the design system "Opgeruimde Bende" (a Claude design system artifact). The site's copy of its tokens is `src/styles/tokens.css`; patterns are in `src/styles/archive.css`. Change the design system first, then the site.

## Where things go

| What | Where | Served at |
| --- | --- | --- |
| An entry (devlog, note, build, statement) | `src/content/entries/<id>/index.md`, images beside it | `/entries/<id>/` |
| A small interactive embed for an entry | `public/entries/<id>/<name>.html` | `/entries/<id>/<name>.html` |
| A game's changelog | `src/content/changelogs/<game>.md` | `/changelog/<game>/` |
| A game (name, line, shelf, label) | `src/data/games.json` | the cartridges on `/` and `/play/` |
| A cartridge label (the game's own art, 288×240) | `public/labels/<game>.png` | |
| A game's web build | `public/play/<game>/` | `/play/<game>/` |
| Tags | `src/data/tags.json` (a tag must be listed before an entry uses it) | `/tags/<tag>/` |

Files in `public/` are copied to the site byte for byte. Anything at the repository root outside `src/` and `public/` is not served.

**`public/play/` belongs to the owner's local Godot export.** It is pushed from his computer and from nowhere else. Never edit, move, delete or reformat anything in it from the cloud.

**Old addresses stay working.** `public/view.html` forwards the old reader's links (`?post=<id>`, `?page=klaar-changelog`), which released Klaar! builds still use. `public/posts/<id>/` holds redirect stubs for the old post addresses. Never remove these.

## Entry fields

Checked by `src/content.config.ts`; the build stops on a mistake.

- Always: `title`, `date`, `summary`, `kind` (`devlog`, `note`, `build` or `statement`).
- When they apply: `game` (a key of `games.json`), `tags` (keys of `tags.json`), `updated`, `status` (`working` or `settled`, for notes and findings), `supersedes`, `href` (builds: the folder under `/play/`), `image` and `imageAlt`, `lang` (default `en`).
- The folder name is the entry's address. Never rename a published one.

## Recipes

**Add a devlog post**: a new folder `src/content/entries/<YYYY-MM-DD>-<slug>/` with `index.md` (`kind: devlog`, `game` if it is about one). Images beside it, linked as `![What it shows](./picture.png)`; a caption goes in the title: `![What it shows](./picture.png "Caption")`. An interactive embed goes in `public/entries/<id>/` and is placed with `<iframe src="/entries/<id>/<name>.html" title="…" width="100%" height="…" loading="lazy" class="embed"></iframe>`.

**Update a changelog**: edit `src/content/changelogs/<game>.md`, newest day on top, and set `date` to the day of the newest change.

**Add a game**: an entry in `src/data/games.json` with a free shelf colour (`oranje`, `navy`, `maroon`, `polder`), its label art in `public/labels/`, and its build in `public/play/<game>/` (pushed by the owner). Unannounced games never get a cartridge.

## Build and check

- Node 22.23.4 or newer: `npm ci`, then `npm run build`. The build must pass. In a workspace with an older Node, run it through `npx -y node@24`.
- When layout, styles or an embed changed, look at the changed pages at phone width (375px): no sideways scroll, text readable. A plain entry or changelog needs no look; the build checks its fields.
- Before publishing, confirm: nothing from an unchecked sparring brief, nothing about an unannounced game, no art, music, text or code of a game in publishing development (now: Klaar!) ships as a file under `public/` or beside an entry, embeds and demos included, except the build in `public/play/` and the cartridge label; demos use placeholder or free assets, and shared code is only what the owner chose to share. Add a game's name here when it enters a publishing trajectory.
- After pushing to `main`, wait for the Action to finish, open the live page and send the owner the link. The sandbox shell gets 403 from the site: check the page with a web fetch, adding a `?v=` query if the first fetch shows the old page (the CDN lags a minute). Roll back with `git revert`, never a force push.
