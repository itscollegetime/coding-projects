let mouseX = null;
let mouseY = null;
addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
addEventListener('mouseover', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});
addEventListener('mouseout', e => {
    mouseX = null;
    mouseY = null;
})
addEventListener('keydown', e => {
    if (e.key == "`") {
        location.reload();
    }
})

function init() {
    initMenuCanvas();
    initShowCanvas();
}

function animate() { 
    requestAnimationFrame(animate);
    updateMenuCanvas();
    updateShowCanvas();
}

init();
animate();