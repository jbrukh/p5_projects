let tick = 30;
let d = 30;

function setup() {
	createCanvas(1000, 1000);
	// put setup code here
}

function draw() {
	// put drawing code here
	background(0);
	let h = hour();
	let m = minute();
	let s = second();

	noStroke();
	text(h + ':' + m + ':' + s, 10, 200);

	translate(width/2, height/2);

	let arr = [s, m, h];
	arr.sort();
	print(arr);

	fill('pink');
	for (let i = 0; i < h; i++) {
		let r = d/(sin(PI/h)*2);
		circle(r*sin(TWO_PI/h*i), r*cos(TWO_PI/h*i), tick);
	}

	fill('skyblue');
	for (let i = 0; i < m; i++) {
		let r = d/(sin(PI/m)*2);
		circle(r*sin(TWO_PI/m*i), r*cos(TWO_PI/m*i), tick);
	}

	c = color('white');
	//c.setAlpha(150);
	fill(c);
	for (let i = 0; i < s; i++) {
		let r = d/(sin(PI/s)*2);
		circle(r*sin(TWO_PI/s*i), r*cos(TWO_PI/s*i), tick);
	}


	// push();
	// for (let i = 1; i <= s; i++) {
	// 	circle(0, 0, tick*noise(i/4));
	// 	translate(d, 0);
	// 	if (i % 5 === 0) {
	// 		translate(-d*5, -d);
	// 	}
	// }
	// pop();

	// stroke('skyblue');
	// fill('skyblue');
	// push();
	// translate(-d, 0);
	// for (let i = 1; i <= m; i++) {
	// 	circle(0, 0, tick);
	// 	translate(0, -d);
	// 	if (i % 12 === 0) {
	// 		translate(-d, d*12);
	// 	}
	// }
	// pop();

	// stroke('pink');
	// fill('pink');

	// rotate(PI/30);
	// translate(0, d*5);

	// push();
	// for (let i = 1; i <= h; i++) {
	// 	circle(0, 0, tick);
	// 	translate(d, 0);
	// 	rotate(TWO_PI/h);
	// }
	// pop();

	// stroke('skyblue');
	// fill('skyblue');
	// rotate(PI);
	
	// push();
	// translate(0, 2*d);
	// for (let i = 1; i <= m; i++) {
	// 	circle(0, 0, tick*(s/60));
	// 	translate(d, 0);
	// 	rotate(TWO_PI/m);
	// }
	// pop();

	// stroke(255);
	// fill(255);

	// push();
	// translate(0, d);
	// for (let i = 1; i <= s; i++) {
	// 	circle(0, 0, tick);
	// 	translate(d, 0);
	// 	rotate(TWO_PI/s);
	// }
	// pop();

}
