const tempCanvas = document.getElementById("temp");
const tempC = tempCanvas.getContext("2d");

tempCanvas.width = WIDTH;
tempCanvas.height = HEIGHT;

const IMAGE = new Image();
let SCALE;
let offset = {x: 0, y: 0};
IMAGE.src = "./resources/Specified.jpg";
let textData;
IMAGE.onload = () => {
	tempC.drawImage(IMAGE, 0, 0, IMAGE.naturalWidth, IMAGE.naturalHeight);
	textData = tempC.getImageData(0, 0, IMAGE.naturalWidth, IMAGE.naturalHeight);
	let xScale = WIDTH / IMAGE.naturalWidth;
	let yScale = HEIGHT / IMAGE.naturalHeight;
	SCALE = Math.min(xScale, yScale);
	if (xScale > yScale) offset.x = (WIDTH - IMAGE.naturalWidth * SCALE) / 2;
	else offset.y = (HEIGHT - IMAGE.naturalHeight * SCALE) / 2;
}

function initTextParticles() {
}

const TEXT_FRICTION = 0.95;
let textParticles = [];
let explodedParticles = []
const MIN_TEXT_RADIUS = 4, MAX_TEXT_RADIUS = 6;
class TextParticle {
	constructor(x, y, xVel, yVel, index) {
		this.x = x;
		this.y = y;
		this.xVel = xVel;
		this.yVel = yVel;
		this.index = index;
		this.color = `hsl(${175}, 66%, ${random(60, 70)}%)`;
		this.passed = false;
		this.radius = random(MIN_TEXT_RADIUS, MAX_TEXT_RADIUS);
	}
	update() {
		this.x += this.xVel;
		this.y += this.yVel;
		if (this.x <= 0 || this.x >= WIDTH) this.xVel *= random(-0.5, -1.7);
		if (this.y <= 0 || this.y >= HEIGHT) this.yVel *= random(-0.5, -1.7);
		this.xVel *= (this.index == 2)? EXPLODE_FRICTION : TEXT_FRICTION;
		this.yVel *= (this.index == 2)? EXPLODE_FRICTION : TEXT_FRICTION;
	}
	draw(c) {
		if (!this.passed && (this.x >= source.x - source.r && this.x <= source.x + source.r) 
			&& (this.y >= source.y - source.r && this.y <= source.y + source.r) 
			&& Math.sqrt(Math.pow(this.x - source.x, 2) + Math.pow(this.y - source.y, 2))
			<= source.r) {
			this.passed = textData.data[Math.round((this.y + offset.y) / SCALE) * 4 * textData.width + 
				Math.round((this.x - offset.x) / SCALE) * 4] < 128;
			if (this.passed) {
				this.color = `hsl(${39}, 100%, ${random(50, 60)}%)`;
			} else {
				return false;
			}
		}
		dot(c, this.x, this.y, this.radius, this.color);
		return true;
	}
	explode() {
		for (let i = 0; i < EXPLODE_COUNT; i++) {
			explodeRadian = random(-Math.PI, Math.PI);
			explodeForce = random(MIN_MAG, MAX_MAG);
			explodedParticles.push(new TextParticle(this.x, this.y, 
				Math.cos(explodeRadian) * explodeForce, 
				Math.sin(explodeRadian) * explodeForce, 
			2));
		}
	}
}

function spawnTextParticle(x, y, xVel, yVel, index) {
	textParticles.push(new TextParticle(x, y, xVel, yVel, index));
}

function updateTextParticles(c) {
	textParticles.forEach(p => {
		p.update();
		p.draw(c);
	});
	explodedParticles.forEach((p, pIndex) => {
		p.update();
		if (!p.draw(c)) explodedParticles.splice(pIndex, 1);
	});
	trace(c, source.x, source.y, source.r, 5, "gold");
}

let explodeRadian, explodeForce;
const EXPLODE_COUNT = 1750;
const MIN_MAG = 0, MAX_MAG = 350;
const EXPLODE_FRICTION = 0.4;
function explode(index) {
	textParticles.forEach((p, pIndex) => {
		if (p.index == index) {
			p.explode();
		}
	});
}

let source = {x: WIDTH / 2, y: 0, r: 0};
function revealText() {
	gsap.to(source, {r: Math.max(WIDTH, HEIGHT), duration: 5});
}