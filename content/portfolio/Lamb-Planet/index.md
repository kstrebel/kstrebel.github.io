+++
title = "Lamb Planet"
date = 2018-05-15
category = "Wwise"
+++

<div style="text-align:center;"><iframe width="560" height="315" src="https://www.youtube.com/embed/iTt_W-mqirY" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

Lamb Planet is a 3D open world sailing game where the player travels around to different islands and helps islanders with their errands.  I worked on this my junior year and did of all recording, composition, editing, and Wwise implementation for the game.  I also worked with programmers to add the sound events to the game's code.

## SFX

For this game, I wanted to keep the diagetic sounds realistic.  This game is meant to be relaxing, so it was important that the player felt familiar with their surroundings.  Although it does sound alright, our team came across problems implementing more advanced boat sounds and island ambience.  In the shipped version, the boat's sounds only react to the boat's speed and if the player is making a tight turn.  With more time, I would have loved to add sounds for the boat approaching and hitting the shore as well as a more advanced turning system, although what is in the game does a decent job.

As for the UI sounds, I wanted them to be playful and light.  Button hover and select sounds are different pitched woodblocks, and the pause/unpause sounds are a mix of a synth, a water splash, and a clapping sound so the player felt a little familiar with the sound, but also that it felt a bit detatched from the game's diagetic sounds.

## Dialogue

Originally, we had hoped to build a system that would read the vowels of what the character was saying and call syllables of those vowels.  This would make certain repeated phrases memorable to the player, such as "hello, lamb" or "thank you."  We soon realized that would take a lot more time than we planned, so we switched to recording each line as its own .wav file.  We asked our voice actors to say random consonant + vowel syllables that were about the same length and inflection of the printed line.  This resulted in 50-70 lines for each of the three characters.

At the recording session, I recorded two long files: of the voice actor and one of my talkback mic.  Using Cubase, I cut up and sorted each take by line, then chose the best of those.  I put those audio regions on another track, edited the beginning and end of each file, and put effects such as a compressor or a de-esser on the whole track.  Then, I selected all the cleaned-up takes and bounced regions as files with the channel strip settings to get the .wav files I would put into Wwise. It turned out to be easiest for my overworked programmers to call each line individually, so each .wav file was its own event.  I named them "Character_Quest_StageOfQuest_LineNumber" so they could easily put the event's string together or change it in the existing quest system. 

## Music

I wanted Lamb Planet's instrumentation to match the game's realistic sound effects, so I made sure not to use any synths or odd instruments in the score.  I also wanted the music to feel more intimate and low-key than a full orchestra, so each piece only uses three to five voices, most of them being solo instruments.  Although the game changed quite a bit throughout its development, the piece that plays on the main menu and credits was the first piece I wrote for Lamb Planet, and I'm glad it's in the finished game.  All of its instruments, guitar, alto sax, flute, and clave are live performances of myself and some of my classmates.


This is where the in-depth descrption of Lamb Planet will go, ideally by May 13.

In the meantime, here is some of the music I worked on that didn't make it into the final game.

<table>
<td>
<div class="soundcloud-responsive">
<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/417337656&color=%2340c4ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
</div>
</td>
<td>
<div class="soundcloud-responsive">
<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/417328065&color=%2340c4ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
</div>
</td>
<td>
<div class="soundcloud-responsive">
<iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/332718759&color=%2340c4ff&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
</div>
</td>
</table>