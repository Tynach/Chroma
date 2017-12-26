"use strict"

var colorspaceForm = function (header, initPrimaries, initWhite) {
	let coordInput = function (prefix) {
		let numInput = function (axis, max) {
			let label = document.createElement('label');
			let labelTxt = document.createTextNode(" " + axis + " ");
			let div = document.createElement('div');
			let number = document.createElement('input');
			let range = document.createElement('input');

			label.className = "controls";
			div.className = "input";

			number.type = "number";
			number.name = prefix + axis + "n";
			number.min = 0;
			number.max = "any";
			number.step = "any";

			range.type = "range";
			range.name = prefix + axis + "r";
			range.min = 0;
			range.max = max;
			range.step = 0.001;

			number.addEventListener("change", function() {
				range.value = number.value;
			});

			range.addEventListener("input", function() {
				number.value = range.value;
			});

			div.appendChild(number);
			div.appendChild(range);
			label.appendChild(labelTxt);
			label.appendChild(div);

			return label;
		};

		let coordDiv = document.createElement('div');
		let head = document.createElement('p');
		let headText = document.createTextNode(prefix.charAt(0).toUpperCase() + prefix.slice(1));
		let xLabel = numInput('x', 0.8);
		let yLabel = numInput('y', 0.9);

		coordDiv.className = "coordinates";

		head.appendChild(headText);
		coordDiv.appendChild(head);

		coordDiv.appendChild(xLabel);
		coordDiv.appendChild(yLabel);

		return coordDiv;
	};

	this.form = document.createElement('form');
	let head = document.createElement('h2');
	head.appendChild(document.createTextNode(header));

	this.form.appendChild(head);
	this.form.appendChild(coordInput("red"));
	this.form.appendChild(coordInput("green"));
	this.form.appendChild(coordInput("blue"));
	this.form.appendChild(coordInput("white"));

	let inputs = this.form.elements;

	inputs["redxn"].value = initPrimaries[0];
	inputs["redyn"].value = initPrimaries[1];
	inputs["greenxn"].value = initPrimaries[3];
	inputs["greenyn"].value = initPrimaries[4];
	inputs["bluexn"].value = initPrimaries[6];
	inputs["blueyn"].value = initPrimaries[7];
	inputs["whitexn"].value = initWhite[0];
	inputs["whiteyn"].value = initWhite[1];

	inputs["redxr"].value = inputs["redxn"].value;
	inputs["redyr"].value = inputs["redyn"].value;
	inputs["greenxr"].value = inputs["greenxn"].value;
	inputs["greenyr"].value = inputs["greenyn"].value;
	inputs["bluexr"].value = inputs["bluexn"].value;
	inputs["blueyr"].value = inputs["blueyn"].value;
	inputs["whitexr"].value = inputs["whitexn"].value;
	inputs["whiteyr"].value = inputs["whiteyn"].value;
}

window.addEventListener("DOMContentLoaded", function() {
	let main = document.getElementsByTagName('main')[0];

	let fromForm = new colorspaceForm("From colorspace", primaries709, whiteD65);
	let toForm = new colorspaceForm("To colorspace", primaries709, whiteD65);

	fromForm.form.id = "from";
	toForm.form.id = "to"

	main.appendChild(fromForm.form);
	main.appendChild(toForm.form);

	var from = document.querySelector("#from").elements;
	var to = document.querySelector("#to").elements;
});