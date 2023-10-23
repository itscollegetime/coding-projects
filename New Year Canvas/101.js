const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const scale = 3;
const groundLevel = 0 * scale;

const blockWidth = 24 * scale;
const blockHeight = 20 * scale;
const subBlockOffset = 1.5 * scale;
const blockPlateWidth = 5 * scale;
const blockPlateHeight = 4 * scale;
const blockPlateStrokeWidth = 0.5 * scale;
const blockSeparatorWidth = 22 * scale;
const blockSeparatorHeight = 2 * scale;
const lightArcHeight = 2 * scale;
const lightArcWidth = 0.5 * scale;
const blockRodWidth = 1.25 * scale;
const blokcRodHeight = 4 * scale;
const windowRows = 10;
const windowCols = 6;
const windowBuffer = 2;
const windowGlowChance = 0.2;

const topSeparatorWidth = 15 * scale;
const topSeparatorHeight = 4 * scale;
const topBaseWidth = 9 * scale;
const topBlockWidth = 10.5 * scale;
const topBlockHeight = 18 * scale;
const finalBaseWidth = 5 * scale;
const finalBlockWidth = 4 * scale;
const finalBlockHeight = 4.5 * scale;
const dishBaseWidth = 1.5 * scale;
const dishWidth = 5 * scale;
const dishHeight = 1.5 * scale;
const rodBaseWidth = 2 * scale;
const rodWidth = 1.5 * scale;
const rodHeight = 10 * scale;
const glowRodHeight = 7 * scale;

const glowStripeSpacing = 2.5 * scale;
const glowStripeShrink = 0.4 * scale;
const glowStripeWidth = 1.5 * scale;
const stripSpacing = 3 * scale;
const lightStripeSpacing = 5 * scale;
const lightStripeWidth = 9 * scale;
const lightStripeShrink = 0.4 * scale;
const lightStripeBuffer = 2 * scale;
const lightStripeStrokeWidth = 1.25 * scale;

const baseWidth = 20 * scale;
const baseHeight = 50 * scale;
const groundWidth = 30 * scale;
const baseplateRadius = 5 * scale;
const baseplateWidth = 1 * scale;
const baseSquareWidth = 4.5 * scale;
const baseSquareStrokeWidth = 0.5 * scale;
const baseSeparatorOffset = 2 * scale;
const baseSeparatorWidth = 21 * scale;
const baseSeparatorHeight = 6 * scale;
const baseWindowRows = 23;
const baseWindowColBuffer = 2;
const baseWindowCols = 4;
const windowStripeExpand = 0.18 * scale;
const windowStripeWidth = 2.3 * scale;

const fillColor = "white";
const windowColor = "lime";
const glowColor = "gold";
const lightColor = "magenta";
const buildingColor = "dimGray";
const buildingColorLight = "slateGray";
const buildingColorDark = "darkSlateGray";
const frameColor = "teal";
const frameFillColor = "lightSlateGray";

const windowBlur = 5;
const lightBlur = 5;
const glowBlur = 10;
const emptyBlur = 0;

class Window {
	constructor(x, y, width, height, block, row) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.block = block;
		this.row = row;
		this.glow = (Math.random() < windowGlowChance)? 1 : 0;
		this.checked = false;
		this.animation = null;
	}
	draw() {
		//draw dark window
		c.fillStyle = buildingColorDark;
		c.shadowBlur = emptyBlur;
		c.fillRect(this.x, this.y, this.width, this.height);
		//draw light window
		c.fillStyle = fillColor;
		c.shadowBlur = windowBlur;
		c.shadowColor = windowColor;
		c.save();
		c.globalAlpha = this.glow;
		c.fillRect(this.x, this.y, this.width, this.height);
		c.restore();
	}
}

const windows = [];

function draw101(init) {
	let x = canvas.width / 2;
	let y = canvas.height - groundLevel;

	//base
	c.fillStyle = buildingColor;
	c.shadowBlur = emptyBlur;
	c.beginPath();
	c.moveTo(x - groundWidth / 2, y);
	c.lineTo(x + groundWidth / 2, y);
	c.lineTo(x + baseWidth / 2, y - baseHeight);
	c.lineTo(x - baseWidth / 2, y - baseHeight);
	c.closePath();
	c.fill();

	//base windows
	if (init) {
		let left = x - baseWidth / 2;
		let right = x + baseWidth / 2;
		let width = (right - left - (baseWindowCols + baseWindowColBuffer + 1) * windowBuffer) / (baseWindowCols + baseWindowColBuffer);
		let height = (baseHeight - baseSeparatorHeight - (baseWindowRows + 1) * windowBuffer) / baseWindowRows;
		for (let row = 0; row < baseWindowRows; row++) {
			for (let col = baseWindowColBuffer / 2; col < baseWindowCols + baseWindowColBuffer / 2; col++) {
				let window = new Window(left + col * (width + windowBuffer) + windowBuffer, 
					y - baseHeight + baseSeparatorHeight + row * (height + windowBuffer) + windowBuffer, 
					width, height, 0, baseWindowRows - row);
				window.draw();
				windows.push(window);
			}
			//window stripes
			let stripeWidth = windowStripeWidth + row * windowStripeExpand;
			let stripeX = x - windowBuffer / 2 - 2 * (width + windowBuffer) - stripeWidth;
			let stripeY = y - baseHeight + baseSeparatorHeight + row * (height + windowBuffer) + windowBuffer;
			let window = new Window(stripeX, stripeY, stripeWidth, height, 0, baseWindowRows - row);
			window.draw();
			windows.push(window);
			stripeX = x + windowBuffer / 2 + 2 * (width + windowBuffer);
			window = new Window(stripeX, stripeY, stripeWidth, height, 0, baseWindowRows - row);
			window.draw();
			windows.push(window);
		}
	}

	//blocks
	for (let i = 0; i < 8; i++) {
		let top = y - baseHeight - (i + 1) * blockHeight;
		let bottom = y - baseHeight - i * blockHeight
		//block
		c.fillStyle = buildingColorDark;
		c.shadowBlur = emptyBlur;
		c.beginPath();
		c.moveTo(x - baseWidth / 2, bottom);
		c.lineTo(x + baseWidth / 2, bottom);
		c.lineTo(x + blockWidth / 2, top);
		c.lineTo(x - blockWidth / 2, top);
		c.closePath();
		c.fill();

		//subblock
		c.fillStyle = buildingColor;
		c.shadowBlur = emptyBlur;
		c.beginPath();
		c.moveTo(x - baseWidth / 2 + subBlockOffset, bottom);
		c.lineTo(x + baseWidth / 2 - subBlockOffset, bottom);
		c.lineTo(x + blockWidth / 2 - subBlockOffset, top - subBlockOffset);
		c.lineTo(x - blockWidth / 2 + subBlockOffset, top - subBlockOffset);
		c.closePath();
		c.fill();

		//windwos
		if (init) {
			let left = x - (baseWidth - subBlockOffset) / 2;
			let right = x + (baseWidth - subBlockOffset) / 2;
			let width = (right - left - (windowCols + 1) * windowBuffer) / windowCols;
			let height = (blockHeight - subBlockOffset - (windowRows + 1) * windowBuffer) / windowRows;
			for (let row = 0; row < windowRows; row++) {
				for (let col = 0; col < windowCols; col++) {
					let window = new Window(left + col * (width + windowBuffer) + windowBuffer, top + row * (height + windowBuffer) + windowBuffer, 
						width, height, i + 1, baseWindowRows + windowRows - row + i * windowRows);
					window.draw();
					windows.push(window);
				}
			}
		}
	}

	if (!init) {
		windows.forEach(window => window.draw());
	}

	let top = y - baseHeight - 8 * blockHeight - blockSeparatorHeight;
	//top separator
	c.fillStyle = frameFillColor;
	c.shadowBlur = emptyBlur;
	c.fillRect(x - topSeparatorWidth / 2, top - topSeparatorHeight, topSeparatorWidth, topSeparatorHeight);
	top -= topSeparatorHeight;
	//top block
	c.fillStyle = buildingColor;
	c.shadowBlur = emptyBlur;
	c.beginPath();
	c.moveTo(x - topBaseWidth / 2, top);
	c.lineTo(x + topBaseWidth / 2, top);
	c.lineTo(x + topBlockWidth / 2, top - topBlockHeight);
	c.lineTo(x - topBlockWidth / 2, top - topBlockHeight);
	c.closePath();
	c.fill();
	top -= topBlockHeight;
	//final block
	c.fillStyle = buildingColorLight;
	c.shadowBlur = emptyBlur;
	c.beginPath();
	c.moveTo(x - finalBaseWidth / 2, top);
	c.lineTo(x + finalBaseWidth / 2, top);
	c.lineTo(x + finalBlockWidth / 2, top - finalBlockHeight);
	c.lineTo(x - finalBlockWidth / 2, top - finalBlockHeight);
	c.closePath();
	c.fill();
	//glow stripe
	for (let i = 0; i < 3; i++) {
		c.strokeStyle = fillColor;
		c.shadowColor = glowColor;
		c.shadowBlur = glowBlur;
		c.lineWidth = glowStripeWidth;
		c.beginPath();
		c.moveTo(x - (topBlockWidth - i * glowStripeShrink) / 2, top + i * glowStripeSpacing);
		c.lineTo(x + (topBlockWidth - i * glowStripeShrink) / 2, top + i * glowStripeSpacing);
		c.closePath();
		c.stroke();
	}
	// //light stripe
	for (let i = 0; i < 4; i++) {
		let y = top + 2 * glowStripeSpacing + stripSpacing + i * glowStripeSpacing;
		c.strokeStyle = fillColor;
		c.shadowColor = lightColor;
		c.shadowBlur = lightBlur;
		c.lineWidth = lightStripeStrokeWidth;
		c.beginPath();
		c.moveTo(x - lightStripeBuffer / 2, y);
		c.lineTo(x - (lightStripeWidth - i * lightStripeShrink) / 2, y);
		c.closePath();
		c.stroke();
		c.beginPath();
		c.moveTo(x + lightStripeBuffer / 2, y);
		c.lineTo(x + (lightStripeWidth - i * lightStripeShrink) / 2, y);
		c.closePath();
		c.stroke();
	}
	top -= finalBlockHeight;
	//dish
	c.fillStyle = frameFillColor;
	c.shadowBlur = emptyBlur;
	c.beginPath();
	c.moveTo(x - dishBaseWidth / 2, top);
	c.lineTo(x + dishBaseWidth / 2, top);
	c.lineTo(x + dishWidth / 2, top - dishHeight);
	c.lineTo(x - dishWidth / 2, top - dishHeight);
	c.closePath();
	c.fill();
	top -= dishHeight;
	//rod
	c.fillStyle = buildingColorDark;
	c.shadowBlur = emptyBlur;
	c.beginPath();
	c.moveTo(x - rodBaseWidth / 2, top);
	c.lineTo(x + rodBaseWidth / 2, top);
	c.lineTo(x + rodWidth / 2, top - rodHeight);
	c.lineTo(x - rodWidth / 2, top - rodHeight);
	c.closePath();
	c.fill();
	top -= rodHeight;
	//glow rod
	c.fillStyle = fillColor;
	c.shadowBlur = glowBlur;
	c.shadowColor = glowColor;
	c.fillRect(x - rodWidth / 2, top - glowRodHeight, rodWidth, glowRodHeight);

	for (let i = 0; i < 8; i++) {
		let top = y - baseHeight - (i + 1) * blockHeight;
		let bottom = y - baseHeight - i * blockHeight

		//block separator
		c.fillStyle = buildingColorLight;
		c.shadowBlur = emptyBlur;
		c.fillRect(x - blockSeparatorWidth / 2, top - blockSeparatorHeight, blockSeparatorWidth, blockSeparatorHeight);

		//light arc
		c.strokeStyle = fillColor;
		c.shadowColor = lightColor;
		c.shadowBlur = lightBlur;
		c.lineWidth = lightArcWidth;
		c.beginPath();
		c.moveTo(x + blockPlateWidth / 2, top - lightArcHeight / 6);
		c.quadraticCurveTo(x + blockSeparatorWidth / 4, top - lightArcHeight, x + blockSeparatorWidth / 2, 
			top - lightArcHeight / 1.5);
		c.stroke();
		c.beginPath();
		c.moveTo(x - blockPlateWidth / 2, top - lightArcHeight / 6);
		c.quadraticCurveTo(x - blockSeparatorWidth / 4, top - lightArcHeight, x - blockSeparatorWidth / 2, 
			top - lightArcHeight / 1.5);
		c.stroke();

		//block rod
		c.fillStyle = fillColor;
		c.shadowBlur = glowBlur;
		c.shadowColor = glowColor;
		c.fillRect(x - blockRodWidth / 2, top, blockRodWidth, blokcRodHeight);

		//block plate
		c.fillStyle = frameFillColor;
		c.strokeStyle = buildingColorDark;
		c.shadowBlur = emptyBlur;
		c.lineWidth = blockPlateStrokeWidth;
		c.beginPath();
		c.moveTo(x - blockPlateWidth / 2, top);
		c.bezierCurveTo(x - blockPlateWidth / 2, top + blockPlateHeight / 2, x + blockPlateWidth / 2, top + blockPlateHeight / 2,
			x + blockPlateWidth / 2, top);
		c.bezierCurveTo(x + blockPlateWidth / 2, top - blockPlateHeight / 2, x - blockPlateWidth / 2, top - blockPlateHeight / 2,
			x - blockPlateWidth / 2, top);
		c.closePath();
		c.fill();
		c.stroke();
	}

	//base separator
	c.fillStyle = buildingColorLight;
	c.shadowBlur = emptyBlur;
	c.fillRect(x - baseSeparatorWidth / 2, y - baseHeight+ baseSeparatorOffset  - baseSeparatorHeight / 2, baseSeparatorWidth, baseSeparatorHeight);

	//baseplate
	c.fillStyle = fillColor;
	c.strokeStyle = frameColor;
	c.shadowColor = glowColor;
	c.shadowBlur = glowBlur;
	c.lineWidth = baseplateWidth;
	c.beginPath();
	c.arc(x, y - baseHeight, baseplateRadius, Math.PI * 2, false);
	c.closePath();
	c.fill();
	c.stroke();
	c.fillStyle = buildingColorLight;
	c.strokeStyle = lightColor;
	c.lineWidth = baseSquareStrokeWidth;
	c.fillRect(x - baseSquareWidth / 2, y - baseHeight - baseSquareWidth / 2, baseSquareWidth, baseSquareWidth);
	c.strokeRect(x - baseSquareWidth / 2, y - baseHeight - baseSquareWidth / 2, baseSquareWidth, baseSquareWidth);
}