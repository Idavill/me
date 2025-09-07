var num = 2222;
var noiseScale = 100,
  noiseStrength = 1;
var particles = [num];
var rectangle;
let previewImageSize = 400;
let previewBuffer = 100;
let previewPosition = previewImageSize + previewBuffer;
let img1;
let img2;
let img3;
let imageMap = new Map();

let meditation = "/jekyll/update/2025/09/06/meditations";
let urban = "/jekyll/update/2025/09/06/urban";

function preload() {
  //mg1 = loadImage("assets/images/mm.gif");
  img2 = loadImage("assets/images/urbanf1.png");
  img1 = loadImage("assets/images/mm.gif", handleImage, handleError);
  //img3 = loadImage("../images/vr.png");
}

function handleImage(img) {
  console.log("Image loaded successfully:", img);
}
function handleError(event) {
  console.error("Oops!", event);
}

function setup() {
  describe("purple sand particles mimicking water flow");

  imageMap.set(urban, img2);
  imageMap.set(meditation, img1);

  let pageHeight = select("body").height;
  let canvas = createCanvas(windowWidth, pageHeight);
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
  fill(0, 10);
  for (let i = 0; i < particles.length; i++) {
    particles[i].run();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

drawRandomCircle = function (titleid) {
  let path = imageMap.get(titleid);
  console.log("path : ", path, titleid);
  image(
    path,
    windowWidth - previewPosition,
    windowHeight - previewPosition,
    previewImageSize,
    previewImageSize
  );

  // if (param === meditation) {
  //   image(
  //     img1,
  //     windowWidth - previewPosition,
  //     windowHeight - previewPosition,
  //     previewImageSize,
  //     previewImageSize
  //   );
  // } else if (param == urban) {
  //   image(
  //     img2,
  //     windowWidth - previewPosition,
  //     windowHeight - previewImageSize + previewBuffer,
  //     previewImageSize,
  //     previewImageSize
  //   );
  // }
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
    var d = mouseX / mouseY; //direction change
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
    fill(50, 0, 255);
    ellipse(this.loc.x, this.loc.y, this.loc.z);
  }
}
