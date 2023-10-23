// const SEEK = 85;
const SEEK = 0;
function startShowScheduler() {
	setTimeout(() => {
		s2.b = 255;
		gsap.to(showBackground, {s1: 0, duration: 0.25});
	}, 19264 - SEEK * 1000);
	setTimeout(() => {
		gsap.to(s1, {r: 0, g: 187, b: 255, duration: 0.25});
	}, 26425 - SEEK * 1000);
	setTimeout(() => {
		gsap.to(s2, {r: 0, g: 0, b: 0, duration: 0.25});
		gsap.to(s1, {r: 0, g: 0, b: 255, duration: 0.25});
	}, 33580 - SEEK * 1000);
	setTimeout(() => {
		gsap.to(s2, {r: 253, g: 70, b: 28, duration: 0.25});
		gsap.to(s1, {r: 180, g: 131, b: 230, duration: 0.25});
	}, 37216 - SEEK * 1000);
	setTimeout(() => {
		gsap.to(s2, {r: 17, g: 168, b: 163, duration: 0.25});
		gsap.to(s1, {r: 99, g: 22, b: 171, duration: 0.25});
	}, 40770 - SEEK * 1000);
	setTimeout(() => {
		gsap.to(s2, {r: 50, g: 168, b: 82, duration: 0.25});
		gsap.to(s1, {r: 0, g: 187, b: 255, duration: 0.25});
	}, 47951 - SEEK * 1000);
	setTimeout(() => {
		gsap.to(s2, {r: 0, g: 0, b: 225, duration: 1});
		gsap.to(s1, {r: 0, g: 187, b: 255, duration: 1});
		gsap.to(f2Hsl, {h: f1Hsl.h, duration: 1});
		gsap.to(f1Hsl, {h: f2Hsl.h, lM: 20, lB: 50, duration: 1});
	}, 51566 - 1 - SEEK * 1000);
	setTimeout(() => {
		gsap.to(s2, {r: 31, g: 151, b: 156, duration: 1});
		gsap.to(s1, {r: 50, g: 168, b: 150, duration: 1});
		gsap.to(f2Hsl, {h: 226, s: 72, lM: 20, lB: 20, duration: 1});
		gsap.to(f1Hsl, {h: 182, s: 72, lM: 30, lB: 60, duration: 1});
	}, 55127 - 1 - SEEK * 1000);
	setTimeout(() => {
		gsap.to(s2, {r: 174, g: 130, b: 225, duration: 1});
		gsap.to(s1, {r: 225, g: 157, b: 82, duration: 1});
		gsap.to(f2Hsl, {h: 6, s: 89, lM: 20, lB: 40, duration: 1});
		gsap.to(f1Hsl, {h: 6, s: 100, lM: 20, lB: 80, duration: 1});
	}, 56886 - 1 - SEEK * 1000);
	setTimeout(() => {
		gsap.to(s2, {r: 105, g: 157, b: 255, duration: 1});
		gsap.to(s1, {r: 46, g: 225, b: 126, duration: 1});
		gsap.to(f2Hsl, {h: 216, s: 100, lM: 20, lB: 40, duration: 1});
		gsap.to(f1Hsl, {h: 216, s: 100, lM: 20, lB: 25, duration: 1});
	}, 58698 - 1 - SEEK * 1000);
	setTimeout(() => {
		gsap.to(s2, {r: 9, g: 0, b: 176, duration: 1});
		gsap.to(s1, {r: 113, g: 46, b: 255, duration: 1});
		gsap.to(f2Hsl, {h: 173, s: 75, lM: 20, lB: 40, duration: 1});
		gsap.to(f1Hsl, {h: 229, s: 77, lM: 10, lB: 30, duration: 1});
	}, 64018 - 1 - SEEK * 1000);
	setTimeout(() => {
		gsap.to(s2, {r: 120, g: 0, b: 150, duration: 1});
		gsap.to(s1, {r: 250, g: 61, b: 174, duration: 1});
		gsap.to(f2Hsl, {h: 225, s: 100, lM: 20, lB: 60, duration: 1});
		gsap.to(f1Hsl, {h: 258, s: 83, lM: 10, lB: 50, duration: 1});
	}, 67706 - 1 - SEEK * 1000);
	setTimeout(() => {
		gsap.to(s2, {r: 255, g: 187, b: 0, duration: 1});
		gsap.to(s1, {r: 241, g: 46, b: 4, duration: 1});
		gsap.to(f2Hsl, {h: 171, s: 96, lM: 20, lB: 35, duration: 1});
		gsap.to(f1Hsl, {h: 264, s: 95, lM: 10, lB: 60, duration: 1});
	}, 71199 - 1 - SEEK * 1000);
	setTimeout(() => {
		gsap.to(s2, {r: 62, g: 100, b: 255, duration: 1});
		gsap.to(s1, {r: 27, g: 22, b: 184, duration: 1});
		gsap.to(f2Hsl, {h: 164, s: 55, lM: 20, lB: 50, duration: 1});
		gsap.to(f1Hsl, {h: 156, s: 72, lM: 10, lB: 30, duration: 1});
	}, 74838 - 1 - SEEK * 1000);
	setTimeout(() => {
		explode(0);
	}, 87382 - SEEK * 1000);
	setTimeout(() => {
		explode(1);
	}, 88214 - SEEK * 1000);
	setTimeout(() => {
		revealText();
	}, 89111 - SEEK * 1000);
	let timeArr = [79309, 81999, 82922, 85112, 85318, 85581];
	let step = HEIGHT / (timeArr.length + 1);
	const SPEED1 = 10, SPEED2 = 40;
	const RANDOMIZATION = 5;
	const MIN_X = -5, MAX_X = 5;
	let speed;
	for (let i = 0; i < timeArr.length; i++) {
		setTimeout(() => {
			speed = (i % 2 == 0)? SPEED1 : SPEED2;
			speed += random(-RANDOMIZATION, RANDOMIZATION);
			spawnTextParticle(0, (i + 1) * step, speed, random(MIN_X, MAX_X), i % 2);
			spawnTextParticle(WIDTH, (i + 1) * step, -speed, random(MIN_X, MAX_X), i % 2);
		}, timeArr[i] - SEEK * 1000);
	}
	setTimeout(() => {
		gsap.to(scaleHeight, {v1: -100, v2: -100, duration: 3});
	}, 85112 - SEEK * 1000);
}