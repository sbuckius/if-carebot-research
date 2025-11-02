let img;
let x, y, dx, dy;
let win = false;
const IMG_SIZE = 100;
const HIT_RADIUS = IMG_SIZE / 2;
let cnv;

function preload() {
  img = loadImage("biased.png"); // must be in same folder as this script
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // better performance on Retina iPhones

  // Attach handlers directly to the canvas
  cnv.mousePressed(() => handlePress(mouseX, mouseY));
  cnv.touchStarted(() => {
    if (getAudioContext().state !== "running") getAudioContext().resume(); // iOS audio unlock
    if (touches.length > 0) handlePress(touches[0].x, touches[0].y);
    return false; // prevent Safari scroll/zoom
  });

  resetBall();
}

function resetBall() {
  x = random(width);
  y = random(height);
  dx = random(-3, 3);
  dy = random(-3, 3);
  if (abs(dx) < 1 && abs(dy) < 1) dx = 2; // ensure motion
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

  // Bounce off walls
  const r = HIT_RADIUS;
  if (x < r) { x = r; dx *= -1; }
  else if (x > width - r) { x = width - r; dx *= -1; }
  if (y < r) { y = r; dy *= -1; }
  else if (y > height - r) { y = height - r; dy *= -1; }

  imageMode(CENTER);
  image(img, x, y, IMG_SIZE, IMG_SIZE);
}

function handlePress(px, py) {
  if (dist(px, py, x, y) <= HIT_RADIUS) {
    win = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
