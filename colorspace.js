"use strict"

/******************************************************************************
 * This file defines a set of functions and classes which can be used to make *
 * RGB colorspaces using CIE xy chromaticity coordinates                      *
 ******************************************************************************/

// Expands an xy pair into a 3D xyz coordinate
function chromaCoords(x, y) {
	const coords = [x, y, 1 - x - y];
	return coords;
}

// Builds a matrix of RGB chromaticity coordinates in xyz space
function primaries(rx, ry, gx, gy, bx, by) {
	const mat = [
		rx, ry, 1 - rx - ry,
		gx, gy, 1 - gx - gy,
		bx, by, 1 - bx - by
	];

	return mat;
}

// Builds an object containing gamma curve parameters
function transfer(power, off, slope, toLinCutoff, toGamCutoff) {
	this.power = power;
	this.off = off;
	this.slope = slope;
	this.toLinCutoff = toLinCutoff;
	this.toGamCutoff = toGamCutoff;
}

// Builds an object containing the parameters defining an RGB colorspace
function rgb_space(primaries, white, trc) {
	this.primaries = primaries;
	this.white = white;
	this.trc = trc;
}