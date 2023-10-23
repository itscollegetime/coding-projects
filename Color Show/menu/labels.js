const timer = document.getElementById("timer");
const display = document.getElementById("display");
const prompt1 = document.getElementById("prompt1");
const prompt2 = document.getElementById("prompt2");
const prompts = document.getElementById("prompts");
// const TARGET = new Date(2022, 5, 7, 9, 50);
const TARGET = new Date(Date.now() + 80 * 1000);
// const TARGET = new Date(Date.now() + 1 * 1000);
// const TARGET = new Date(Date.now() + 600 * 1000);

timer.innerHTML = "0D 00H 00M 00S";
display.innerHTML = "Left mouse click to start";
prompt1.innerHTML = "Press space to pause/unpause";
prompt2.innerHTML = "Left mouse click to start/cycle songs";

function initLabels() {
    timer.style.backgroundColor = null;
    timer.style.color = "aqua";
    timer.style.position = "absolute";
    timer.style.textAlign = "center";
    timer.style.fontFamily = "Major Mono Display";
    timer.style.fontSize = scaleFactor() / 25000 + 150;
    timer.style.letterSpacing = -25;
    timer.style.textShadow = "0px 0px 15px aqua";
    timer.style.userSelect = "none";
    timer.style.zIndex = 2;

    display.style.backgroundColor = null;
    display.style.color = "aquamarine";
    display.style.position = "absolute";
    display.style.textAlign = "center";
    display.style.fontFamily = "Quicksand";
    display.style.fontSize = scaleFactor() / 50000 + 50;
    display.style.textShadow = "0px 0px 15px white";
    display.style.opacity = 0;
    display.style.userSelect = "none";
    display.style.zIndex = 2;

    prompts.style.position = "absolute";
    prompts.style.width = innerWidth;
    prompts.style.display = "flex";
    [prompt1, prompt2].forEach(p => {
        p.style.backgroundColor = null;
        p.style.color = "cornsilk";
        p.style.flexGrow = 1;
        p.style.textAlign = "center";
        p.style.fontFamily = "Comfortaa";
        p.style.fontSize = scaleFactor() / 60000 + 40;
        p.style.textShadow = "0px 0px 5px white";
        p.style.userSelect = "none";
        p.style.zIndex = 2;
    });
}

var delta, passed, mark1min10, mark1min, mark17sec, mark15sec;
var day, hour, minute, second, print;
function updateLabels() {
    if (!passed) {
        delta = TARGET.getTime() - Date.now();
        if (delta <= 1000) {
            delta = 0;
            passed = true;
            toggleMenuCanvas();
            toggleShowCanvas();
            if (AUDIO_CONTEXT != null) startShow();
        }
        second = Math.floor(delta / 1000 % 60).toString().padStart(2, 0);
        minute = Math.floor(delta / 1000 / 60 % 60).toString().padStart(2, 0);
        hour = Math.floor(delta / 1000 / 60 / 60 % 24).toString().padStart(2, 0);
        day = Math.floor(delta / 1000 / 60 / 60 / 24);
        if (!mark15sec && delta < 60 * 1000 && parseInt(second) <= 15) {
            mark15sec = true;
        }
        if (!mark17sec && delta < 60 * 1000 && parseInt(second) <= 17) {
            mark17sec = true;
            if (parseInt(second) == 17) gsap.to(timer, {opacity: 0, duration: 2, onComplete: () => {
                gsap.to(timer, {opacity: 1, duration: 0});
            }});
            transformMenu();
            toggleDisplay(false, () => {});
        }
        if (mark15sec) print = `${second}s`;
        else print = `${day}d ${hour}h ${minute}m ${second}s`;
        timer.innerHTML = print;
        if (!mark1min && delta < 60 * 60 * 1000 && (parseInt(minute) < 1 || parseInt(minute) == 1 && parseInt(second) == 0)) {
            if (AUDIO_CONTEXT != null) {
                loadSpecific(E32019, 60 - (parseInt(minute) * 60 + (delta / 1000 % 60)) + 1.15);
                mark1min = true;
            }
        }
        if (!mark1min10 && delta < 60 * 60 * 1000 && (parseInt(minute) == 1 && parseInt(second) <= 10 || parseInt(minute) < 1)) {
            locked = true;
            mark1min10 = true;
            gsap.to(prompts, {opacity: 0, duration: 2});
            setDisplayText((AUDIO_CONTEXT == null)? "Click left mouse button" : "Entering terminal countdown");
            if (playing != null && !paused) unload(() => {});
        }
    }
    recenter();
}

function recenter() {
    WIDTH = innerWidth;
    HEIGHT = innerHeight;

    bannerStart = (HEIGHT - timer.offsetHeight) / 2;
    timer.style.marginTop = bannerStart;
    timer.style.marginLeft = (WIDTH - timer.offsetWidth) / 2;
    bannerStart += timer.offsetHeight / 15;

    display.style.marginTop = bannerStart + timer.offsetHeight;
    display.style.marginLeft = (WIDTH - display.offsetWidth) / 2;

    prompts.style.marginTop = bannerStart - prompt1.offsetHeight;
}

function toggleDisplay(show, onComplete) {
    gsap.to(display.style, {opacity: (show)? 1 : 0, duration: 1, onComplete: onComplete});
}

const SET_DESCRIPTION = (audio) => {
    SET_DISPLAY("Now playing: " + getDescription(audio));
};
const SET_DISPLAY = (text) => {
    display.innerHTML = text;
    recenter();
    toggleDisplay(true, () => {});
};
function setDisplay(audio) {
    if (display.style.opacity == 0) SET_DESCRIPTION(audio);
    else toggleDisplay(false, () => SET_DESCRIPTION(audio));
}
function setDisplayText(text) {
    if (text == display.innerHTML) return;
    if (display.style.opacity == 0) SET_DISPLAY(text);
    else toggleDisplay(false, () => SET_DISPLAY(text));
}

function togglePause(pause) {
    if (!pause) setDisplay(playing);
    else {
        toggleDisplay(false, () => {
            display.innerHTML = "Paused - press space to resume";
        recenter();
            toggleDisplay(true, () => {}); 
        })
    }
}