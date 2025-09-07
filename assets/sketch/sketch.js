var num = 2222;
var noiseScale = 100,
  noiseStrength = 1;
var particles = [num];
var rectangle;
let img1;
let img2;
let img3;

function preload() {
  //img1 = loadImage("assets/images/fun.png");
  //img2 = loadImage("../images/td.png");
  //img3 = loadImage("../images/vr.png");
}

function setup() {
  describe("purple sand particles mimicking water flow");

  //let postHeader = select("a.post-link");
  //postHeader.mouseOver(drawRandomCircle);

  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  noStroke();
  for (let i = 0; i < num; i++) {
    var loc = createVector(random(width * 1.2), random(height), 2);
    var angle = 0; //any value to initialize
    var dir = createVector(cos(angle), sin(angle));
    var speed = random(0.1, 0.5);
    //var speed = random(5, map(mouseX, 0, width, 5, 20)); // faster
    particles[i] = new Particle(loc, dir, speed);
  }
}

function draw() {
  //rect(windowWidth - 150, windowHeight - 150, 100, 100);
  fill(0, 10);
  for (let i = 0; i < particles.length; i++) {
    particles[i].run();
  }
}

// function write(textvar) {
//   textSize(20);
//   textAlign(CENTER);

//   //Add font
//   //textFont("Courier New");
//   fill(255, 0, 0);
//   text(textvar);
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// drawRandomCircle = function (param) {
//   ellipse(random(width), random(height), 25, 25);
//   console.log("halløj");
// };

// function mouseMoved() {
//   drawRandomCircle();
//    let cnv = select('canvas');
// }

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
