let t = 0;
let px, py;
let squish = 1.4;
let iter = 135000;
let ptsPerLoop = 800;
let i = 0;
let col1, col2;
let loopStyle;
let xSwivel, ySwivel;
let noLoopMode = false;

function setVars(seed) {
	randomSeed(seed);
	squish 		= random(1, 2);
	loopStyle = random(20, 120);
	col1 			= color(random(255), random(255), random(255));
	col2 			= color(random(255), random(255), random(255));
	xSwivel 	= random();
	ySwivel 	= random();
}

function setup() {
	createCanvas(1000, 1000);
	background(0);
	stroke(255);
	strokeWeight(1); 
	setVars(13);

}

function x(t) {
	return sin(t / squish)*200 + 3*t*sin(loopStyle*t) + xSwivel * t;
}

function y(t) {
	return cos(t / squish)*200 + 3*t*cos(loopStyle*t);
}

function makeSnake() {
	translate(width/2, height/2);	
	for (var j = 0; j < ptsPerLoop; j++, i++) {
		let xt = x(t), yt = y(t);
		if (px && py) {
			strokeWeight(1.5*(1-i/iter));
			let c = lerpColor(col1, col2, i/iter);
			c.setAlpha(0.9 * 255 * (1-i/iter)^2);
			stroke(c);
			line(px, py, xt, yt);
		}
		px = xt;
		py = yt;
		t += 0.0005;
	}
}

function draw() {
	makeSnake();
}