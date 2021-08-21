var t = 0;
let spins = 100;
let delta = 0.001;
let noiseDelta = 10;
let seed;
let hash;

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let DIM = Math.min(WIDTH, HEIGHT);
let BASEDIM = 2000;

function setup() {

  // canvas setup
  createCanvas(DIM, DIM);
  stroke(0, 120);
  noFill();
  background(0);
  //noLoop();
  
  // entropy
  hash = random_hash();
  seed = parseInt(hash.slice(0, 16), 16);
  noiseSeed(seed);
  noiseDelta = 100 * drand(seed);
}

// deterministic random function
function drand(seed) {
    seed ^= seed << 13;
    seed ^= seed >> 17;
    seed ^= seed << 5;
    return ((seed < 0 ? ~seed + 1 : seed) % 1000) / 1000
  }

function plan1(offsetPx, T) {
  return  [(DIM + offsetPx) * noise(T + noiseDelta*11) - offsetPx/2,
          DIM * noise(T + noiseDelta*13),
          DIM * noise(T + noiseDelta*17),
          (DIM + offsetPx) * noise(T + noiseDelta*19) - offsetPx/2,
          (DIM + offsetPx) * noise(T + noiseDelta) - offsetPx/2,
          DIM * noise(T + noiseDelta*2),
          DIM * noise(T + noiseDelta*3),
          (DIM + offsetPx) * noise(T + noiseDelta*4) - offsetPx/2];
}

function draw() {
background(0);
  spins = 750 + 2750 * drand(seed);
  let offsetPx = DIM/BASEDIM * 300;
  if (drand(seed) > .95) {
    offsetPx = 3000 * DIM/BASEDIM;
  }

  for (let i = 0; i < spins; i++) { 
	let T = t + i*delta;
	plan = plan1(offsetPx, T);
    var r = 255 * noise(T + 10);
    var g = 255 * noise(T + 20);
    var b = 255 * noise(T + 102);
    stroke(r, g, b, 20);
    strokeWeight(2*DIM/BASEDIM);
    bezier(plan[0], plan[4], plan[1], plan[5], plan[2], plan[6], plan[3], plan[7]);
  }
  t += 50*delta;
}

function keyTyped() {
  if (key === 's') {
    save();
  }
}

// example function for hash
function random_hash() {
  let chars = "0123456789abcdef";
  let result = '0x';
  for (let i = 64; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}