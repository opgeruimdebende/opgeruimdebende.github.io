---
title: The finished piece
date: 2026-11-01
time: "16:10"
summary: A Klaar! replay now plays your tune back, misses and all.
kind: devlog
game: klaar
tags: [sound]
---

For a while I had a hunch that sharing Klaar!'s replay would shine: people could watch and listen to how a board was solved, and now they can.

After you finish a board, you can watch its replay. And when you watch this replay, you hear your game again. Every clear plays its note, your misses and rewinds are in it, and a cleared board still ends on the same chords. In Hap the beat plays underneath; in Wa the soft pad follows the chords.

I've been a musician all my life, so I know the pride of sharing music. In Klaar!, solving the board is the act of composing it. Your moves are the sheet music, and Klaar! is the instrument that plays it back. The replay is the finished piece, and it's yours to share.

On the technical side, to keep a replay easy to follow, it kept every move at least 450 milliseconds apart. That looks fine, but every quick move pushed everything after it a little later, and the tune slid off the beat. We might have to revisit this decision in the future, but for now, the replay respects the player's own timing: a Hap replay now plays your moves exactly as quickly as you made them, at double speed. The beat stays at 128 beats a minute, so the chords change every bar instead of every two.

<iframe src="/entries/2026-11-01-the-finished-piece/hear-it-twice.html" title="One of my Hap games, a 60-second board cleared with a second to spare, heard as I played it and as the replay plays it" width="100%" height="600" loading="lazy" class="embed"></iframe>

To some people this might sound a bit chaotic, and I don't blame anyone. For me it was never about whether it's in tune or on the beat; that freedom is what let the misses and the rewinds in. It takes me back to learning the piano as a kid. Nothing for a recital, maybe nothing to show off. But among friends and family, maybe it's something you'd actually like to show off, even if it sounds slightly odd.

My job is to simply keep it pleasing to play and listen to. Unfortunately, I'm the worst person to judge, because I am quite attached to this design. For now, I'm happy that Klaar! asks nothing more of you than solving a puzzle.
