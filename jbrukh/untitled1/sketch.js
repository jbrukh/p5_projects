let DEFAULT_SIZE, SIZE, M;
let tree;

function setup() {
	DEFAULT_SIZE = 1000;
	SIZE = Math.min(windowWidth, windowHeight);
	M = SIZE / DEFAULT_SIZE;
	createCanvas(SIZE, SIZE);
	background(0);
	strokeWeight(1.4*M);
	stroke(255);
	//strokeCap(SQUARE);
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

class Branch {

	constructor(begin, end) {
		this.begin = begin;
		this.end = end;
	}

	show() {
		line(this.begin.x, this.begin.y, this.end.x, this.end.y);
	// 	strokeWeight(1);
	// 	let m = p5.Vector.sub(this.end, this.begin);
	// 	circle((this.begin.x+this.end.x)/2, (this.begin.y + this.end.y)/2, m.mag());
	}

	branch(angle, scl) {
		let m = p5.Vector.sub(this.end, this.begin);
		m.rotate(angle);
		m.mult(Math.pow(scl, 1.1));
		let v = p5.Vector.add(this.end, m);
		return new Branch(this.end, v);
	}
}

class Tree {

	constructor(begin, end, sproutFn) {
		this.root = new Branch(begin, end);
		this.tree = [ [this.root] ];
		this.sproutFn = sproutFn;
	}

	sprout() {
		let gen = [];
		let last = this.tree[this.tree.length - 1];
		last.forEach((twig, index) => {
			let out = this.sproutFn(twig, index).filter((el) => {
				return el != null;
			});
			gen = gen.concat(out);
		});
		this.tree.push(gen);
	}

	show() {
		this.tree.forEach((gen, genIndex) => {
			gen.forEach((twig) => {
				//strokeWeight(10/(genIndex+1));
				noFill();
				stroke(255*noise(genIndex+10), 255*noise(genIndex+100), 255*noise(genIndex-4));
				//stroke(255, ((genIndex+3)/5)*255);
				twig.show();
			});
		});
	}
}

function sprout1(twig, index) {
	let t = frameCount/100;
	let a1 = (-PI*18/30 * noise(t+11));
	let a2 = (PI*18/30 * noise(t+13));
	let a3 = (a1+a2)/2;
	let disparity = 0.5 - noise(t);
	let l1 = noise(t);
	let l2 = 1-l1;

	let out = [
		twig.branch(a1, l1),
		twig.branch(a2, l2),
		index % 2 === 0? twig.branch(a3, .5) : null
	];
	// if (index > 2) {
	// 	out.push(
	// 		twig.branch(a3, .5)
	// 	);
	// }
	return out;
}

function draw() {
	let v1 = createVector(width/2, height);
	let v2 = createVector(width/2, height*.60);

	tree = new Tree(v1, v2, sprout1);

	background(0);
	for (let i = 0; i < 7; i++) {
		tree.sprout();
	}
	tree.show();
}
