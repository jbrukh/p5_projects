let DEFAULT_SIZE, SIZE, M;

function setup() {
	DEFAULT_SIZE = 1000;
	SIZE = Math.min(windowWidth, windowHeight);
	M = SIZE / DEFAULT_SIZE;
	createCanvas(SIZE, SIZE);
	background('lightyellow');

}

function gear(x, y, r) {
	strokeWeight(3*M);
	noFill();
	circle(x, y, r);
	circle(x, y, r*.90);
	circle(x, y, r*.80);
	fill(0);
	circle(x, y, r*.30);
}

function tree(l) {
	if (Math.abs(l) < 1) return;
	translate(0, l);

	push();
	rotate(TWO_PI/8);
	line(0, 0, 0, l * .80);

	pop();

	push();
	rotate(-TWO_PI/8);
	line(0, 0, 0, l * .80);
	pop();

}

function draw() {
	// put drawing code here
	translate(width/2, height/2);
	
	line(0, 0, 0, -100);
	tree(-100);
}
