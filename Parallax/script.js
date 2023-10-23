const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const FACTOR = 10;
const CATCH_FACTOR = 20;
const SIZE_FACTOR = 2;
const POW = 3;
const BUFFER = 250;
class Star {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.appliedX = x;
        this.appliedY = y;
        this.prevX = x;
        this.prevY = y;
        this.dynamicX = x;
        this.dynamicY = y;
        this.size = size;
        this.color = `hsl(178, 100%, ${50 + (this.size - 0.5) / 1 * 50}%)`;
    }
    update(deltaX, deltaY) {
        this.prevX = this.dynamicX;
        this.prevY = this.dynamicY;
        if (deltaX != null) this.appliedX += deltaX / FACTOR * Math.pow(this.size, POW);
        if (deltaY != null) this.appliedY += deltaY / FACTOR * Math.pow(this.size, POW);
        this.dynamicX += (this.appliedX - this.dynamicX) / CATCH_FACTOR;
        this.dynamicY += (this.appliedY - this.dynamicY) / CATCH_FACTOR;
        if (this.dynamicX < -BUFFER) {
            this.dynamicX = canvas.width + BUFFER;
            this.prevX = this.dynamicX;
            this.appliedX += canvas.width + 2 * BUFFER;
        }
        if (this.dynamicX > canvas.width + BUFFER) {
            this.dynamicX = -BUFFER;
            this.prevX = this.dynamicX;
            this.appliedX -= canvas.width + 2 * BUFFER;
        }
        if (this.dynamicY < -BUFFER) {
            this.dynamicY = canvas.height + BUFFER;
            this.prevY = this.dynamicY;
            this.appliedY += canvas.height + 2 * BUFFER;
        }
        if (this.dynamicY > canvas.height + BUFFER) {
            this.dynamicY = -BUFFER;
            this.prevY = this.dynamicY;
            this.appliedY -= canvas.height + 2 * BUFFER;
        }
    }
    dot() {
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.dynamicX, this.dynamicY, this.size / SIZE_FACTOR, 0, Math.PI * 2);
        c.fill();
    }
    draw() {
        c.strokeStyle = this.color;
        c.lineWidth = this.size;
        c.beginPath();
        c.moveTo(this.prevX, this.prevY);
        c.lineTo(this.dynamicX, this.dynamicY);
        c.stroke();
    }
}

const TOTAL = 1000;
const stars = [];
function spawnParticles() {
    for (let i = 0; i < TOTAL; i++) {
        stars.push(new Star(random(-BUFFER, canvas.width + BUFFER), 
                            random(-BUFFER, canvas.height + BUFFER), 
                            random(0.5, 1.5)));
    }
}

function random(a, b) {
    return Math.random() * Math.abs(b - a) + Math.min(a, b);
}

let prevMouseX = null, nowMouseX = null;
let prevMouseY = null, nowMouseY = null;
let mouseDown = false;
let deltaX = null, deltaY = null;
const MULTIPLIER = 2;
let radian = 0;
const RADIAN_INCREASE = 0.001;
const RADIAN_FACTOR = 5;
let radianX = 0, raidanY = 0;
function animate() {
    requestAnimationFrame(animate);
    if (prevMouseX != null) {
        deltaX = nowMouseX - prevMouseX;
        deltaX *= MULTIPLIER;
    }
    if (prevMouseY != null) {
        deltaY = nowMouseY - prevMouseY;
        deltaY *= MULTIPLIER;
    }
    prevMouseX = nowMouseX;
    prevMouseY = nowMouseY;
    c.fillStyle = "rgb(0, 0, 0, 0.5)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    radianX = Math.cos(radian) * RADIAN_FACTOR;
    radianY = Math.sin(radian) * RADIAN_FACTOR;
    radian += RADIAN_INCREASE;
    stars.forEach(s => {
        if (mouseDown) s.update(deltaX, deltaY);
        else s.update(radianX, radianY);
        s.dot();
        s.draw();
    });
}

spawnParticles();
animate();

addEventListener("mousemove", e => {
    nowMouseX = e.clientX;
    nowMouseY = e.clientY;
});
addEventListener("mousedown", e => {
    mouseDown = true;
});
addEventListener("mouseup", e => {
    mouseDown = false;
});