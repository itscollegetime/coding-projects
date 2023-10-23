const menuCanvas = document.getElementById("menu");
const menuC = menuCanvas.getContext("2d");

menuCanvas.width = WIDTH;
menuCanvas.height = HEIGHT;
menuCanvas.style.position = "absolute";
menuCanvas.style.zIndex = 0;

const MENU_BASE_OPACITY = 0.5;

function initMenuCanvas() {
    initLabels();
    initMenu();
    initVisualizer();
}

let menuBackground = `rgb(0, 0, 0, ${MENU_BASE_OPACITY})`;
function updateMenuCanvas() {
    if (menuC.globalAlpha == 0) return;
    menuC.save();
    menuC.globalAlpha = 1;
    menuC.fillStyle = menuBackground;
    menuC.fillRect(0, 0, WIDTH, HEIGHT);
    menuC.restore();
    updateMenu(menuC);
    updateLabels();
    updateVisualizer(menuC);
}

let menuFading = false;
function toggleMenuCanvas() {
    if (menuFading) return;
    menuFading = true;
    if (menuC.globalAlpha == 0) {
        gsap.to(menuC, {globalAlpha: 1, duration: 1, onComplete: () => menuFading = false});
        gsap.to(timer, {opacity: 1, duration: 1});
    } else {
        gsap.to(menuC, {globalAlpha: 0, duration: 1, onComplete: () => menuFading = false});
        gsap.to(timer, {opacity: 0, duration: 1});
    }
}