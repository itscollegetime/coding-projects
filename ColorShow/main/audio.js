const PRE_ORDER = new Audio("./sounds/Pre-Order.mp3");
const E32019 = new Audio("./sounds/MSFS E3 Trailer 2019 Music.mp3");
const E32021 = new Audio("./sounds/MSFS E3 Trailer 2021 Music.mp3");
const COLOR1 = new Audio("./sounds/MSFS Color 1.mp3");
const COLOR2 = new Audio("./sounds/MSFS Color 2.mp3");
const CIPHER = new Audio("./sounds/Cipher.mp3");
const INSTANT_CRUSH = new Audio("./sounds/Instant Crush.mp3");
const MORROW = new Audio("./sounds/Morrow.mp3");
const BLUE_TERRAIN = new Audio("./sounds/Blue Terrain.mp3");
const SKIPPY = new Audio("./sounds/Skippy.mp3");
const STUCK_IN_THE_AIR = new Audio("./sounds/Stuck In The Air.mp3");
const TAKE_TO_THE_SKY = new Audio("./sounds/Take To The Sky.mp3");
const WHERE_NO_ONE_GOES = new Audio("./sounds/Where No One Goes Reprise.mp3");
const PLAYLIST = [COLOR1, COLOR2, CIPHER, INSTANT_CRUSH, 
MORROW, BLUE_TERRAIN, SKIPPY, STUCK_IN_THE_AIR, TAKE_TO_THE_SKY, 
WHERE_NO_ONE_GOES]
const SOURCES = new Map();

function getSource(context, audio) {
	if (!SOURCES.has(audio)) SOURCES.set(audio, context.createMediaElementSource(audio));
	return SOURCES.get(audio);
}

function getDescription(audio) {
	if (audio == PRE_ORDER) return "Fishing Move Inc. - MSFS Pre-Order Trailer";
	if (audio == E32019) return "Fishing Move Inc. - MSFS E3 Trailer 2019";
	if (audio == E32021) return "Fishing Move Inc. - MSFS E3 Trailer 2021";
	if (audio == COLOR1) return "Fishing Move Inc. - Color 1";
	if (audio == COLOR2) return "Fishing Move Inc. - Color 2";
	if (audio == CIPHER) return "LEMMiNO - Cipher";
	if (audio == INSTANT_CRUSH) return "Corbyn Kites - Instant Crush";
	if (audio == MORROW) return "Blomma - Morrow";
	if (audio == BLUE_TERRAIN) return "Refeeld x Project AER - Blue Terrain";
	if (audio == SKIPPY) return "Beau Cooper - Skippy";
	if (audio == STUCK_IN_THE_AIR) return "The Tower of Light - Stuck In The Air";
	if (audio == TAKE_TO_THE_SKY) return "Rush Garcia - Take To The Sky";
	if (audio == WHERE_NO_ONE_GOES) return "John Powell x Jónsi - Where No One Goes";
	return "Unknown audio";
}