const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
const fire = new Audio("./sounds/Firework Launch.mp3");
const explode = new Audio("./sounds/Firework Explosion.mp3");

canvas.width = innerWidth;
canvas.height = innerHeight;

const volume = 0.15;

let radian;
let left = false, right = false, up = false, down = false;
let xVel = 0, yVel = 0;
let mouseX = 0, mouseY = 0;

//movement constants
const acc = 3, frictionFactor = 0.975;
const maxVel = 12.5;

class Player {
	constructor(x, y, radius, color, caliber, length, barelColor) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.caliber = caliber;
		this.length = length;
		this.barelColor = barelColor;
		this.recoil = 0;
	}
	update() {
		//adding acceleration
		if (left && !right) {
			xVel = (xVel - acc < -maxVel)? -maxVel : xVel - acc;
		}
		if (right && !left) {
			xVel = (xVel + acc > maxVel)? maxVel : xVel + acc;
		}
		if (up && !down) {
			yVel = (yVel - acc < -maxVel)? -maxVel : yVel - acc;
		}
		if (down && !up) {
			yVel = (yVel + acc > maxVel)? maxVel : yVel + acc;
		}
		//adding friction
		//if (xVel < 0) xVel = (xVel + friction > 0)? 0: xVel + friction;
		//else xVel = (xVel - friction < 0)? 0 : xVel - friction;
		//if (yVel < 0) yVel = (yVel + friction > 0)? 0 : yVel + friction;
		//else yVel = (yVel - friction < 0)? 0 : yVel - friction;
		xVel *= frictionFactor;
		yVel *= frictionFactor;
		//adding velocity
		this.x += xVel;
		this.y += yVel;
		//boundry check
		if (this.x - this.radius <= 0) {
			xVel = 0;
			this.x = this.radius;
		}
		if (this.x + this.radius >= canvas.width) {
			xVel = 0;
			this.x = canvas.width - this.radius;
		}
		if (this.y - this.radius <= 0) {
			yVel = 0;
			this.y = this.radius;
		}
		if (this.y + this.radius >= canvas.height) {
			yVel = 0;
			this.y = canvas.height - this.radius;
		}
	}
	draw() {
		radian = Math.atan2(mouseY - this.y, 
			mouseX - this.x);
		//drawing barel
		c.beginPath();
		c.moveTo(this.x, this.y);
		const x = this.x + Math.cos(radian) * (this.length - this.recoil);
		const y = this.y + Math.sin(radian) * (this.length - this.recoil);
		c.lineTo(x, y);
		c.lineWidth = this.caliber;
		c.strokeStyle = this.barelColor
		c.stroke();
		//drawing player
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.lineWidth = 0;
		c.fillStyle = this.color;
		c.fill();
	}
}

class Particle {
	constructor(x, y, radius, color, spawnTime, lifeTime, velocity, fade, flickerTime) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.spawnTime = spawnTime;
		this.lifeTime = lifeTime;
		this.velocity = velocity;
		this.fade = fade;
		this.alpha = 1;
		this.flickerTime = flickerTime;
	}
	update() {
		let xVel = this.velocity.x;
		let yVel = this.velocity.y;
		//adding friction
		//if (xVel < 0) xVel = (xVel + friction > 0)? 0: xVel + friction;
		//else xVel = (xVel - friction < 0)? 0 : xVel - friction;
		//if (yVel < 0) yVel = (yVel + friction > 0)? 0 : yVel + friction;
		//else yVel = (yVel - friction < 0)? 0 : yVel - friction;
		xVel *= frictionFactor;
		yVel *= frictionFactor;
		//adding velocity
		this.x += xVel;
		this.y += yVel;
		//boundry check
		if (this.x - this.radius <= 0) {
			xVel *= -1;
			this.x = this.radius;
		}
		if (this.x + this.radius >= canvas.width) {
			xVel *= -1;
			this.x = canvas.width - this.radius;
		}
		if (this.y - this.radius <= 0) {
			yVel *= -1;
			this.y = this.radius;
		}
		if (this.y + this.radius >= canvas.height) {
			yVel *= -1;
			this.y = canvas.height - this.radius;
		}
		this.velocity.x = xVel;
		this.velocity.y = yVel;
		if (this.fade) this.alpha -= 1 / ((this.lifeTime - this.flickerTime) / 1000 * fps);
	}
	draw() {
		if (this.fade) {
			c.save();
			c.globalAlpha = this.alpha;
		}
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		if (this.fade) c.restore();
	}
}

//player constants
const player = new Player(canvas.width / 2, canvas.height / 2, 15, "white", 15, 30, "lightGray");
const cooldown = 100;
const recoilFactor = 0.5;

addEventListener('mousemove', (event) => {
	mouseX = event.clientX;
	mouseY = event.clientY;
});

let mouseDown = false;
let animationId;
let thisFrame;
let lastFrame = 0;
let lastFire = 0;
let fps;

addEventListener('mousedown', (event) => {
	if (event.button == 0) mouseDown = true;
});
addEventListener('mouseup', (event) => {
	if (event.button == 0) mouseDown = false;
});
addEventListener('keydown', (event) => {
	
	if (event.key == "a") left = true;
	if (event.key == "d") right = true;
	if (event.key == "w") up = true;
	if (event.key == "s") down = true;
});
addEventListener('keyup', (event) => {
	if (event.key == "a") left = false;
	if (event.key == "d") right = false;
	if (event.key == "w") up = false;
	if (event.key == "s") down = false;
});

const particles = [], fragments = [];
//particle constants
const minLifetime = 1000;
const maxLifetime = 2000;
const minVelocityFactor = 30;
const maxVelocityFactor = 40;
const minFragVelocity = 1;
const maxFragVelocity = 10;
const minFragLifeTime = 950;
const maxFragLifeTime = 1450;
const recoilVelocityFactor = 0.025;
const minFragments = 200;
const maxFragments = 250;
const minFragSize = 2;
const maxFragSize = 5;
const randomFragChance = 0.2;
const minFlickerTime = 25;
const maxFlickerTime = 50;

function animate() {
	animationId = requestAnimationFrame(animate);
	thisFrame = Date.now();
	fps = 1000 / (thisFrame - lastFrame);

	//fade canvas
	c.fillStyle = 'rgba(0, 0, 0, 0.35)';
	c.fillRect(0, 0, innerWidth, innerHeight);

	//update & draw player
	player.update();
	player.draw(radian);

	//fire particles
	if (mouseDown) {
		if (thisFrame - lastFire > cooldown) {
			var audio = fire.cloneNode(true);
			audio.volume = volume;
			audio.play();
			let velocityFactor = Math.random() * (maxVelocityFactor - minVelocityFactor) + minVelocityFactor;
			let velocity = {
				x: Math.cos(radian) * velocityFactor + xVel,
				y: Math.sin(radian) * velocityFactor + yVel
			}
			let particle = new Particle(player.x, player.y, player.caliber / 2, randomColor(0, 360, 100, 60), thisFrame, 
				Math.random() * (maxLifetime - minLifetime) + minLifetime, velocity, false, 0);
			xVel -= velocity.x * recoilVelocityFactor;
			yVel -= velocity.y * recoilVelocityFactor;
			particles.push(particle);
			player.recoil = player.caliber * recoilFactor;
			gsap.to(player, {
				recoil: 0,
				duration: cooldown / 1000
			});
			lastFire = thisFrame;
		}
	}

	//update & draw particles
	particles.forEach((particle, index) => {
		particle.update();
		particle.draw();
		if (thisFrame - particle.spawnTime >= particle.lifeTime) {
			var audio = explode.cloneNode(true);
			audio.volume = volume;
			audio.play();
			let fragAmount = Math.random() * (maxFragments - minFragments) + minFragments;
			for (let i = 0; i < fragAmount; i++) {
				let radian = Math.atan2(Math.random() - 0.5, Math.random() - 0.5);
				let fragVel = {
								x: Math.cos(radian) * (Math.random() * (maxFragVelocity - minFragVelocity) + minFragVelocity),
								y: Math.sin(radian) * (Math.random() * (maxFragVelocity - minFragVelocity) + minFragVelocity)
							};
				let color = (Math.random() < randomFragChance)? randomColor(0, 360, 100, 50) : particle.color;
				let fragment = new Particle(particle.x, particle.y, Math.random() * (maxFragSize - minFragSize) + minFragSize, 
					color, thisFrame, 
					Math.random() * (maxFragLifeTime - minFragLifeTime) + minFragLifeTime, fragVel, true, 
					Math.random() * (maxFlickerTime - minFlickerTime) + minFlickerTime);
				fragments.push(fragment);
			}
			setTimeout(() => particles.splice(index, 1), 0);
		}
	});

	//update & draw fragments
	fragments.forEach((fragment, index) => {
		fragment.update();
		fragment.draw();
		if (thisFrame - fragment.spawnTime >= fragment.lifeTime) {
			setTimeout(() => fragments.splice(index, 1), 0);
		}
	});

	lastFrame = thisFrame;
}

function randomColor(minSat, maxSat, hue, light) {
	return `hsl(${Math.random() * (maxSat - minSat) + minSat}, ${hue}%, ${light}%)`;
}

player.draw(0);
animate();