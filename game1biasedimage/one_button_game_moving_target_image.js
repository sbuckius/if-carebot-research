let img;
let x, y, dx, dy;
let win = false;

function preload() {
  img = loadImage("biased.png"); // your image file
}

function setup() {
  createCanvas(800, 800);
  x = random(width);
  y = random(height);
  dx = random(-3, 3);
  dy = random(-3, 3);
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
  
  // Move image
  x += dx;
  y += dy;
  
  // Bounce off walls
  let r = img.width / 2;
  if (x < r || x > width - r) dx *= -1;
  if (y < r || y > height - r) dy *= -1;
  
  // Draw image centered
  imageMode(CENTER);
  image(img, x, y, 100, 100);
}

function mousePressed() {
  if (dist(mouseX, mouseY, x, y) < 30) {
    win = true;
  }
}
