let AUDIO_CONTEXT;
let audioSource;
let analyser;

const BUFFER = 5;
const DELTA_CAP = 2.5;
class Bar {
	constructor(x, y, width, index) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.index = index;
		this.delta = 0;
		this.height = 0;
	}
	setHeight(height) {
		if (Math.abs(height - this.height) >= DELTA_CAP) this.delta = height - this.height;
		else this.delta = 0;
		this.height = height;
	}
	draw(c) {
		this.y = bannerStart + timer.offsetHeight;
		c.fillStyle = `hsl(${hsl.h}, ${hsl.s}%, ${cap(0, 1, Math.abs(this.delta) / 5) * 30 + hsl.l}%)`;
		c.fillRect(this.x, this.y - this.height - BUFFER, this.width - BUFFER / 2, this.height + BUFFER);
		c.fillRect(this.x, this.y + BUFFER, this.width - BUFFER / 2, this.delta);
	}
}

const RESOLUTION = 512;
const FREQUENCY_CAP = RESOLUTION / 4;
const BUFFER_LENGTH = RESOLUTION / 2 - FREQUENCY_CAP;
let bars = [];
let barWidth;
function spawnBars() {
	for (let i = 0; i < BUFFER_LENGTH * 2; i++) {
		barIndex = (i < BUFFER_LENGTH)? i: BUFFER_LENGTH * 2 - i - 1;
		bars.push(new Bar(i * barWidth, bannerStart + timer.offsetHeight, 
			barWidth, barIndex));
	}
}

let index = 0;
let limit = {index: -1};
function initVisualizer() {
	barWidth = WIDTH / (BUFFER_LENGTH * 2);
	spawnBars();
	PLAYLIST.forEach(audio => {
		audio.addEventListener('ended', () => {
			loadNext();
		});
	});
}

const SMOOTHING = 0.9;
const VOLUME = 1;
let arr;
let playing;
function loadSong(audio, time) {
	if (AUDIO_CONTEXT == null) return;
	audioSource = getSource(AUDIO_CONTEXT, audio);
	audioSource.disconnect();
	if (playing != null) playing.pause();
	bars.forEach(bar => {
		bar.height = 0;
		bar.delta = 0;
	});
	analyser = AUDIO_CONTEXT.createAnalyser();
	audioSource.connect(analyser);
	analyser.connect(AUDIO_CONTEXT.destination);
	analyser.fftSize = RESOLUTION;
	analyser.smoothingTimeConstant = SMOOTHING;
	arr = new Uint8Array(RESOLUTION / 2);
	audio.volume = VOLUME;
	audio.currentTime = (time != null)? time : 0;
	audio.play();
	playing = audio;
}

let barHeight;
function updateVisualizer(c) {
	if (passed) return;
	if (analyser != null) analyser.getByteFrequencyData(arr);
	bars.forEach(bar => {
		bar.setHeight((arr != null)? arr[bar.index] / 255 * (scaleFactor() / 10000 + 255) : 0);
		if (bar.index <= limit.index) bar.draw(c);
	});
}
var locked = false;
addEventListener('mouseup', e => {
	if (AUDIO_CONTEXT == null) {
		AUDIO_CONTEXT = new AudioContext();
		if (locked) 
			if (mark17sec) {
				toggleDisplay(false, () => {});
				if (passed) startShow();
			} else setDisplayText("Entering terminal countdown");
	}
	if (e.button != 0) return;
	if (loading || paused || locked) return;
	if (playing == null) {
		loadNext();
	} else {
		loading = true;
		toggleDisplay(false, () => {});
		unload(() => loadNext());
	}
});
var paused = false;
addEventListener('keydown', e => {
	if (loading || playing == null || locked) return;
	if (e.key == " ") {
		if (paused) {
			gsap.to(playing, {volume: VOLUME, duration: 2});
			load();
			playing.play();
			paused = false;
			togglePause(paused);
		} else {
			unload(() => {
				playing.pause();
				paused = true;
			});
			togglePause(!paused);
		}
	}
})
function unload(onComplete) {
	loading = true;
	gsap.to(limit, {index: -1, duration: 2, onComplete: () => loading = false});
	if (playing != null) gsap.to(playing, {volume: 0, duration: 2, onComplete: onComplete});
}
var loading = false;
function load() {
	loading = true;
	gsap.to(limit, {index: FREQUENCY_CAP, duration: 2, onComplete: () => loading = false});
}
function loadNext() {
	if (locked) return;
	load();
	loadSong(PLAYLIST[index]);
	setDisplay(playing);
	if (index < PLAYLIST.length - 1) index++;
	else index = 0;
}
function loadSpecific(audio, time) {
	load();
	loadSong(audio, time);
	if (!mark17sec) setDisplay(playing);
}