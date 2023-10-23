let WIDTH = innerWidth;
let HEIGHT = innerHeight;

addEventListener('keydown', e => {
	if (e.key == '`') location.reload();
});
function random(min, max) {
    return Math.random() * (max - min) + min;
}
function chance(a, b, chance) {
	return (Math.random() < chance)? a : b;
}
function cap(min, max, val) {
	if (val > max) return max;
	if (val < min) return min;
	return val;
}
function dot(c, x, y, radius, color) {
    c.fillStyle = color;
  	c.beginPath();
	c.arc(x, y, radius, 0, Math.PI * 2);
    c.fill();
}
function trace(c, x, y, radius, width, color) {
    c.strokeStyle = color;
    c.lineWidth = width;
  	c.beginPath();
	c.arc(x, y, radius, 0, Math.PI * 2);
	c.stroke();	
}
function scaleFactor() {
	return (WIDTH * HEIGHT - 1860480);
}