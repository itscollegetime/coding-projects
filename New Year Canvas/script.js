const ost = new Audio("./sounds/Pre-Order.mp3");
const click = new Audio("./sounds/Click.mp3");
const prompt = document.querySelector('#prompt');
const countdown = document.querySelector('#countdown');
const ending = document.querySelector('#ending');
const passiveVolume = 0.5;
const seekOffset = 0;

const windowBlinkChance = 0.1;
const windowBlinkMinDelay = 2500;
const windowBlinkMaxDelay = 3000;

let windowStatus = "blink";
let startTime = 0;
let counter = 40700;

const fadeTick = 0.01;
prompt.style.opacity = 1;
countdown.style.opacity = 0;
ending.style.opacity = 0;

addEventListener('click', () => {
	if (prompt.style.opacity == 1) {
		start();
	} else {
		ost.pause();
	}
});

function start() {
	click.volume = passiveVolume;
	click.play();
	var fadeInterval = setInterval(() => {
		if (countdown.style.opacity < 1) {
			prompt.style.opacity -= fadeTick;
			countdown.style.opacity = 1 - prompt.style.opacity;
		} else {
			clearInterval(fadeInterval);
		}
	}, 0);
	startTime = Date.now();
	windowStatus = "off";
	setTimeout(() => windowStatus = null, windowBlinkMaxDelay);
	ost.volume = passiveVolume;
	ost.currentTime = seekOffset / 1000;
	ost.play();
	check();
}

function animate() {
	requestAnimationFrame(animate);
	c.fillStyle = 'rgba(0, 0, 0, 0.35)';
	c.shadowBlur = 0;
	c.fillRect(0, 0, canvas.width, canvas.height);
	if (windowStatus != null) {
		windows.forEach(window => {
			if (windowStatus == "blink") {
				if (window.glow == 0 || window.glow == 1) {
					if (Math.random() < windowBlinkChance) {
						gsap.to(window, {
							glow: (Math.random() < windowGlowChance)? 1: 0,
							duration: random(windowBlinkMinDelay, windowBlinkMaxDelay) / 1000
						});
					}
				}
			}
			if (windowStatus == "off") {
				if (window.glow == 1) {
					gsap.to(window, {
						glow: 0,
						duration: random(windowBlinkMinDelay, windowBlinkMaxDelay) / 1000
					});
				}
			}
			if (windowStatus == "on") {
				if (window.glow == 0) {
					gsap.to(window, {
						glow: 1,
						duration: random(windowBlinkMinDelay, windowBlinkMaxDelay) / 1000
					});
				}
			}
		});
	}
	particles.forEach((particle, index) => {
		if (particle.update()) particle.draw();
		else particles.splice(index, 1);
	});
	draw101(false);
	if (Date.now() - startTime < counter) countdown.innerHTML = parseInt((counter - (Date.now() - startTime)) / 1000);
}

draw101(true)
animate();