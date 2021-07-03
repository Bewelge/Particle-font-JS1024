
# Particle font
Entry for the 2021 [JS1024](https://js1024.fun) contest.

"Create a javascript/shader program that has 1024 bytes or less and make it do something cool."


# [Demo](https://bewelge.github.io/Particle-font-JS1024/)

![sampleScreenshot](screenshot.png)


I played around with this technique of making a "particle-font" a couple of years ago. It works by first drawing some text on canvas and then finding all pixels that are filled.  I then scale the x,y coordinates of those pixels to get the position for each particle. The rest is a really basic "physics" system where dots are pushed away from the mouse and drawn towards their original position. 

