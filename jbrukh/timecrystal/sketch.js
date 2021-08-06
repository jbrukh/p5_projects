let w  = 1000;
let rs;
let rm;
let rh;
let tickm;
let tickh;
let strokeh, strokem, strokes;
let d;
let fps = 60;
// let h = 23, m = 59, s = 55;
let h, m, s;
let ts, ts2;
let styles = [
	function() {
		noStroke();
		fill(255);
	},
	function() {
		stroke(255);
		fill(color(226,114,91));
	},
	function() {
		strokeWeight(1);
		fill(0);
		stroke(255);
	}
];

function setup() {
	createCanvas(w, w);
	frameRate(fps);
	
	rs = 230/1000*w;
	rm = 330/1000*w;
	rh = 430/1000*w;
	tickm = 32/1000*w;
	tickh = 110/1000*w;
	d = 32/1000*w;
	strokeh = 4/1000*w;
	strokem = 2/1000*w;
	strokes = 1/1000*w;
	ts = 40/1000*w;
	ts2 = 12/1000*w;
	
	if (!h) h = hour();
	if (!m) m = minute();
	if (!s) s = second();
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

	// draw second dial
	fill(255);
	noStroke();
	circle(0,0, rs/12);

	push();
	rotate(TWO_PI * s/60);
	triangle(0, rs, 0.06*rs, rs*0.60, -0.06*rs, rs*0.60);
	quad(0.01*rs, -0.60*rs, -0.01*rs, -0.60*rs, -0.01*rs, -1*rs, 0.01*rs, -1*rs);
	stroke(255);
	strokeWeight(strokes/2);
	line(0, rs, 0, -rs);
	pop();	
	
	push();
	for (let i = 0; i < 60; i++) {
		if (i <= m && i > 0) {
			styles[(ceil(i/10)+1)%3]();
			circle(rm*sin(-TWO_PI/60*i), rm*cos(-TWO_PI/60*i), tickm);
		} else {
			strokeWeight(strokem);
			stroke(255);
			let x1 = 1.02*rm*sin(-TWO_PI/60*i);
			let y1 = 1.02*rm*cos(-TWO_PI/60*i);
			let x2 = 0.98*rm*sin(-TWO_PI/60*i);
			let y2 = 0.98*rm*cos(-TWO_PI/60*i);
			line(x1, y1, x2, y2);
		}
	}
  pop();
	
	push();
	rotate(-TWO_PI/3);
	for (let i = 0; i < 24; i++) {
		if (i <= h && i > 0) {
			styles[(ceil(i/8)+1) % 3]();
			circle(rh*sin(-TWO_PI/24*i), rh*cos(-TWO_PI/24*i), tickh);
		} else {
			strokeWeight(strokes);
			stroke(255);
			fill(0);
			circle(rh*sin(-TWO_PI/24*i), rh*cos(-TWO_PI/24*i), tickh/6);
		}
	}
  pop();
}

function draw() {
	
	translate(width/2, height/2);
	rotate(-PI);

	background(0);
	clock(h, m, s);
	
	// update once per second
	if (frameCount % fps === 0) {
		s++;
		if (s === 60) {
			s = 0;
			m++;
		}
		if (m === 60) {
			m = 0;
			h++;
		}
		if (h === 24) {
			h = 0;
		};
	}
}