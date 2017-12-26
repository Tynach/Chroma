"use strict"

function colorspaceForm(header, initPrimaries, initWhite) {
	let addCoordInputs = function (prefix) {
		let coordDiv = document.createElement('div');
		let head = document.createElement('p');
		let headText = document.createTextNode(header.charAt(0).toUpperCase() + header.slice(1));
		let xLabel = document.createElement('label');
		let yLabel = document.createElement('label');
		let xTxt = document.createTextNode("x");
		let yTxt = document.createTextNode("y");
		let xDiv = document.createElement('div');
		let yDiv = document.createElement('div');
		let xNumber = document.createElement('input');
		let xRange = document.createElement('input');
		let yNumber = document.createElement('input');
		let yRange = document.createElement('input');
	};

	this.form = document.createElement('form');

	let head = document.createElement('h2');
	head.appendChild(document.createTextNode(header));
	this.form.appendChild(head);
}

window.addEventListener("DOMContentLoaded", function() {
	var from = document.querySelector("#from").elements;
	var to = document.querySelector("#to").elements;

	from["redxn"].value = state.from.primaries[0];
	from["redyn"].value = state.from.primaries[1];
	from["greenxn"].value = state.from.primaries[3];
	from["greenyn"].value = state.from.primaries[4];
	from["bluexn"].value = state.from.primaries[6];
	from["blueyn"].value = state.from.primaries[7];
	from["whitexn"].value = state.from.white[0];
	from["whiteyn"].value = state.from.white[1];

	from["redxr"].value = from["redxn"].value;
	from["redyr"].value = from["redyn"].value;
	from["greenxr"].value = from["greenxn"].value;
	from["greenyr"].value = from["greenyn"].value;
	from["bluexr"].value = from["bluexn"].value;
	from["blueyr"].value = from["blueyn"].value;
	from["whitexr"].value = from["whitexn"].value;
	from["whiteyr"].value = from["whiteyn"].value;

	to["redxn"].value = state.to.primaries[0];
	to["redyn"].value = state.to.primaries[1];
	to["greenxn"].value = state.to.primaries[3];
	to["greenyn"].value = state.to.primaries[4];
	to["bluexn"].value = state.to.primaries[6];
	to["blueyn"].value = state.to.primaries[7];
	to["whitexn"].value = state.to.white[0];
	to["whiteyn"].value = state.to.white[1];

	to["redxr"].value = to["redxn"].value;
	to["redyr"].value = to["redyn"].value;
	to["greenxr"].value = to["greenxn"].value;
	to["greenyr"].value = to["greenyn"].value;
	to["bluexr"].value = to["bluexn"].value;
	to["blueyr"].value = to["blueyn"].value;
	to["whitexr"].value = to["whitexn"].value;
	to["whiteyr"].value = to["whiteyn"].value;

	for (let i = 0; i < from.length; i += 2) {
		//from[i+1].value = from[i].value;

		from[i].addEventListener("change", function() {
			from[i+1].value = from[i].value;
		});
		from[i+1].addEventListener("input", function() {
			from[i].value = from[i+1].value;
		});
	}

	for (let i = 0; i < to.length; i += 2) {
		//to[i+1].value = to[i].value;

		to[i].addEventListener("change", function() {
			to[i+1].value = to[i].value;
		});
		to[i+1].addEventListener("input", function() {
			to[i].value = to[i+1].value;
		});
	}

	/*var newForm = new colorspaceForm("foobar", primaries709, whiteD65);

	document.body.appendChild(newForm.form);*/
});