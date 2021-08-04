let w  = 300;
let rs;
let rm;
let rh;
let tickm;
let tickh;
let strokeh, strokem, strokes;
let d;
let capturer = new CCapture({ format: 'gif', workersPath: '../libraries/', framerate: 60 });
let styles = [
	function() {
		noStroke();
		fill(255);
	},
	function() {
		noStroke();
		fill('skyblue');
	},
	function() {
		strokeWeight(1);
		fill(0);
		stroke(255);
	}
];
let record = false;
let tps = 23;

function setup() {
	createCanvas(w, w);
	
	rs = 250/1000*w;
	rm = 350/1000*w;
	rh = 450/1000*w;
	tickm = 30/1000*w;
	tickh = 90/1000*w;
	d = 32/1000*w;
	strokeh = 4/1000*w;
	strokem = 2/1000*w;
	strokes = 1/1000*w;
	
	if (record) {
		noLoop();
	}
}

function clock(h, m, s) {
	
	// draw plates
	stroke(255);
	noFill();
	strokeWeight(strokes);
	circle(0, 0, rs*2);
	strokeWeight(strokem);
	circle(0, 0, rm*2);
	strokeWeight(strokeh);
	circle(0, 0, rh*2);
	fill(255)
	circle(0, 0, .05*rs);
	
	fill(255);
	noStroke();
	
	push();
	rotate(TWO_PI * s/60);
	triangle(0, rs, rs/15, rs*.60, -1*rs/15, rs*.60);
	stroke(255);
	// line(0, rs, 0, -rs);
	pop();	
	
	push();
	for (let i = 1; i <= 59; i++) {
		if (i <= m) {
			styles[(ceil(i/10)+1)%3]();
			circle(rm*sin(-TWO_PI/59*(i-1)), rm*cos(-TWO_PI/59*(i-1)), tickm);
		} else {
			strokeWeight(strokem);
			stroke(255);
			let x1 = 1.02*rm*sin(-TWO_PI/59*(i-1));
			let y1 = 1.02*rm*cos(-TWO_PI/59*(i-1));
			let x2 = 0.98*rm*sin(-TWO_PI/59*(i-1));
			let y2 = 0.98*rm*cos(-TWO_PI/59*(i-1));
			line(x1, y1, x2, y2);
		}
	}
  pop();
	
	push();
	rotate(-TWO_PI/3);
	for (let i = 1; i <= 23; i++) {
		if (i <= h) {
			styles[(ceil(i/8)+1) % 3]()
			circle(rh*sin(-TWO_PI/23*(i-1)), rh*cos(-TWO_PI/23*(i-1)), tickh);
		} else {
			strokeWeight(strokes);
			stroke(255);
			fill(0);
			circle(rh*sin(-TWO_PI/23*(i-1)), rh*cos(-TWO_PI/23*(i-1)), tickh/6);
		}
	}
  pop();
}

function draw() {

	translate(width/2, height/2);
	rotate(-PI);
	background(0);

	if (record) {
		capturer.start();
		for (let t = 0; t < 60*60*24; t += tps) {
			let s = t;
			let m = floor(t / 60) % 60;
			let h = floor(t / 60 / 60) % 24;

			background(0);
			clock(h, m, s);

			capturer.capture(document.getElementById('defaultCanvas0'));
		}
		capturer.stop();
		capturer.save();	
	} else {
	
		let h = hour();
		let m = minute();
		let s = second();

		background(0);
		clock(h, m, s);
	}
}
