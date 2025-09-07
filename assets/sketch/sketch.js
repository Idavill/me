var num = 1222; // 2222
var noiseScale = 80, // 100
  noiseStrength = 1.5; // 1
var particles = [num];
var rectangle;
let previewImageSize = 400;
let previewBuffer = 200;
let previewBufferHeight = 200;
let previewBufferWidth = 200;
let previewPosition = previewImageSize + previewBuffer;
let img1;
let img2;
let img3;
let imageMap = new Map();
let currentImage = null;
let currentGraphics = null;
let canvas;
let canvas3D;
let time = 0;
let spherePosition = 0;
let pg = null;
let webglContexts = [];
let op;
let down;

function preload() {
  img1 = loadImage("assets/images/mm.gif", handleImage, handleError);
  img2 = loadImage("assets/images/sentinel.gif", handleImage, handleError);
  img3 = loadImage("assets/images/ideadots.png", handleImage, handleError);
  img4 = loadImage("assets/images/fauna2.gif", handleImage, handleError);
  img5 = loadImage("assets/images/flax2.png", handleImage, handleError);
  //shape = loadModel("assets/models/flat.obj");
}
function handleImage(img) {
  console.log("Image loaded successfully:", img);
}
function handleError(event) {
  console.error("Oops!", event);
}

function setup() {
  describe("purple sand particles mimicking water flow");

  pg = createGraphics(previewImageSize, previewImageSize, WEBGL);

  imageMap.set("/jekyll/update/2025/09/06/urban", img2);
  imageMap.set("/jekyll/update/2025/09/06/meditations", img1);
  imageMap.set("/jekyll/update/2025/09/06/ideadots", img3);
  imageMap.set("/jekyll/update/2025/09/06/VR", img4);
  imageMap.set("/jekyll/update/2025/09/06/hemp", img5);

  let pageHeight = select("body").height;

  canvas = createCanvas(windowWidth, pageHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");

  noStroke();
  for (let i = 0; i < num; i++) {
    var loc = createVector(random(width * 1.2), random(height), 2);
    var angle = 0; //any value to initialize
    var dir = createVector(cos(angle), sin(angle));
    var speed = random(0.1, 0.5);
    particles[i] = new Particle(loc, dir, speed);
  }
}

function draw() {
  if (time === 0) {
    down = false;
  } else if (time === 255) {
    down = true;
  }

  if (down) {
    time -= 1;
  } else if (!down) {
    time += 1;
  }
  fill(0, 10);

  for (let i = 0; i < particles.length; i++) {
    particles[i].run();
  }
  if (currentGraphics) {
    makeWobbleSphere();
  }

  if (currentImage) {
    image(
      currentImage,
      windowWidth - previewBufferWidth,
      windowHeight - previewBufferHeight,
      previewImageSize,
      previewImageSize
    );
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  previewBufferHeight = windowHeight / 2;
  previewBufferWidth = windowWidth / 2;
}

function makeWobbleSphere() {
  pg.push();

  pg.background(255, 192, 203);
  //let c = color("orchid");
  //pg.ambientLight(c);
  pg.ambientLight(150 - time / 10, 50, 214 - time / 10);

  pg.directionalLight(time, 50, 100, 1, time / 10, -time / 10);
  pg.noStroke();

  let detail = 20;
  pg.rotateY(frameCount * 0.002); // Add rotation for visual interest

  //pg.box(100, 100);
  pg.sphere(100, detail, detail);

  pg.pop();

  image(
    pg,
    windowWidth - previewBufferWidth,
    windowHeight - previewBufferHeight,
    previewImageSize,
    previewImageSize
  );
}

drawRandomCircle = function (titleid) {
  let path = imageMap.get(titleid);
  if (titleid === "/jekyll/update/2025/09/06/ideadots") {
    currentGraphics = path;
    currentImage = null;
  } else {
    currentImage = path;
    currentGraphics = null;
  }
};

class Particle {
  constructor(_loc, _dir, _speed) {
    this.loc = _loc;
    this.dir = _dir;
    this.speed = _speed;
    // var col;
  }
  run() {
    this.move();
    this.checkEdges();
    this.update();
  }
  move() {
    let angle =
      noise(
        this.loc.x / noiseScale,
        this.loc.y / noiseScale,
        frameCount / noiseScale
      ) *
      TWO_PI *
      noiseStrength; //0-2PI
    this.dir.x = sin(angle);
    this.dir.y = tan(angle);
    var vel = this.dir.copy();
    var d = mouseX / mouseY ? mouseX / mouseY : 1; //direction change
    vel.mult(this.speed * d); //vel = vel * (speed*d)
    this.loc.add(vel); //loc = loc + vel
  }
  checkEdges() {
    if (
      this.loc.x < 0 ||
      this.loc.x > width ||
      this.loc.y < 0 ||
      this.loc.y > height
    ) {
      this.loc.x = random(width * 10);
      this.loc.y = random(height);
    }
  }
  update() {
    fill(50, 0, 255, 10);
    ellipse(this.loc.x, this.loc.y, this.loc.z);
  }
}
