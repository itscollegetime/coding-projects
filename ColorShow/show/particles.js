const RADIUS_SHRINK = 0.3, RADIUS_SHRINK_SPREAD = 0.1;
const FRICTION = 0.95;
class ShowParticle {
	constructor(x, y, xVel, yVel, radius, color) {
		this.x = x;
		this.y = y;
		this.xVel = xVel;
		this.yVel = yVel;
		this.radius = radius;
		this.color = color;
	}
	update(sources) {
		this.radius -= RADIUS_SHRINK + random(-RADIUS_SHRINK_SPREAD, RADIUS_SHRINK_SPREAD);
		if (this.radius <= 0) return false;
		this.prevX = this.x;
		this.prevY = this.y;
		this.x += this.xVel;
		this.y += this.yVel;
		this.xVel *= FRICTION;
		this.yVel *= FRICTION;
		return true;
	}
	draw(c) {
		dot(c, this.x, this.y, this.radius, this.color);
	}
}

function initParticles() {}

let showParticles = [];
function updateShowParticles(c) {
	showParticles.forEach((p, i) => {
		if (p.update()) p.draw(c);
		else showParticles.splice(i, 1);
	});
}

const MIN_SHOW_RADIUS = 2, MAX_SHOW_RADIUS = 10;
function spawnParticle(x, y, xVel, yVel, radius, color) {
	showParticles.push(new ShowParticle(x, y, xVel, yVel, cap(MIN_SHOW_RADIUS, MAX_SHOW_RADIUS, radius), color));
}