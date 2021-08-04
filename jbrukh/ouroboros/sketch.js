let t = 0;
let px, py;
let squish = 1.4;
let iter = 175000;
let ptsPerLoop = 1600;
let i = 0;
let col1, col2;
let loopStyle;
let xSwivel, ySwivel;
let noLoopMode = false;
let capturer = new CCapture({ format: 'gif', workersPath: '../libraries/', framerate: 60 });
let record = false;
let p1, p2, p3, p4;
let coolOnes = [10, 23, 213];

function setVars(seed) {
	randomSeed(seed);
	squish 		= random(2.5, 4);
	loopStyle   = random(20, 120);
	col1 		= color(random(255), random(255), random(255));
	col2 		= color(random(255), random(255), random(255));
	xSwivel 	= random();
	ySwivel 	= random();

	// random polarity
	p1 			= random() > 0.5 ? -1 : 1;
	p2 			= random() > 0.5 ? -1 : 1;
	p3 			= random() > 0.5 ? -1 : 1;
	p4 			= random() > 0.5 ? -1 : 1;
	
	// random rotation
	r1          = random() * TWO_PI;
	
	print('squish = %f, loopStyle = %f', squish, loopStyle);
}

function setup() {
	createCanvas(1000, 1000);
	background(0);
	stroke(255);
	strokeWeight(1); 
	setVars(12049);	
}

function x(t) {
	return sin(p1 * t / squish)*200 + 2.5*t*sin(loopStyle * t * p2) + xSwivel * t;
}

function y(t) {
	return cos(p3 * t / squish)*200 + 2.5*t*cos(loopStyle * t * p4);
}

function makeSnake() {
	if (record && frameCount === 1) {
		capturer.start();
	}
	if (record && i >= iter) {
		noLoop();
		capturer.stop();
		capturer.save();
		return;
	}
	translate(width/2, height/2);	
	rotate(r1);
	for (var j = 0; j < ptsPerLoop; j++, i++) {
		let xt = x(t), yt = y(t);
		if (px && py) {
			strokeWeight(1.5*(1-i/iter));
			let c = lerpColor(col1, col2, i/iter);
			c.setAlpha(0.90 * 255 * (1-i/iter)^2);
			c.setRed(c._getRed() * noise(t/10));
			c.setGreen(c._getGreen() * noise(t/7+7));
			stroke(c);
			line(px, py, xt, yt);
		}
		px = xt;
		py = yt;
		t += 0.0005;
	}

	if (record) {
		capturer.capture(document.getElementById('defaultCanvas0'));
	}
}

function draw() {
	makeSnake();
}