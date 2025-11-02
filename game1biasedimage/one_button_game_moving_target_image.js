let img;
let x, y, dx, dy;
let win = false;
const IMG_SIZE = 100;     // drawn size (not the file's pixel size)
const HIT_RADIUS = IMG_SIZE / 2;

function preload() {
  img = loadImage("biased.png"); // make sure this file is reachable on your server
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // nicer performance on Retina iPhones
  resetBall();
}

function resetBall() {
  x = random(width);
  y = random(height);
  dx = random(-3, 3);
  dy = random(-3, 3);
  if (abs(dx) < 1 && abs(dy) < 1) dx = 2; // ensure it moves a bit
}

function draw() {
  background(30);

  if (win) {
    fill(0, 255, 100);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("You win! This is a biased image!", width / 2, height / 2);
    noLoop();
    return;
  }

  // Move
  x += dx;
  y += dy;

  // Bounce off walls using the drawn radius
  const r = HIT_RADIUS;
  if (x < r)       { x = r;             dx *= -1; }
  else if (x > width - r)  { x = width - r;    dx *= -1; }
  if (y < r)       { y = r;             dy *= -1; }
  else if (y > height - r) { y = height - r;   dy *= -1; }

  // Draw image centered
  imageMode(CENTER);
  image(img, x, y, IMG_SIZE, IMG_SIZE);
}

// ---- Unified input: desktop + mobile ----
function handlePress(px, py) {
  if (dist(px, py, x, y) <= HIT_RADIUS) {
    win = true;
  }
}

// Desktop
function mousePressed() {
  handlePress(mouseX, mouseY);
}

// iPhone / touch
function touchStarted() {
  const t = touches[0];
  if (t) handlePress(t.x, t.y);
  return false; // prevent Safari from scrolling/zooming the page
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
