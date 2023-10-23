const showCanvas = document.getElementById("show");
const showC = showCanvas.getContext("2d");

showCanvas.width = WIDTH;
showCanvas.height = HEIGHT;
showCanvas.style.position = "absolute";
showCanvas.style.zIndex = 1;

const SHOW_BASE_OPACITY = 0.3;

function initShowCanvas() {
    showC.globalAlpha = 0;
    initShowVisualizer();
    initTextParticles(showC);
}

let s1 = {r: 0, g: 0, b: 0}, s2 = {r: 0, g: 0, b: 0};
let showBackground = {s1: 1, s2: 1};

// s2.r = 255;
// s2.g = 0;
// s2.b = 0;
// s1.r = 0;
// s1.g = 0;
// s1.b = 0;
// showBackground.s1 = 0;

let showGradient;
function updateShowCanvas() {
    if (showC.globalAlpha == 0) return;
    showC.save();
    showGradient = showC.createLinearGradient(0, HEIGHT, 0, 0);
    showGradient.addColorStop(showBackground.s1, `rgb(${s1.r}, ${s1.g}, ${s1.b})`);
    showGradient.addColorStop(showBackground.s2, `rgb(${s2.r}, ${s2.g}, ${s2.b})`);
    showC.fillStyle = showGradient;
    showC.fillRect(0, 0, WIDTH, HEIGHT);
    showC.restore();
    updateShowVisualizer();
    drawShowVisualizer(showC, 1);
    updateShowParticles(showC);
    drawShowVisualizer(showC, 0);
    updateTextParticles(showC);
}

let fading = false;
function toggleShowCanvas() {
    if (fading) return;
    fading = true;
    if (showC.globalAlpha == 0) {
        gsap.to(showC, {globalAlpha: 1, duration: 1, onComplete: () => {
            fading = false;
            if (AUDIO_CONTEXT != null) startShow();
        }});
    } else {
        gsap.to(showC, {globalAlpha: 0, duration: 1, onComplete: () => fading = false});
    }
}

let started = false;
function startShow() {
    if (started) return;
    started = true;
    loadShowVisualizer();
    startShowScheduler();
}