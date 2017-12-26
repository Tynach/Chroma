"use strict"

function chromaCoords(x, y) {
	return [x, y, 1 - x - y];
}

function primaries(rx, ry, gx, gy, bx, by) {
	var r = chromaCoords(rx, ry);
	var g = chromaCoords(gx, gy);
	var b = chromaCoords(bx, by);

	return r.concat(g).concat(b);
}

function transfer(power, off, slope, toLinCutoff, toGamCutoff) {
	this.power = power;
	this.off = off;
	this.slope = slope;
	this.toLinCutoff = toLinCutoff;
	this.toGamCutoff = toGamCutoff;
}

function colorspace(primaries, white, trc) {
	this.primaries = primaries;
	this.white = white;
	this.trc = trc;
}

const primaries709 = primaries(
	0.64, 0.33,
	0.3, 0.6,
	0.15, 0.06
);

const primaries2020 = primaries(
	0.708, 0.292,
	0.17, 0.797,
	0.131, 0.046
);

const primariesNtsc = primaries(
	0.67, 0.33,
	0.21, 0.71,
	0.14, 0.08
);

const whiteC = chromaCoords(0.310063, 0.316158);
const whiteD65 = chromaCoords(0.312713, 0.329016);

const gamSrgb = new transfer(2.4, 0.055, 12.92, 0.04045, 0.0031308);
const gam170m = new transfer(1.0/0.45, 0.099, 4.5, 0.0812, 0.018);

const Ntsc = new colorspace(primariesNtsc, whiteC, gam170m);
const Srgb = new colorspace(primaries709, whiteD65, gamSrgb);
const Rec709 = new colorspace(primaries709, whiteD65, gam170m);
const Rec2020 = new colorspace(primaries2020, whiteD65, gam170m);

var state = {
	from: JSON.parse(JSON.stringify(Srgb)),
	to: JSON.parse(JSON.stringify(Srgb))
}