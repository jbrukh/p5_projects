let w  = 1000;
let rs;
let rm;
let rh;
let tickm;
let tickh;
let strokeh, strokem, strokes;
let d;
// let h = 23, m = 59, s = 55;
let h, m, s;
let styles = [
	function() {
		noStroke();
		fill(255);
	},
	function() {
		stroke(255);
		fill('deepskyblue');
	},
	function() {
		strokeWeight(1);
		fill(0);
		stroke(255);
	}
];

function setup() {
	createCanvas(w, w);
	frameRate(1);
	
	rs = 230/1000*w;
	rm = 330/1000*w;
	rh = 430/1000*w;
	tickm = 34/1000*w;
	tickh = 110/1000*w;
	d = 32/1000*w;
	strokeh = 4/1000*w;
	strokem = 2/1000*w;
	strokes = 1/1000*w;
	
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
	triangle(0, rs, rs/15, rs*.60, -1*rs/15, rs*.60);
	stroke(255);
	// line(0, rs, 0, -rs);
	pop();	
	
	push();
	for (let i = 1; i <= 60; i++) {
		if (i <= m) {
			styles[(ceil(i/10)+1)%3]();
			circle(rm*sin(-TWO_PI/60*(i-1)), rm*cos(-TWO_PI/60*(i-1)), tickm);
		} else {
			strokeWeight(strokem);
			stroke(255);
			let x1 = 1.02*rm*sin(-TWO_PI/60*(i-1));
			let y1 = 1.02*rm*cos(-TWO_PI/60*(i-1));
			let x2 = 0.98*rm*sin(-TWO_PI/60*(i-1));
			let y2 = 0.98*rm*cos(-TWO_PI/60*(i-1));
			line(x1, y1, x2, y2);
		}
	}
  pop();
	
	push();
	rotate(-TWO_PI/3);
	for (let i = 0; i < 24; i++) {
		if (i < h && i > 0) {
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