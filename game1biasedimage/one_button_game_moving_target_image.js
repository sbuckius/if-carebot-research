let img;
let x, y, dx, dy;
let win = false;
const IMG_SIZE = 100;
const HIT_RADIUS = IMG_SIZE / 2;
let cnv;
let winLink = "../hit.html"; // link to show on win

function preload() {
  img = loadImage("biased.png"); // must be in same folder as this script
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  pixelDensity(1);

  // Attach event handlers directly to the canvas
  cnv.mousePressed(() => handlePress(mouseX, mouseY));
  cnv.touchStarted(() => {
    if (getAudioContext().state !== "running") getAudioContext().resume(); // unlock audio for iOS
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
  if (abs(dx) < 1 && abs(dy) < 1) dx = 2;
}

function draw() {
  background(30);

  if (win) {
    fill(0, 255, 100);
    textAlign(CENTER, CENTER);
    // Dynamically scale text to fit any screen size
    let tSize = min(width, height) / 25; // smaller on phones
    text("You win! You clicked the biased image!", width / 2, height / 2.2);

    // Draw clickable link below message
    fill(0, 150, 255);
    textSize(tSize * .9);
    text("→ Go To Next Level!", width / 2, height / 2 + tSize * 1.5);
    noLoop();
    return;
  }

  // Move image
  x += dx;
  y += dy;

  // Bounce off walls
  const r = HIT_RADIUS;
  if (x < r) { x = r; dx *= -1; }
  else if (x > width - r) { x = width - r; dx *= -1; }
  if (y < r) { y = r; dy *= -1; }
  else if (y > height - r) { y = height - r; dy *= -1; }

  imageMode(CENTER);
  image(img, x, y, IMG_SIZE, IMG_SIZE*2);
}

function handlePress(px, py) {
  if (win) {
    // If user clicks the link area after winning
    let tSize = min(width, height) / 30;
    let linkY = height / 2 + tSize * 1.5;
    let linkHeight = tSize * 0.8;
    if (py > linkY - linkHeight && py < linkY + linkHeight) {
      window.open(winLink, "_blank");
      return;
    }
  }

  // Check for image click
  if (dist(px, py, x, y) <= HIT_RADIUS) {
    win = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
