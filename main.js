"use strict"

var state = {
	from: JSON.parse(JSON.stringify(Srgb)),
	to: JSON.parse(JSON.stringify(Srgb))
}

function loadShader(gl, type, source) {
	const shader = gl.createShader(type);

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.log("Shader not compiled: \n" + gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		shader = null;
	}

	return shader;
}

function initShaderProgram(gl, vertSrc, fragSrc) {
	const vertShader = loadShader(gl, gl.VERTEX_SHADER, vertSrc);
	const fragShader = loadShader(gl, gl.FRAGMENT_SHADER, fragSrc);
	const shaderProgram = gl.createProgram();

	gl.attachShader(shaderProgram, vertShader);
	gl.attachShader(shaderProgram, fragShader);
	gl.linkProgram(shaderProgram);

	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		console.log("Shader program failed to compile.");
		shaderProgram = null;
	}

	return shaderProgram;
}

function initBuffers(gl) {
	const vertBuffer = gl.createBuffer();
	const verts = [
		1, 1,
		0, 1,
		1, 0,
		0, 0
	];

	gl.bindBuffer(gl.ARRAY_BUFFER, vertBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

	return {vert: vertBuffer};
}

function sendColorspace(gl, location, space) {
	gl.uniformMatrix3fv(location.primaries, false, space.primaries);
	gl.uniform3fv(location.white, space.white);
	gl.uniform1f(location.trc.power, space.trc.power);
	gl.uniform1f(location.trc.off, space.trc.off);
	gl.uniform1f(location.trc.slope, space.trc.slope);
	gl.uniform1f(location.trc.toLinCutoff, space.trc.toLinCutoff);
	gl.uniform1f(location.trc.toGamCutoff, space.trc.toGamCutoff);
}

function draw() {
	const ctx = state.ctx;
	const lineCanvas = state.lineCanvas;
	const gl = state.gl;
	const program = state.program;
	const buffers = state.buffers;

	const dispRes = [gl.canvas.width, gl.canvas.height];
	const vao = gl.createVertexArray();

	let from = document.querySelector("#from").elements;
	let to = document.querySelector("#to").elements;

	state.from.primaries = primaries(
		from["redxn"].valueAsNumber, from["redyn"].valueAsNumber,
		from["greenxn"].valueAsNumber, from["greenyn"].valueAsNumber,
		from["bluexn"].valueAsNumber, from["blueyn"].valueAsNumber
	);
	state.from.white = chromaCoords(from["whitexn"].valueAsNumber, from["whiteyn"].valueAsNumber);

	state.to.primaries = primaries(
		to["redxn"].valueAsNumber, to["redyn"].valueAsNumber,
		to["greenxn"].valueAsNumber, to["greenyn"].valueAsNumber,
		to["bluexn"].valueAsNumber, to["blueyn"].valueAsNumber
	);
	state.to.white = chromaCoords(to["whitexn"].valueAsNumber, to["whiteyn"].valueAsNumber);

	ctx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);

	drawPrimaries(state.ctx, state.from.primaries, state.bounds);
	drawPrimaries(state.ctx, state.to.primaries, state.bounds);

	gl.bindTexture(gl.TEXTURE_2D, state.lines);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, lineCanvas.width, lineCanvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, lineCanvas);

	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vert);
	gl.bindVertexArray(vao);
	gl.enableVertexAttribArray(program.attribs.vertex);
	gl.vertexAttribPointer(program.attribs.vertex, 2, gl.FLOAT, false, 0, 0);

	gl.viewport(-gl.canvas.width, -gl.canvas.height, gl.canvas.width*2, gl.canvas.height*2);

	gl.clearColor(0, 0, 0, 0);
	gl.clear(gl.COLOR_BUFFER_BIT);

	gl.useProgram(program.program);

	gl.uniform2fv(program.uniforms.bounds, state.bounds);
	gl.uniform2fv(program.uniforms.dispRes, dispRes);

	sendColorspace(gl, program.uniforms.from, state.from);
	sendColorspace(gl, program.uniforms.to, state.to);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	requestAnimationFrame(draw);
}

function drawPrimaries(ctx, prims, bounds) {
	const w = ctx.canvas.width;
	const h = ctx.canvas.height;

	let x = (prims[6] + (bounds[1]*w/h - bounds[0])/2)*h/bounds[1];
	let y = h*(1 - prims[7]/bounds[1]);

	ctx.beginPath();
	ctx.moveTo(x, y);

	for (let i = 0; i < 9; i += 3) {
		x = (prims[i] + (bounds[1]*w/h - bounds[0])/2)*h/bounds[1];
		y = h*(1 - prims[i+1]/bounds[1]);

		ctx.lineTo(x, y);
	}

	ctx.stroke();
}

window.addEventListener("DOMContentLoaded", function() {
	const glCanvas = document.querySelector("#glCanvas");
	const lineCanvas = document.createElement('canvas');

	const bounds = [0.8, 0.9];

	const w = glCanvas.width;
	const h = glCanvas.height;

	lineCanvas.width = w;
	lineCanvas.height = h;

	const gl = glCanvas.getContext("webgl2");
	const ctx = lineCanvas.getContext("2d");
	ctx.imageSmoothingQuality = "high";

	if (!gl) {
		console.log("WebGL buggered out!");
		return;
	}

	const lines = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, lines);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, lineCanvas);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	const vertSrc = document.querySelector("#vertex").text;
	const fragSrc = document.querySelector("#fragment").text;
	const shaderProgram = initShaderProgram(gl, vertSrc, fragSrc);

	const fromColorspace = {
		primaries: gl.getUniformLocation(shaderProgram, 'from.primaries'),
		white: gl.getUniformLocation(shaderProgram, 'from.white'),
		trc: {
			power: gl.getUniformLocation(shaderProgram, 'from.trc.power'),
			off: gl.getUniformLocation(shaderProgram, 'from.trc.off'),
			slope: gl.getUniformLocation(shaderProgram, 'from.trc.slope'),
			toLinCutoff: gl.getUniformLocation(shaderProgram, 'from.trc.toLinCutoff'),
			toGamCutoff: gl.getUniformLocation(shaderProgram, 'from.trc.toGamCutoff')
		}
	};

	const toColorspace = {
		primaries: gl.getUniformLocation(shaderProgram, 'to.primaries'),
		white: gl.getUniformLocation(shaderProgram, 'to.white'),
		trc: {
			power: gl.getUniformLocation(shaderProgram, 'to.trc.power'),
			off: gl.getUniformLocation(shaderProgram, 'to.trc.off'),
			slope: gl.getUniformLocation(shaderProgram, 'to.trc.slope'),
			toLinCutoff: gl.getUniformLocation(shaderProgram, 'to.trc.toLinCutoff'),
			toGamCutoff: gl.getUniformLocation(shaderProgram, 'to.trc.toGamCutoff')
		}
	};

	const program = {
		program: shaderProgram,
		attribs: {
			vertex: gl.getAttribLocation(shaderProgram, 'vertex')
		},
		uniforms: {
			bounds: gl.getUniformLocation(shaderProgram, 'bounds'),
			dispRes: gl.getUniformLocation(shaderProgram, 'dispRes'),
			lines: gl.getUniformLocation(shaderProgram, 'lines'),
			from: fromColorspace,
			to: toColorspace
		}
	};

	const buffers = initBuffers(gl);

	state.bounds = bounds;
	state.ctx = ctx;
	state.lines = lines;
	state.lineCanvas = lineCanvas;
	state.gl = gl;
	state.program = program;
	state.buffers = buffers;

	draw();
});