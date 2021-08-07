let w = 1000;
function setup() {
	createCanvas(w, w);
	// put setup code here
}

function draw() {
	translate(width/2, height/2);
	strokeWeight(2);
	stroke(0);
	fill('darkred');

	background(255);
	// rotate(-TWO_PI/240 * frameCount);
	translate(25, 200);
	beginShape();
	vertex(0, 0);
	vertex(-100, 0);
	bezierVertex(-100, -200, -100, -300, -50, -300);
	vertex(-50, -300);
	vertex(-50, -400);
	vertex(0, -400);
	vertex(0, -300);
	vertex(50, -300);
	vertex(50, 0);
	vertex(0, 0);
	endShape();
	translate(0, -400);
	fill('');
	quad(-50, 0, -50, -20, 0, -20, 0, 0);
	
}
