let DEFAULT_SIZE, SIZE, M;
let tree;

function setup() {
	DEFAULT_SIZE = 1000;
	SIZE = Math.min(windowWidth, windowHeight);
	M = SIZE / DEFAULT_SIZE;
	createCanvas(SIZE, SIZE);
	background('lightyellow');
	strokeWeight(1.4*M);
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
	}

	branch(angle, scl) {
		let m = p5.Vector.sub(this.end, this.begin);
		m.rotate(angle);
		m.mult(scl);
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
		last.forEach((twig) => {
			gen = gen.concat(this.sproutFn(twig))
		});
		this.tree.push(gen);
	}

	show() {
		this.tree.forEach((gen) => {
			gen.forEach((twig) => {
				twig.show();
			});
		});
	}
}

function sprout1(twig) {
	let t = frameCount/1000;
	return [
		twig.branch(PI/10 - noise(t)*PI/4, noise(t+10)+0.10), 
		twig.branch(noise(t)*PI/4, 0.6)
	];
}

function draw() {
	let v1 = createVector(width/2, height);
	let v2 = createVector(width/2, height*.70);

	tree = new Tree(v1, v2, sprout1);

	background('lightyellow');
	for (let i = 0; i < 8; i++) {
		tree.sprout();
	}
	tree.show();
}
