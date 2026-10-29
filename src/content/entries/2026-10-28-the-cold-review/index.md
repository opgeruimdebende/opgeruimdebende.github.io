---
title: The cold review
date: 2026-10-28
time: "00:53"
summary: A fresh Claude agent read all of Klaar!'s code and asked what could be simpler. The aftermath was larger than I expected.
kind: devlog
game: klaar
tags: [practice]
---
A few posts ago I admitted that the code behind Klaar! is not where I want it yet. A game that sits quietly on the side has to be light, reliable and never lose your save. So before anything goes public, we did a cold review.

A Claude agent that had never seen the code or its history read all of it and answered one question: what could be simpler or smaller without changing what the player gets? It came back with seventeen findings, each with evidence. The cold reviewer does not know why anything was done, so everything gets questioned.

Initially, I thought it would be a tidy-up. It turned out to be about eighteen lengthy steps, from the 24th to the 28th of October.

![A timeline from 24 to 28 October. The cold review starts it, followed by 18 steps as dots. Nine are orange and got a line in the changelog, such as the Hap clock, the font cut and Enter code on phones. Nine are grey and are under the hood, changing nothing a player sees.](./cold-review-journey.png)

To save battery, Klaar! stops drawing when nothing moves. But every screen had to tell the game when to start drawing again, in 43 separate places. It was like switching on every lamp by hand instead of installing one motion sensor. Now there is one rule: draw when the picture has changed. Resizing the window used to draw eleven to eighteen frames. Now it draws one.

The timed mode was quietly rewriting eight things on screen sixty times a second, even though a clock only changes once a second. Fixing that roughly halved how busy the game is while a Hap game runs.

The two font files held about eight thousand characters, mostly Japanese, because that is how they came. The game uses Latin letters, Dutch included, and eight symbols. Cutting the fonts down took the game's data from 4.7 MB to 0.7 MB, and every screen looked exactly the same.

The one that mattered most to me was the save. If a single value in your save looked wrong, the game threw the whole save away and started fresh. For a game that promises not to lose your progress, that is the wrong approach. Now it drops only the bad row and keeps the rest. To check, Claude damaged a realistic save in more than a thousand different ways. Every copy loaded.

The biggest job was the menus. All sixteen cards, Pause, Settings, About, Stats and the rest, were built in one file of about 2,500 lines, and some of them were placed by hand. That is where all those stacked little fixes came from. We took it apart step by step: first the frame every card shares, then each family of cards in its own file, then Godot's own layout boxes instead of measuring by hand. The rule was that you should see no change. So before and after every step the game took a picture of every card at four screen sizes, light and dark, 288 pictures, and compared them pixel by pixel. Nearly all came back identical.

Then there was the issue of entering a board code on the phone. The entire experience was broken: touching the field made the sheet jump down and back up, and a long press never offered Paste. After a few failed attempts, I decided to simply follow the rules of a person's device. Entering a code on the phone now happens in the browser's own text box. It looks plainer, but it works like on any website, and more than a hundred lines of code that fought the keyboard are gone.

This entire process was longer and more intensive than I thought it would be, and up to now it was the most difficult stretch of development. The cold review would not have been possible without working with AI. Frankly, I don't have the expertise to conduct a cold review, and even if I did, I would not have had the time to do the review, fix the bugs and playtest on top of it. Claude did the reviewing and checking, Cursor built each step, and I mostly observed and judged, as well as test things on an actual device.

Most of these improvements will go unnoticed by players, which was sort of the point. For me it showed how much AI can do to refine a coding project, and that a solo developer like me could not have done this work on my own.
