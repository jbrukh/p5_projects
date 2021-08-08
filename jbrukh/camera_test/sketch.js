let capture;
let cols, rows;

function setup() {
  createCanvas(1333, 1000);
  cols = floor(1333/133);
  rows = floor(1000/100);
  capture = createCapture(VIDEO);
  capture.size(1333, 1000);
  capture.hide();
}

function draw() {
	background(255);
    let img = capture.get(0, 0, 1333, 1000);

//   let i = frameCount % 30;

//   let x = (i % cols) * 133;
//   let y = floor(i / cols) * 100;

     image(img, 0, 0);
}
