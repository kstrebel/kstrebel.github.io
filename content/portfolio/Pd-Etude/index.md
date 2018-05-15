+++
title = "Pd Etude"
date = 2018-05-07
category = "Pure Data"
+++


<div style="text-align:center;"><iframe width="560" height="315" src="https://www.youtube.com/embed/9iGNj3-nnAc?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>

In this project, I wanted to focus on what makes a sequence of notes into a melody.  One thing I did was make the leap between notes less random.  I did this by first generating a random number between zero (unison) and the biggestJump number to determine how many half steps up or down the next note will be.  To make it less random, I have it check if the generated number is zero or the preferredLeap number.  If it isn't, I re-generate the number and use that.  This makes the probability of a zero or a preferred number (2<i>x</i> - 2) / (<i>x</i>^2) and the probability of one of the other numbers the opposite, or (<i>x</i>^2 - 2<i>x</i> + 2) / (<i>x</i>^2).

The other part of this project is the pauses patch, which focuses on how rhythm can give a melodic line character.  I treat the metroSpeed as subdivisions of a beat and will only send the first <i>x</i> notes through.  For example, I can send the first two sixteenth notes through and have the last two be rests.  I can also specify what number of the subdivision to start on, which allows me to make a "swing" rhythm by resting on the second triplet instead of the third.

Another thing I did was keep the melody from going out of a defined MIDI range using highestAllowed and lowestAllowed, to be able to explore melodies in different ranges.

##### Section A

To make this section feel familiar but a little strange, I made the biggestJump six half steps, or a tritone.  I also made the preferredLeap two half steps, a major second.  Even though the melody might make the unplesant jump of a tritone, the generated line still feels okay because a major second is such a common interval.  To make it feel light and airy, I set the range to be between MIDI note 80 (A&#x266d;5) and 108 (C8).  To have it feel light and relaxed, I set the metroSpeed to 1440ms so it would sound like it was playing whole notes.  I also didn't use the pauses function to keep the feel consistent.