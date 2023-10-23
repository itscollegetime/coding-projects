const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let audioContext = new AudioContext();
let audioSource;
let analyser;

addEventListener('mousedown', e => {
	PRE_ORDER.pause();
	PRE_ORDER.currentTime = 0;
	PRE_ORDER.play();
	initAnalyser(PRE_ORDER);
});

const RESOLUTION = 256;
function initAnalyser(audio) {
	if (audioSource != null) audioSource.disconnect();
	else {
		audioSource = audioContext.createMediaElementSource(audio);
	}
	analyser = audioContext.createAnalyser();
	audioSource.connect(analyser);
	analyser.connect(audioContext.destination);
	analyser.fftSize = RESOLUTION;
	analyser.smoothingTimeConstant = 0.9;
	const bufferLength = analyser.frequencyBinCount;
	const dataArray = new Uint8Array(bufferLength);

	// const barWidth = canvas.width / bufferLength;
	const barWidth = 2;
	let barHeight;
	let offset = 0;
	function animate() {
		requestAnimationFrame(animate);
		c.fillStyle = "rgb(0, 0, 0, 0.1)";
		c.fillRect(0, 0, canvas.width, canvas.height);
		analyser.getByteFrequencyData(dataArray);
		for (let i = 0; i < bufferLength; i++) {
			barHeight = dataArray[i] * 1;
			c.save();
			c.translate(canvas.width / 2, canvas.height / 2);
			c.rotate(((i + offset) / bufferLength) * 2 * Math.PI);
			// c.rotate(i * 2 * Math.PI / Math.sqrt(5))
			// c.rotate(((1 + Math.sqrt(5)) / 2) * 2 * Math.PI * i);
			c.fillStyle = "aquamarine";
			c.fillRect(0 - barWidth / 2, 100, barWidth, barHeight + 2);
			c.restore();
		}
		// offset += 1;
	}
	animate();
}