const launch = new Audio("./sounds/Firework Launch.mp3");
const explosion = new Audio("./sounds/Firework Explosion.mp3");
const explosionSparkles = new Audio("./sounds/Firework Explosion Sparkles.mp3");
const volume = 0.25;

const xOffset = 3;
const yOffset = -3;

const sprinkleAmount = 1;
const sprinkleVelocityMinFactor = 1.5;
const sprinkleVelocityMaxFactor = 2;
const sprinkleRadius = 2;
const sprinkleMinRadius = 0;
const sprinkleMinLifetime = 1000;
const sprinkleMaxLifetime = 1500;
const sprinkleRadianSpreadFactor = 4;

const sparkleDuration = 250;

const gravity = 0.05;
const frictionFactor = 0.98;

const particles = [];

class Particle {
	constructor(x, y, radius, minRadius, velocity, color, lifetime, fade, sparkle, sprinkle, onEnd) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.shrinkRate = (radius - minRadius) / lifetime;
		this.velocity = velocity;
		this.color = color;
		this.spawnTime = Date.now();
		this.lifetime = lifetime;
		this.fade = fade;
		this.sparkle = sparkle;
		this.sprinkle = sprinkle;
		if (sprinkle) this.lastSprinkle = 0;
		this.onEnd = onEnd;
		this.alpha = 1;
	}
	draw() {
		c.fillStyle = this.color;
		c.shadowBlur = 5;
		c.shadowColor = this.color;
		// c.save();
		c.globalAlpha = this.alpha;
		c.beginPath();
		c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
		// c.closePath();
		c.fill();
		// c.restore();
	}
	update() {
		//checking lifetime
		if (Date.now() - this.spawnTime >= this.lifetime) {
			this.onEnd();
			return false;
		}
		//update velocity
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		this.velocity.x *= frictionFactor;
		this.velocity.y *= frictionFactor;
		if (this.x - this.radius <= 0 || this.x - this.radius >= canvas.width) this.velocity.x *= -1;
		if (this.y - this.radius <= 0) this.velocity.y *= -1;
		if (this.y + this.radius >= canvas.height) this.velocity.y = 0;
		else this.velocity.y += gravity;
		//update alpha
		if (this.fade) {
			if (this.sparkle) this.alpha -= 1 / ((this.lifetime - sparkleDuration) / 1000 * 60);
			else this.alpha = (this.alpha - 1 / (this.lifetime / 1000 * 60) > 0)? this.alpha - 1 / (this.lifetime / 1000 * 60) : 0;
		}
		//generate sprinkles
		if (this.sprinkle) {
			for (let i = 0; i < sprinkleAmount; i++) {
				let radian = Math.atan2(this.velocity.y, this.velocity.x) + (Math.random() - 0.5) * sprinkleRadianSpreadFactor;
				let factor =  random(sprinkleVelocityMinFactor, sprinkleVelocityMaxFactor);
				let sprinkle = new Particle(this.x, this.y, sprinkleRadius, sprinkleMinRadius, {
					x: Math.cos(radian) * factor,
					y: Math.sin(radian) * factor
				}, this.color, random(sprinkleMinLifetime, sprinkleMaxLifetime), true, false, false, () => {});
				particles.push(sprinkle);
			}	
		}
		//shrink
		this.radius -= this.shrinkRate;
		return true;
	}
}

function toSpot(id) {
	let col = (parseInt(id / 10) - 1.5) * 2, row = parseInt(id % 10);
	if (row == 9) return {
		x: canvas.width / 2 + col * (topBlockWidth / 2),
		y: canvas.height - groundLevel - baseHeight - 8 * blockHeight - blockSeparatorHeight - topSeparatorHeight - topBlockHeight
	}
	return {
		x: canvas.width / 2 + col * (blockWidth / 2 - xOffset),
		y: canvas.height - groundLevel - baseHeight - row * blockHeight + yOffset
	};
}

function randomRadian() {
	return Math.atan2(Math.random() - 0.5, Math.random() - 0.5);
}

const sizzlerRadius = 3;
const sizzlerMinRadius = 0;
const sizzlerVelocityFactor = 10;

const popperRadius = 3;
const popperMinRadius = 2;
const popperVelocityFactor = 10;
const popperAmount = 25;

const fragmentRadius = 2;
const fragmentMinRadius = 1.5;
const smallFragmentVelocityMinFactor = 2;
const smallFragmentVelocityMaxFactor = 6;
const mediumFragmentVelocityMinFactor = 3;
const mediumFragmentVelocityMaxFactor = 8;
const largeFragmentVelocityMinFactor = 1;
const largeFragmentVelocityMaxFactor = 10;
const fragmentMinLifetime = 1000;
const fragmetnMaxLifetime = 1500;

const sizzlePopperRadius = 4.5;
const sizzlePopperMinRadius = 1.5;
const sizzlePopperVelocityFactor = 20;
const sizzlePopperAmount = 40;

const largePopperRadius = 5;
const largePopperMinRadius = 4.5;
const largePopperVelocityFactor = 25;
const largePopperAmount = 100;

function fire(launchSpot, type, degrees, color, lifetime) {
	let loc = toSpot(launchSpot);
	let offset = (parseInt(launchSpot / 10) == 2)? 0 : 180;
	let flipper = (parseInt(launchSpot / 10) == 2)? 1 : -1;
	//sprinkle sizzler
	if (type == 0) {
		let particle = new Particle(loc.x, loc.y, sizzlerRadius, sizzlerMinRadius, {
			x: Math.cos((degrees - 90 + offset) * Math.PI / 180 * flipper) * sizzlerVelocityFactor,
			y: Math.sin((degrees - 90 + offset) * Math.PI / 180 * flipper) * sizzlerVelocityFactor
		}, color, lifetime, true, true, true, () => {});
		particles.push(particle);
	}
	//small popper
	if (type == 1) {
		let particle = new Particle(loc.x, loc.y, popperRadius, popperMinRadius, {
			x: Math.cos((degrees - 90 + offset) * Math.PI / 180 * flipper) * popperVelocityFactor,
			y: Math.sin((degrees - 90 + offset) * Math.PI / 180 * flipper) * popperVelocityFactor
		}, color, lifetime, false, false, false, () => {
			for (let i = 0; i < popperAmount; i++) {
				let fragment = genFragment(particle, smallFragmentVelocityMinFactor, smallFragmentVelocityMaxFactor, false);
				particles.push(fragment);
			}
		});
		particles.push(particle);	
	}
	//medium sizzle popper
	if (type == 2) {
		let particle = new Particle(loc.x, loc.y, sizzlePopperRadius, sizzlePopperMinRadius, {
			x: Math.cos((degrees - 90 + offset) * Math.PI / 180 * flipper) * sizzlePopperVelocityFactor,
			y: Math.sin((degrees - 90 + offset) * Math.PI / 180 * flipper) * sizzlePopperVelocityFactor
		}, color, lifetime, false, false, true, () => {
			for (let i = 0; i < sizzlePopperAmount; i++) {
				let fragment = genFragment(particle, mediumFragmentVelocityMinFactor, mediumFragmentVelocityMaxFactor, false);
				particles.push(fragment);
			}
		});
		particles.push(particle);
	}
	//large popper
	if (type == 3) {
		let particle = new Particle(loc.x, loc.y, largePopperRadius, largePopperMinRadius, {
			x: Math.cos((degrees - 90 + offset) * Math.PI / 180 * flipper) * largePopperVelocityFactor,
			y: Math.sin((degrees - 90 + offset) * Math.PI / 180 * flipper) * largePopperVelocityFactor
		}, color, lifetime, false, false, false, () => {
			for (let i = 0; i < largePopperAmount; i++) {
				let fragment = genFragment(particle, largeFragmentVelocityMinFactor, largeFragmentVelocityMaxFactor, true);
				particles.push(fragment);
			}
		});
		particles.push(particle);
	}
}

function genFragment(parent, minVelocity, maxVelocity, sparkle) {
	let radian = randomRadian();
	let factor = random(minVelocity, maxVelocity);
	let fragment = new Particle(parent.x, parent.y, fragmentRadius, fragmentMinRadius, {
		x: Math.cos(radian) * factor,
		y: Math.sin(radian) * factor
	}, parent.color, random(fragmentMinLifetime, fragmetnMaxLifetime), true, sparkle, false, () => {});
	return fragment;
}

function playExplosion(sparkle) {
	let audio;
	if (sparkle) audio = explosionSparkles.cloneNode(true);
	else audio = explosion.cloneNode(true);
	audio.volume = volume;
	audio.play();
}

function playLaunch() {
	let audio = launch.cloneNode(true);
	audio.volume = volume;
	audio.play();
}