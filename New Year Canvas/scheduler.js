let row = 0;

function check() {
	let buildup;
	setTimeout(() => {
		this.glow(0.5);
		fade(2500);
		let glow = 0.25;
		buildup = setInterval(() => {
			row ++;
			glow += 0.5 / (8 * windowRows + baseWindowRows);
			windows.forEach(w => {
				if (w.row <= row) {
					w.animation.kill();
					w.checked = true;
					w.glow = glow;
				}
			});
		}, (37750 - 6500 - 10) / (8 * windowRows + baseWindowRows));

	}, 6500 - seekOffset);
	setTimeout(() => {
		this.glow(1);
		fade(2500);
	}, 22145 - seekOffset);
	setTimeout(() => {
		this.glow(1);
		fade(2500);
	}, 28300 - seekOffset);
	setTimeout(() => {
		clearInterval(buildup);
		this.glow(1);
		windows.forEach(w => w.checked = false);
		fade(40750 - 37750);
	}, 37750 - seekOffset);
	setTimeout(() => {
		glow(1);
		fire(12, 2, 45, 'oldLace', 43400 - 40700);
		fire(22, 2, 45, 'oldLace', 43400 - 40700);
		playLaunch();
	}, 40700 - seekOffset);
	setTimeout(() => {
		fire(11, 1, 60, 'yellow', 43800 - 43000);
		fire(21, 1, 60, 'yellow', 43800 - 43000);
		playLaunch();
	}, 43000 - seekOffset)
	setTimeout(() => {
		playExplosion(false);
		fire(13, 1, 60, 'deepPink', 43800 - 43400);
		fire(23, 1, 60, 'deepPink', 43800 - 43400);
		playLaunch();
	}, 43400 - seekOffset)
	setTimeout(() => {
		playExplosion();
	}, 43800 - seekOffset);

	setTimeout(() => {
		fire(14, 0, 30, 'gold', 49100 - 46100);
		fire(24, 0, 30, 'gold', 49100 - 46100);
		playLaunch();
	}, 46100 - seekOffset);
	setTimeout(() => {
		fire(15, 3, 70, 'fuchsia', 49100 - 46900);
		fire(25, 3, 70, 'fuchsia', 49100 - 46900);
		playLaunch();
	}, 46900 - seekOffset);
	

	setTimeout(() => {
		playExplosion(false);
		playExplosion(true);
		fire(16, 1, 45, 'azure', 50500 - 49100);
		fire(26, 1, 45, 'azure', 50500 - 49100);
		playLaunch();
	}, 49100 - seekOffset);
	setTimeout(() => {
		fire(17, 1, 60, 'chocolate', 50500 - 49600);
		fire(27, 1, 60, 'chocolate', 50500 - 49600);
		playLaunch();
	}, 49600 - seekOffset);
	setTimeout(() => {
		fire(18, 1, 80, 'darkOrchid', 50500 - 50000);
		fire(28, 1, 80, 'darkOrchid', 50500 - 50000);
		playLaunch();
	}, 50000 - seekOffset);

	setTimeout(() => {
		playExplosion(false);
		fire(11, 3, 50, 'lime', 52700 - 50500);
		fire(21, 3, 50, 'lime', 52700 - 50500);
		fire(12, 2, 80, 'magenta', 53200 - 50500);
		fire(22, 2, 80, 'magenta', 53200 - 50500);
		playLaunch();
	}, 50500 - seekOffset);

	setTimeout(() => {
		fire(13, 3, 60, 'mediumPurple', 52700 - 51100);
		fire(23, 3, 60, 'mediumPurple', 52700 - 51100);
		fire(14, 2, 80, 'midnightBlue', 52300 - 51100);
		fire(24, 2, 80, 'midnightBlue', 52300 - 51100);
		playLaunch();
	}, 51100 - seekOffset);

	setTimeout(() => {
		fire(15, 3, 70, 'orangeRed', 52700 - 51700);
		fire(25, 3, 70, 'orangeRed', 52700 - 51700);
		fire(16, 2, 80, 'skyBlue', 52300 - 51700);
		fire(26, 2, 80, 'skyBlue', 52300 - 51700);
		playLaunch();
	}, 51700 - seekOffset);

	setTimeout(() => {
		playExplosion(false);
		fire(17, 1, 60, 'turquoise', 53000 - 52300);
		fire(27, 1, 60, 'turquoise', 53000 - 52300);
		playLaunch();
	}, 52300 - seekOffset);
	setTimeout(() => {
		playExplosion(true);
		fire(18, 3, 90, 'violet', 53000 - 52700);
		fire(28, 3, 90, 'violet', 53000 - 52700);
		playLaunch();
	}, 52700 - seekOffset);
	setTimeout(() => {
		playExplosion(false);
		fire(11, 0, 30, 'floralWhite', 54978 - 53000);
		playLaunch();
	}, 53000 - seekOffset);

	setTimeout(() => {
		fire(21, 1, 30, 'lightBlue', 54977 - 54400);
		playLaunch();
	}, 54400 - seekOffset);

	setTimeout(() => {
		playExplosion(false);
		fire(22, 0, 30, 'floralWhite', 56300 - 54978);
		playLaunch();
	}, 54978 - seekOffset);

	setTimeout(() => {
		fire(12, 1, 30, 'lightBlue', 56300 - 55500);
		playLaunch();
	}, 55500 - seekOffset);

	setTimeout(() => {
		playExplosion(false);
		fire(13, 0, 30, 'floralWhite', 57500 - 56300);
		playLaunch();
	}, 56300 - seekOffset);

	setTimeout(() => {
		fire(23, 1, 30, 'lightBlue', 57500 - 57000);
		playLaunch();
	}, 57000 - seekOffset);

	setTimeout(() => {
		playExplosion(false);
		fire(24, 0, 30, 'floralWhite', 58700 - 57500);
		playLaunch();
	}, 57500 - seekOffset);

	setTimeout(() => {
		fire(14, 1, 30, 'lightBlue', 58700 - 57500);
		playLaunch();
	}, 58200 - seekOffset);

	setTimeout(() => {
		playExplosion(false);
		fire(15, 3, 60, 'lemonChiffon', 59500 - 58700);
		fire(25, 3, 60, 'lemonChiffon', 59500 - 58700);
		fire(16, 3, 70, 'mediumTurquoise', 59500 - 58700);
		fire(26, 3, 70, 'mediumTurquoise', 59500 - 58700);
		playLaunch();
	}, 58700 - seekOffset);

	setTimeout(() => {
		playExplosion(true);
		fire(17, 3, 80, 'lightCyan', 61850 - 59500);
		fire(27, 3, 80, 'lightCyan', 61850 - 59500);
		fire(18, 3, 90, 'tomato', 61850 - 59500);
		fire(28, 3, 90, 'tomato', 61850 - 59500);
		playLaunch();
	}, 59500 - seekOffset);

	setTimeout(() => {
		playExplosion(true);
	}, 61850 - seekOffset);

	setTimeout(() => {
		let time = 64200 - 62600;
		fire(11, 2, 80, 'salmon', time);
		fire(21, 2, 80, 'salmon', time);
		fire(12, 2, 80, 'salmon', time);
		fire(22, 2, 80, 'salmon', time);
		fire(13, 2, 80, 'salmon', time);
		fire(23, 2, 80, 'salmon', time);
		fire(14, 2, 80, 'salmon', time);
		fire(24, 2, 80, 'salmon', time);
		playLaunch();
	}, 62600 - seekOffset);

	setTimeout(() => {
		fire(15, 2, 85, 'salmon', 64200 - 63200);
		fire(25, 2, 85, 'salmon', 64200 - 63200);
		fire(16, 2, 85, 'purple', 64200 - 63200);
		fire(26, 2, 85, 'purple', 64200 - 63200);
		fire(17, 2, 85, 'mocacasin', 64200 - 63200);
		fire(27, 2, 85, 'mocacasin', 64200 - 63200);
		playLaunch();
	}, 63200 - seekOffset);

	setTimeout(() => {
		fire(18, 1, 90, 'springGreen', 64200 - 63750);
		fire(28, 1, 90, 'springGreen', 64200 - 63750);
		fire(19, 3, 80, 'powderBlue', 65700 - 63750);
		fire(29, 3, 80, 'powderBlue', 65700 - 63750);
		playLaunch();
	}, 63750 - seekOffset);

	setTimeout(() => {
		playExplosion(false);
		let time = 65700 - 64200;
		fire(11, 1, 80, 'mintCream', time);
		fire(21, 1, 80, 'mintCream', time);
		fire(12, 1, 80, 'mintCream', time);
		fire(22, 1, 80, 'mintCream', time);
		fire(13, 1, 80, 'mintCream', time);
		fire(23, 1, 80, 'mintCream', time);
		fire(14, 1, 80, 'mintCream', time);
		fire(24, 1, 80, 'mintCream', time);
		playLaunch();
	}, 64200 - seekOffset);

	setTimeout(() => {
		let time = 65700 - 64950;
		fire(15, 1, 80, 'mintCream', time);
		fire(25, 1, 80, 'mintCream', time);
		fire(16, 1, 80, 'mintCream', time);
		fire(26, 1, 80, 'mintCream', time);
		fire(17, 1, 80, 'mintCream', time);
		fire(27, 1, 80, 'mintCream', time);
		fire(18, 1, 80, 'mintCream', time);
		fire(28, 1, 80, 'mintCream', time);
		playLaunch();
	}, 64950 - seekOffset);

	setTimeout(() => {
		playExplosion(true);
		playExplosion(false);
		fade(66700 - 65700);
	}, 65700 - seekOffset);

	setTimeout(() => {
		show(68800 - 66700);
	}, 66700 - seekOffset);

	setTimeout(() => {
		let time = 70375 - 68800;
		fire(11, 1, 10, 'paleGoldenRod', time);
		fire(21, 1, 10, 'paleGoldenRod', time);
		fire(12, 1, 20, 'paleGoldenRod', time);
		fire(22, 1, 20, 'paleGoldenRod', time);
		fire(13, 1, 30, 'paleGoldenRod', time);
		fire(23, 1, 30, 'paleGoldenRod', time);
		fire(14, 1, 40, 'paleGoldenRod', time);
		fire(24, 1, 40, 'paleGoldenRod', time);
		fire(15, 1, 50, 'paleGoldenRod', time);
		fire(25, 1, 50, 'paleGoldenRod', time);
		fire(16, 1, 60, 'paleGoldenRod', time);
		fire(26, 1, 60, 'paleGoldenRod', time);
		fire(17, 1, 70, 'paleGoldenRod', time);
		fire(27, 1, 70, 'paleGoldenRod', time);
		fire(18, 1, 80, 'paleGoldenRod', time);
		fire(28, 1, 80, 'paleGoldenRod', time);
		fire(19, 1, 90, 'paleGoldenRod', time);
		fire(29, 1, 90, 'paleGoldenRod', time);
		playLaunch();
		playLaunch();
		playLaunch();
		playLaunch();
	}, 68800 - seekOffset);

	setTimeout(() => {
		playExplosion(false);
		playExplosion(false);
		playExplosion(false);		
	}, 70375 - seekOffset);

	setTimeout(() => {
		let time = 75000 - 71950;
		fire(11, 1, 45, 'plum', time);
		fire(21, 1, 45, 'plum', time);
		fire(12, 1, 50, 'plum', time);
		fire(22, 1, 50, 'plum', time);
		fire(13, 1, 55, 'plum', time);
		fire(23, 1, 55, 'plum', time);
		fire(14, 1, 60, 'plum', time);
		fire(24, 1, 60, 'plum', time);
		fire(15, 1, 65, 'plum', time);
		fire(25, 1, 65, 'plum', time);
		fire(16, 1, 70, 'plum', time);
		fire(26, 1, 70, 'plum', time);
		fire(17, 1, 75, 'plum', time);
		fire(27, 1, 75, 'plum', time);
		fire(18, 1, 80, 'plum', time);
		fire(28, 1, 80, 'plum', time);
		fire(19, 1, 85, 'plum', time);
		fire(29, 1, 85, 'plum', time);
		playLaunch();
		playLaunch();
		playLaunch();
		playLaunch();
	}, 71950 - seekOffset);

	setTimeout(() => {
		playExplosion(false);
		playExplosion(false);
		playExplosion(false);
		let time = 75000 - 74300;
		fire(11, 2, 50, 'skyBlue', time);
		fire(21, 2, 50, 'skyBlue', time);
		fire(12, 2, 60, 'skyBlue', time);
		fire(22, 2, 60, 'skyBlue', time);
		fire(13, 2, 70, 'skyBlue', time);
		fire(23, 2, 70, 'skyBlue', time);
		playLaunch();
	}, 74300 - seekOffset);

	setTimeout(() => {
		playExplosion(false);
		let time = 77400 - 74600;
		fire(14, 1, 80, 'skyBlue', time);
		fire(24, 1, 80, 'skyBlue', time);
		fire(15, 1, 90, 'skyBlue', time);
		fire(25, 1, 90, 'skyBlue', time);
		fire(16, 1, 100, 'skyBlue', time);
		fire(26, 1, 100, 'skyBlue', time);
		playLaunch();
	}, 74600 - seekOffset);

	setTimeout(() => {
		playExplosion(false);
		let time = 77400 - 75000;
		fire(17, 0, 110, 'skyBlue', time);
		fire(27, 0, 110, 'skyBlue', time);
		fire(18, 0, 120, 'skyBlue', time);
		fire(28, 0, 120, 'skyBlue', time);
		fire(19, 0, 130, 'skyBlue', time);
		fire(29, 0, 130, 'skyBlue', time);
		playLaunch();
	}, 75000 - seekOffset);

	let duration = 2500;
	let angle = 40;
	setTimeout(() => {
		fire(11, 0, angle, 'violet', duration);
		fire(21, 0, angle, 'violet', duration);
		playLaunch();
	}, 77400 - seekOffset);
	setTimeout(() => {
		fire(12, 0, angle, 'violet', duration);
		fire(22, 0, angle, 'violet', duration);
		playLaunch();
	}, 77750 - seekOffset);
	setTimeout(() => {
		fire(13, 0, angle, 'violet', duration);
		fire(23, 0, angle, 'violet', duration);
		playLaunch();
	}, 78100 - seekOffset);
	setTimeout(() => {
		fire(14, 0, angle, 'violet', duration);
		fire(24, 0, angle, 'violet', duration);
		playLaunch();
	}, 78750 - seekOffset);
	setTimeout(() => {
		fire(15, 0, angle, 'violet', duration);
		fire(25, 0, angle, 'violet', duration);
		playLaunch();
	}, 79250 - seekOffset);
	setTimeout(() => {
		fire(16, 0, angle, 'violet', duration);
		fire(26, 0, angle, 'violet', duration);
		playLaunch();
	}, 80000 - seekOffset);
	setTimeout(() => {
		fire(17, 0, angle, 'violet', duration);
		fire(27, 0, angle, 'violet', duration);
		playLaunch();
	}, 80450 - seekOffset);
	setTimeout(() => {
		fire(18, 0, angle, 'violet', duration);
		fire(28, 0, angle, 'violet', duration);
		playLaunch();
	}, 80800 - seekOffset);

	setTimeout(() => {
		launchAll(0, 60, 'wheat', duration);
	}, 81300 - seekOffset);

	setTimeout(() => {
		fire(19, 0, 70, 'snow', 83650 - 82700);
		fire(29, 0, 70, 'snow', 83650 - 82700);
		playLaunch();
	}, 82700 - seekOffset);

	setTimeout(() => {
		fire(15, 0, 70, 'snow', 84400 - 83650);
		fire(25, 0, 70, 'snow', 84400 - 83650);
		playLaunch();
	}, 83650 - seekOffset);

	setTimeout(() => {
		fire(11, 0, 70, 'snow', 83650 - 82300);
		fire(21, 0, 70, 'snow', 83650 - 82300);
		playLaunch();
	}, 84400 - seekOffset);

	setTimeout(() => {
		launchAll(0, 70, 'blueViolet', 1000);
	}, 87600 - seekOffset);

	setTimeout(() => {
		fire(19, 3, 77, 'gold', 96900 - 89850);
		fire(29, 3, 77, 'gold', 96900 - 89850);
		fire(19, 3, 75, 'gold', 96900 - 89850);
		fire(29, 3, 75, 'gold', 96900 - 89850);
		fire(19, 3, 80, 'gold', 96900 - 89850);
		fire(29, 3, 80, 'gold', 96900 - 89850);
		playLaunch();
		playLaunch();
	}, 89850 - seekOffset);

	setTimeout(() => {
		launchAll(0, 50, 'cornflowerBlue', 92150 - 90650);
	}, 90650 - seekOffset);

	setTimeout(() => {
		launchAll(0, 60, 'cornsilk', 93750 - 92150);
	}, 92150 - seekOffset);

	setTimeout(() => {
		launchAll(0, 70, 'crimson', 95300 - 93750);
	}, 93750 - seekOffset);

	setTimeout(() => {
		launchAll(0, 80, 'blue', 96100 - 95300);
	}, 95300 - seekOffset);

	setTimeout(() => {
		gsap.to(countdown.style, {
			opacity: 0,
			duration: (96900 - 96100) / 1000
		});
		gsap.to(ending.style, {
			opacity: 1,
			duration: (96900 - 96100) / 1000
		});
	}, 96100 - seekOffset);

	setTimeout(() => {
		playExplosion(true);
		playExplosion(true);
	}, 96900 - seekOffset);
}

function glow(glow) {
	windows.forEach(w => {
		if (w.animation != null) w.animation.kill();
		if (!w.checked) w.glow = glow;
	});
}

function fade(fadeTime) {
	windows.forEach(w => {
		w.animation = gsap.to(w, {
			glow: 0,
			duration: fadeTime / 1000
		});
	});
}

function show(showTime) {
	windows.forEach(w => {
		w.animation = gsap.to(w, {
			glow: 1,
			duration: showTime / 1000
		});
	});
}

function launchAll(type, angle, color, duration) {
		fire(11, type, angle, color, duration);
		fire(21, type, angle, color, duration);
		fire(12, type, angle, color, duration);
		fire(22, type, angle, color, duration);
		fire(13, type, angle, color, duration);
		fire(23, type, angle, color, duration);
		fire(14, type, angle, color, duration);
		fire(24, type, angle, color, duration);
		fire(15, type, angle, color, duration);
		fire(25, type, angle, color, duration);
		fire(16, type, angle, color, duration);
		fire(26, type, angle, color, duration);
		fire(17, type, angle, color, duration);
		fire(27, type, angle, color, duration);
		fire(18, type, angle, color, duration);
		fire(28, type, angle, color, duration);
		fire(19, type, angle, color, duration);
		fire(29, type, angle, color, duration);
		playLaunch();
		playLaunch();
		playLaunch();
		playLaunch();
}