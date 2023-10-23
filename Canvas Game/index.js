const canvas = document.querySelector('canvas');
const scoreEl = document.querySelector('#scoreEl');
const startBtn = document.querySelector("#startBtn");
const menu = document.querySelector("#menu");
const menuScore = document.querySelector("#menuScore");
const c = canvas.getContext('2d');
const enter = new Audio("./sounds/enter.mp3");
const exit = new Audio("./sounds/exit.mp3");
const laser = new Audio("./sounds/laser.mp3");
const click = new Audio("./sounds/click.mp3");
const smallHit = new Audio("./sounds/small_hit.mp3");
const mediumHit = new Audio("./sounds/medium_hit.mp3");
const largeHit = new Audio("./sounds/large_hit.mp3");

canvas.width = innerWidth;
canvas.height = innerHeight;

const x = canvas.width / 2;
const y = canvas.height / 2;
const projectiles = [], enemies = [], fragments = [];
const damage = 10;
const minRadius = 10;
const maxRadius = 30;
const spawnDelay = 500;
const fragmentAmount = 1.5;
const fragmentMinSize = 1;
const fragmentMaxSize = 4;
const fragmentMinFactor = 7
const fragmentMaxFactor = 15;
const fragmentFade = 0.03;
const projectileSize = 5;
const projectileFactor = 5;
const enemyFactor = 1.5;
const frictionFactor = 0.99;

function init() {
	score = 0;
	scoreEl.innerHTML = score;
	menuScore.innerHTML = score;
	projectiles.length = 0;
	enemies.length = 0;
	fragments.length = 0;
}

class Player {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}
	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}
}

const player = new Player(x, y, 15, 'white');

class Projectile {
	constructor(x, y, radius, color, velocity) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
		this.alpha = 1;
	}
	draw() {
		c.save();
		c.globalAlpha = this.alpha;
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.restore();
	}
	update(fade) {
		this.x += this.velocity.x;
		this.y += this.velocity.y;
		if (fade) {
			this.alpha -= fragmentFade;
			this.velocity.x *= frictionFactor;
			this.velocity.y *= frictionFactor;
		}
		this.draw();
	}
}

let interval;
function spawnEnemies() {
	interval = setInterval(() => {
		const radius = Math.random() * (maxRadius - minRadius) + 
			minRadius;
		let x, y;
		if (Math.random() < 0.5) {
			x = (Math.random() < 0.5)? 0 - radius : 
				canvas.width + radius;
			y = Math.random() * canvas.height;
		} else {
			x = Math.random() * canvas.width;
			y = (Math.random() < 0.5)? 0 - radius : 
				canvas.height + radius;
		}
		const angle = Math.atan2(player.y - y, player.x - x);
		const velocity = {
			x: Math.cos(angle) * enemyFactor,
			y: Math.sin(angle) * enemyFactor
		}
		const color = `hsl(${Math.random() * 360}, 100%, 75%)`;
		const enemy = new Projectile(x, y,  
		radius, color, velocity);
		enemies.push(enemy);
	}, spawnDelay);
}

let animationId;
let score = 0;
function animate() {
	animationId = requestAnimationFrame(animate);
	c.fillStyle = 'rgba(0, 0, 0, 0.2)';
	c.fillRect(0, 0, innerWidth, innerHeight);
	player.draw();
	fragments.forEach((fragment, fragmentIndex) => {
		if (fragment.alpha <= fragmentFade) {
			setTimeout(() => fragments.splice(fragmentIndex, 1), 0);
		} else {
			fragment.update(true);
		}
	});
	projectiles.forEach((projectile, index) => {
		projectile.update(false);
		if (projectile.x + projectile.radius <= 0 || 
			projectile.x - projectile.radius >= canvas.width ||
			projectile.y + projectile.radius <= 0 ||
			projectile.y - projectile.radius >= canvas.height) {
			setTimeout(() => projectiles.splice(index, 1), 0);
		}
	});
	enemies.forEach((enemy, enemyIndex) => {
		enemy.update(false);
		const playerDistance = Math.hypot(player.y - enemy.y, 
			player.x - enemy.x);
		if (playerDistance <= player.radius + enemy.radius) {
			largeHit.cloneNode(true).play();
			cancelAnimationFrame(animationId);
			clearInterval(interval);
			menu.style.display = "flex";
			menuScore.innerHTML = score;
			started = false;
		}
		projectiles.forEach((projectile, projectileIndex) => {
			const projectileDistance = Math.hypot(
				projectile.y - enemy.y, projectile.x - enemy.x);
			if (projectileDistance <= projectile.radius + 
				enemy.radius) {
				score += parseInt(enemy.radius);
				scoreEl.innerHTML = score;
				setTimeout(() => {
					for (let i = 0; i < enemy.radius * fragmentAmount; i++) {
						fragments.push(new Projectile(projectile.x, 
							projectile.y, Math.random() * 
							(fragmentMaxSize - fragmentMinSize) + 
							fragmentMinSize, enemy.color, 
							{
								x: (Math.random() - 0.5) * (Math.random() * (fragmentMaxFactor - fragmentMinFactor) + fragmentMinFactor),
								y: (Math.random() - 0.5) * (Math.random() * (fragmentMaxFactor - fragmentMinFactor) + fragmentMinFactor)
							}));
					}
					if (enemy.radius > damage + minRadius) {
						gsap.to(enemy, {
							radius: enemy.radius - damage
						});
						smallHit.cloneNode(true).play();
					} else {
						enemies.splice(enemyIndex, 1);
						mediumHit.cloneNode(true).play();
					}
					projectiles.splice(projectileIndex, 1);
				}, 0);
			}
		});
	});
}

let started = false;

addEventListener('mousedown', (event) => {
	if (!started) return;
	laser.cloneNode(true).play();
	const angle = Math.atan2(event.clientY - player.y, 
		event.clientX - player.x);
	const velocity = {
		x: Math.cos(angle) * projectileFactor,
		y: Math.sin(angle) * projectileFactor
	}
	const projectile = new Projectile(player.x, player.y,  
		projectileSize, "white", velocity);
	projectiles.push(projectile);
});

startBtn.addEventListener('click', () => {
	init();
	menu.style.display = "none";
	animate();
	spawnEnemies();
	started = true;
	click.cloneNode(true).play();
});

startBtn.addEventListener('mouseover', () => {
	var promise = enter.cloneNode(true).play();
	if (promise !== null) {
		promise.then(() => {}).catch(e => {});
	}
});

startBtn.addEventListener('mouseleave', () => {
	var promise = exit.cloneNode(true).play();
	if (promise !== null) {
		promise.then(() => {}).catch(e => {});
	}
})