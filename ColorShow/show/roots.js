let roots = [];
const CHANCE = 0.01;
const RIM_WIDTH = 3;
let SPREAD = 1.5;
const MIN_RADIAN_TICK = -0.2, MAX_RADIAN_TICK = 0.2;
const DEVIATION_FACTOR = 0.7;
const RADIUS_SHRINK = 0.02;
const ROOT_BUFFER = 50;
class Root {
	constructor(x, y, xVel, yVel, radius, color, rimColor) {
		this.x = x;
		this.y = y;
		this.xVel = xVel;
		this.yVel = yVel;
		this.radius = radius;
		this.color = color;
		this.rimColor = rimColor;
		this.xRadian = random(-Math.PI, Math.PI);
		this.yRadian = random(-Math.PI, Math.PI);
		this.xRadianTick = random(MIN_RADIAN_TICK, MAX_RADIAN_TICK);
		this.yRadianTick = random(MIN_RADIAN_TICK, MAX_RADIAN_TICK);
	}
	update() {
		this.radius -= RADIUS_SHRINK;
		if (this.radius <= MIN_ROOT_SHRINK) return false;
		this.x += this.xVel + DEVIATION_FACTOR * Math.sin(this.xRadian);
		this.y += this.yVel + DEVIATION_FACTOR * Math.sin(this.yRadian);
		if (this.x - this.radius < -ROOT_BUFFER || this.x + this.radius > WIDTH + ROOT_BUFFER) return false;
		if (this.y - this.radius < -ROOT_BUFFER || this.y + this.radius > HEIGHT + ROOT_BUFFER) return false;
		this.xRadian += this.xRadianTick;
		this.yRadian += this.yRadianTick;
		if (Math.random() < CHANCE) {
			var radian = Math.atan2(this.yVel, this.xVel) + random(-SPREAD / 2, SPREAD / 2);
			// var magnitude = Math.sqrt(this.xVel * this.xVel + this.yVel + this.yVel);
			roots.push(new Root(this.x, this.y, Math.cos(radian) / MAGNITUDE, Math.sin(radian) / MAGNITUDE, this.radius, this.color));
		}
		return true;
	}
	draw(c) {
		c.shadowBlur = 25;
		c.shadowColor = "black";
        dot(c, this.x, this.y, this.radius, this.color);
        // trace(c, this.x, this.y, this.radius, RIM_WIDTH / MAGNITUDE, this.rimColor);
	}
}

function initRoots() {
	spawnRoots();
}

const ROOT_COUNT = 15;
const MAGNITUDE = 0.2;
const MIN_ROOT_RADIUS = 15, MAX_ROOT_RADIUS = 20, MIN_ROOT_SHRINK = 5;
function spawnRoots() {
	roots.length = 0;
	var spawnX = chance(chance(0, WIDTH, 0.5), random(0, WIDTH), 0.5);
	var spawnY = (spawnX == 0 || spawnX == WIDTH)? random(0, HEIGHT) : chance(0, HEIGHT, 0.5);
	if (spawnX == 0 || spawnX == WIDTH) SPREAD = 1;
	else SPREAD = 2;
	showC.globalAlpha = 1;
	showC.globalAlpha = 0;
	for (let i = 0; i < ROOT_COUNT; i++) {
		var radian = Math.atan2(HEIGHT / 2 - spawnY, WIDTH / 2 - spawnX);
		var hue = random(140, 180);
		var radius = random(MIN_ROOT_RADIUS, MAX_ROOT_RADIUS);
		roots.push(new Root(spawnX, spawnY, Math.cos(radian) / MAGNITUDE, Math.sin(radian) / MAGNITUDE, radius, 
			`hsl(${hue}, 75%, 50%)`, `hsl(${hue}, 75%, 5%)`));
	}
}

function updateRoots(c) {
	roots.forEach((r, i) => {
		if (!r.update()) roots.splice(i, 1);
		else r.draw(c);
	});
}