let f1Hsl = {h: 160, s: 75, lM: 30, lB: 50};
let f2Hsl = {h: 0, s: 75, lM: 25, lB: 35}
class Fountain extends Bar {
	constructor(x, y, width, height, type) {
		super(x, y, width, height);
		this.type = type;
	}
	draw(c) {
		this.y = HEIGHT;
		this.color = this.getColor(true);
		c.fillStyle = this.color;
		c.fillRect(this.x, this.y - this.height, this.width, this.height);
	}
	getColor(useDelta) {
		var sheet = (this.type == 0)? f1Hsl : f2Hsl;
		var divider = (this.type == 0)? 2 : 7;
		var l = (useDelta)? cap(0, 1, Math.abs(this.delta) / divider) * sheet.lM + sheet.lB : random(sheet.lB, sheet.lB + sheet.lM);
		return `hsl(${sheet.h}, ${sheet.s}%, ${l}%)`;
	}
}

let fountains = [];
function spawnFountains() {
	for (let i = 0; i < BUFFER_LENGTH * 2; i++) {
		barIndex = (i < BUFFER_LENGTH)? BUFFER_LENGTH - i: i - BUFFER_LENGTH;
		fountains.push(new Fountain(i * barWidth, HEIGHT, barWidth, barIndex, 1));
		barIndex = (i < BUFFER_LENGTH)? i: BUFFER_LENGTH * 2 - i - 1;
		fountains.push(new Fountain(i * barWidth, HEIGHT, barWidth, barIndex, 0));
	}
}

function initShowVisualizer() {
	spawnFountains();
}

const SHOW_SMOOTHING = 0.9;
let showArr;
function loadShowVisualizer() {
	if (AUDIO_CONTEXT == null) return;
	audioSource = getSource(AUDIO_CONTEXT, E32021);
	audioSource.disconnect();
	analyser = AUDIO_CONTEXT.createAnalyser();
	audioSource.connect(analyser);
	analyser.connect(AUDIO_CONTEXT.destination);
	analyser.fftSize = RESOLUTION;
	analyser.smoothingTimeConstant = SHOW_SMOOTHING;
	showArr = new Uint8Array(RESOLUTION / 2);
	E32021.volume = VOLUME;
	E32021.currentTime = SEEK;
	E32021.play();
	E32021.addEventListener('ended', () => {});
}

const D1SPAWN = 5, D2SPAWN = 7;
const X_SPREAD = 1, Y_FACTOR = -0.5, Y_FACTOR_SPREAD = 0.1;
let deltaSpawn, showForceFactor;
let scaleHeight = {v1: 350 / 1.25, v2: 850 / 1.25};
let radiusFactor;
function updateShowVisualizer() {
	if (showArr != null) analyser.getByteFrequencyData(showArr);
	else return;
	if (scaleHeight.v1 == 0) return;
	fountains.forEach(fountain => {
		fountain.setHeight(showArr[fountain.index] / 255 * (scaleFactor() / 15000 + ((fountain.type == 0)? scaleHeight.v1 : scaleHeight.v2)));
		deltaSpawn = (fountain.type == 0)? D1SPAWN : D2SPAWN;
		showForceFactor = (fountain.type == 0)? 3 : 0.5;
		radiusFactor = (fountain.type == 0)? 1 : 0.5;
		if (fountain.delta > deltaSpawn) {
			for (let i = 0; i < fountain.delta / deltaSpawn / 1.5; i++) {
				spawnParticle(fountain.x + fountain.width / 2, fountain.y - fountain.height - fountain.delta, 
				random(-X_SPREAD / 2, X_SPREAD / 2), fountain.delta * (Y_FACTOR + random(-Y_FACTOR_SPREAD, Y_FACTOR_SPREAD)) * showForceFactor, 
				fountain.delta * radiusFactor, fountain.getColor(false));
			}
		}
	});
}

function drawShowVisualizer(c, type) {
	fountains.forEach(fountain => {
		if (fountain.type == type) fountain.draw(c);
	});
}