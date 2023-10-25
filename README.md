# Coding Projects

Here are most of the projects I did that mainly involved coding. A lot of the projects here were made to solve specific problems I faced, while others are just things that I found interesting and wanted to try out myself.

Many of the projects here are connected to one another and to projects in some of my other repositories. Some projects here also have interactive demos so you can play with them yourself. The related links will all be included.

## Canvas Color Show

This was probably one of my most complicated web based projects. My dad's birthday was coming up and at that time, I was really inspired by Microsoft Flight Simulator 2020's Trailer Music. I decided to combine these two and create a sort of interactive color show as a birthday gift. 

This project incorporated the Web Audio API to generate the visualizers and image masking at the end to display any custom ending text. I followed many, many tutorials to get this project working and I can not thank all the wonderful educational YouTubers for making these coding tutorials enough. Thank you!!

|<img src="supp/cs_00.png">|<img src="supp/cs_04.png">|<img src="supp/cs_01.png">|
|-|-|-|
|<img src="supp/cs_02.png">|<img src="supp/cs_03.png">|<img src="supp/cs_05.png">|

You can watch the show locally at: [**itscollegetime.github.io/coding-projects/ColorShow**](https://itscollegetime.github.io/coding-projects/ColorShow/)
<br>
You can also watch a recorded video on YouTube at: [youtube.com/watch?v=alWz4vffrAs](https://www.youtube.com/watch?v=alWz4vffrAs)

|[<img src="https://media.giphy.com/media/EHqA31Oc60kzunPJZJ/giphy.gif">](https://itscollegetime.github.io/coding-projects/ColorShow/)|[<img src="https://media.giphy.com/media/G3wuJgm5w93hu2Iern/giphy.gif">](https://www.youtube.com/watch?v=alWz4vffrAs)|
|-|-|

Music: [Fishing Move Inc. - E3 2021 Trailer Music | MSFS 2020 Trailer Score](https://youtu.be/1VNDn7ru2lY?si=n6DZshKkYxZK65BD)

## Canvas New Year Fireworks

This project was really the culmination of many smaller projects. I come from Taiwan and each year during New Year, I make something that resembles the firework show that happens at the iconic Taipei 101. After playing around with making fireworks in HTML Canvas, I decided to combine it with the music syncing experiences gained from making Color Show to make a special firework show of my own in the browser.

|<img src="supp/cnyf_02.png">|<img src="supp/cnyf_03.png">|<img src="supp/cnyf_04.png">|
|-|-|-|

You can watch the show locally at: [**itscollegetime.github.io/coding-projects/NewYearCanvas**](https://itscollegetime.github.io/coding-projects/NewYearCanvas/)
<br>You can also watch a recorded video on YouTube at: [youtube.com/watch?v=cn_ZovVaCFk](https://www.youtube.com/watch?v=cn_ZovVaCFk)

|[<img src="https://media.giphy.com/media/tN2JsO20goypdKMPbG/giphy.gif">](https://itscollegetime.github.io/coding-projects/NewYearCanvas/)|[<img src="https://media.giphy.com/media/I8FRnwrNT6yCc4HdOX/giphy.gif">](https://www.youtube.com/watch?v=cn_ZovVaCFk)|
|-|-|

Music: [Fishing Move Inc. - Pre Order Trailer Music | MSFS 2020 Trailer Score](https://youtu.be/1LIC685WZxI?si=ZS04sWN7ICEp3FZp)

### Canvas Fireworks

This was an exploratory project that mainly focused on particles and related effects. This project was inspired by Canvas Shooter (see below).

You can try Canvas Fireworks at: [**itscollegetime.github.io/coding-projects/CanvasFireworks**](https://itscollegetime.github.io/coding-projects/CanvasFireworks/)
<br>
You can also watch a recorded demo on YouTube: [youtube.com/watch?v=6WCUybQo0S0](https://www.youtube.com/watch?v=6WCUybQo0S0)

|[<img src="https://media.giphy.com/media/Dn1ZC12xCP9OZDvef2/giphy.gif">](https://itscollegetime.github.io/coding-projects/CanvasFireworks/)|[<img src="https://media.giphy.com/media/7k9lTitTPiz02ig7OF/giphy.gif">](https://www.youtube.com/watch?v=6WCUybQo0S0)|
|-|-|

### Canvas Shooter

This project was made following a [tutorial video by Chirs Courses on YouTube](https://youtu.be/eI9idPTT0c4?si=KEkh28LMArXA5l3f). 

You can try Canvas Shooter at: [**itscollegetime.github.io/coding-projects/CanvasGame**](https://itscollegetime.github.io/coding-projects/CanvasGame/)
<br>
You can also watch a recorded demo on YouTube at: [youtube.com/watch?v=cMOdi7YpvIA](https://www.youtube.com/watch?v=cMOdi7YpvIA)

|[<img src="https://media.giphy.com/media/KMc3DacbR6rW1cEGZK/giphy.gif">](https://itscollegetime.github.io/coding-projects/CanvasShooter/)|[<img src="https://media.giphy.com/media/sihV9mnZNkeGg2hmbs/giphy.gif">](https://www.youtube.com/watch?v=cMOdi7YpvIA)|
|-|-|

## Elastic Collision Simulator

As you can probably tell alreayd, I have a lot of projects involving particles. For this project, I decided to make the particles behave more realisticly and try to simulate collision physics between them. Particle colors represent kinetic energy with red being the highest and blue being the lowest.

The kinetic energy formula and conservation of energy were applied under the assumption of lostless energy transfer between collisions and used to calculate resulting velocities of each particle.

You can watch full video demos on YouTube at:
- [youtube.com/watch?v=91I6AwLHc_w](https://www.youtube.com/watch?v=91I6AwLHc_w)
- [youtube.com/watch?v=6KYbqw02PFk](https://www.youtube.com/watch?v=6KYbqw02PFk)

|[<img src="https://media.giphy.com/media/1zaINoIokF2uKBzz0f/giphy.gif">](https://www.youtube.com/watch?v=91I6AwLHc_w)|[<img src="https://media.giphy.com/media/FNdg1KLsHxTGjGBflJ/giphy.gif">](https://www.youtube.com/watch?v=6KYbqw02PFk)|
|-|-|

## Particle Playground

For this project, I decided to built an entirely customizable enviroment for users to play around with particles. Java and JavaFX wre used to create the GUI and simulate particle behavior. Collisions between particles were ignored because of their computational intensity, but collisions with the walls were implemented. Users could customize all kinds of properties about the enviroment, including gravity, environment density, timescale, particle velocity, spread, color and much more... This project was really fun to do and seeing all the particles move semi-realistically was really satisfying.

You can watch full video demos on YouTube at:
- [youtube.com/watch?v=y87NSGMbfYU](https://www.youtube.com/watch?v=y87NSGMbfYU)
- [youtube.com/watch?v=SkT9fXMkUPo](https://www.youtube.com/watch?v=SkT9fXMkUPo)

|[<img src="https://media.giphy.com/media/TyVDjtGo3vHnWRzoSg/giphy.gif">](https://www.youtube.com/watch?v=y87NSGMbfYU)|[<img src="https://media.giphy.com/media/rQZ9Ce9FLP0bgFBW7t/giphy.gif">](https://www.youtube.com/watch?v=SkT9fXMkUPo)|
|-|-|

## Perlin Flow Field

After watching a [YouTube video by Chris Courses](https://www.youtube.com/watch?v=na7LuZsW2UM) on flow fields, I was really astonished. I never knew code could be used to generate such beautiful art, and I had to try it out myself.

A Perlin noise grid was randomly generated and that was used to determine the velocity vector of each particle. By varrying particle speed, size, color, opacity, and animating the guiding vectors, many different effects can be achieved. This was the project that allowed me to attend and present a poster at the MIT URTC 2022 Conference. [(See my URTC-2022 repository)](https://github.com/itscollegetime/URTC-2022)

|<img src="supp/PFF_00.jpg">|<img src="supp/PFF_01.jpg">|
|-|-|
|<img src="supp/PFF_02.jpg">|<img src="supp/PFF_03.jpg">|

You can watch a full video demo on YouTube at: [youtube.com/watch?v=3mIsK_C0E6A](https://www.youtube.com/watch?v=3mIsK_C0E6A)

|[<img src="https://media.giphy.com/media/kMUPSJvqY78FTASPWH/giphy.gif">](https://www.youtube.com/watch?v=3mIsK_C0E6A)|[<img src="https://media.giphy.com/media/gHOQzE2f39OpyGRcKa/giphy.gif">](https://www.youtube.com/watch?v=3mIsK_C0E6A)|
|-|-|