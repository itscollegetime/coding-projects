let forceRange;
const PUSH_FORCE = 35, RETURN_FORCE = 15;
let forceFactor = {factor: 1};
const BOUNCE_BUFFER = 25;
const CONNECT_DISTANCE = 150;
class Particle {
    constructor(x, y, xVel, yVel, radius, color) {
        this.x = x;
        this.y = y;
        this.xVel = xVel;
        this.yVel = yVel;
        this.appliedX = x;
        this.appliedY = y;
        this.radius = radius;
        this.color = color;
        this.gradient;
    }
    update(forces) {
        this.x += this.xVel;
        this.y += this.yVel;
        if (this.x - this.radius <= 0 - BOUNCE_BUFFER || this.x + this.radius >= WIDTH + BOUNCE_BUFFER) this.xVel *= -1;
        if (this.y - this.radius <= 0 - BOUNCE_BUFFER || this.y + this.radius >= HEIGHT + BOUNCE_BUFFER) this.yVel *= -1;
        forces.forEach(force => {
            if (force.x == null || force.y == null) return;
            let dx = force.x - this.appliedX;
            let dy = force.y - this.appliedY;
            let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            let factor = (forceRange - distance) / forceRange;
            let fx = dx / distance * factor * -PUSH_FORCE * forceFactor.factor;
            let fy = dy / distance * factor * -PUSH_FORCE * forceFactor.factor;
            if (distance <= forceRange) {
                this.appliedX = this.appliedX + fx;
                this.appliedY = this.appliedY + fy;
            }
        });
        this.appliedX = this.appliedX - (this.appliedX - this.x) / RETURN_FORCE;
        this.appliedY = this.appliedY - (this.appliedY - this.y) / RETURN_FORCE;
    }
    draw(c) {
        this.gradient = c.createRadialGradient(this.appliedX, this.appliedY, this.radius, this.appliedX, this.appliedY, this.radius * 5);
        this.gradient.addColorStop(0, "#1abc9c");
        // this.gradient.addColorStop(0, this.color);
        this.gradient.addColorStop(1, `rgb(${transform.r}, ${transform.g}, ${transform.b}, 0)`);
        dot(c, this.appliedX, this.appliedY, this.radius * 5, this.gradient);
        dot(c, this.appliedX, this.appliedY, this.radius, this.color);
    }
    drawLines(c, particles) {
        let d;
        particles.forEach(p => {
            d = Math.sqrt(Math.pow(p.appliedX - this.appliedX, 2) + Math.pow(p.appliedY - this.appliedY, 2));
            if (d <= CONNECT_DISTANCE) {
                c.strokeStyle = this.color;
                c.save();
                c.globalAlpha = cap(0, 1, c.globalAlpha - d / CONNECT_DISTANCE);
                c.beginPath();
                c.moveTo(this.appliedX, this.appliedY);
                c.lineTo(p.appliedX, p.appliedY);
                c.stroke();
                c.restore();
            }
        });
    }
}

let totalCount;
const MIN_VEL = 0.5, MAX_VEL = 1;
const MIN_RADIUS = 2, MAX_RADIUS = 4;
let particles = [];
let forces = new Map();
function spawnParticles() {
    totalCount = scaleFactor() / 8000 + 225;
    forceRange = scaleFactor() / 7000 + 300;
    for (let i = 0; i < totalCount; i++) {
        let vel = randomVel();
        let color = `hsl(160, 100%, ${random(50, 100)}%)`;
        particles.push(new Particle(random(0, WIDTH), random(0, HEIGHT), vel.x, vel.y, random(MIN_RADIUS, MAX_RADIUS), color));
    }
}
function randomVel() {
    let radian = random(0, Math.PI * 2);
    let vel = random(MIN_VEL, MAX_VEL);
    return {x: Math.cos(radian) * vel, y: Math.sin(radian) * vel};
}
function initMenu() {
    spawnParticles();
}
let bannerStart;
function updateMenu(c) {
    particles.forEach(p => {
        forces.set("mouse", {x: mouseX, y: mouseY});
        p.update(forces);
        p.draw(c);
        p.drawLines(c, particles);
    });
    menuBackground = `rgb(${transform.r}, ${transform.g}, ${transform.b}, ${MENU_BASE_OPACITY})`;
    c.fillStyle = `rgb(${banner.r}, ${banner.g}, ${banner.b}, 0.6)`;
    // c.fillStyle = "red";
    c.fillRect(0, bannerStart - prompts.offsetHeight, WIDTH, prompts.offsetHeight);
    c.fillRect(0, bannerStart, WIDTH, timer.offsetHeight);
    c.fillRect(0, bannerStart + timer.offsetHeight, WIDTH, display.offsetHeight);
}
let transform = {r: 0, g: 0, b: 0};
const R = 0, G = 130, B = 230;
const banner = {r: 0, g: 0, b: 0};
const BR = 20, BG = 100, BB = 175;
let hsl = {h: 14, s: 100, l: 45};
const VH = 155, VS = 75, VL = 50;
function transformMenu() {
    gsap.to(transform, {r: R, g: G, b: B, duration: 2});
    gsap.to(banner, {r: BR, g: BG, b: BB, duration: 2});
    gsap.to(hsl, {h: VH, s: VS, l: VL, duration: 2});
    gsap.to(forceFactor, {factor: -1, duration: 2});
}