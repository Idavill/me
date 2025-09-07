let shared = {
  num: 2222,
  noiseScale: 100,
  noiseStrength: 1,
  particles: [],
  imageMap: new Map(),
  currentImage: null,
  currentGraphics: null,
  previewImageSize: 400,
  previewBuffer: 50,
  previewPosition: 450,
  time: 0,
  pg: null,
  webglContexts: [],
  images: {},
};

function sketchMain(p) {
  p.preload = function () {
    const paths = {
      mm: "assets/images/mm.gif",
      sentinel: "assets/images/sentinel.gif",
      ideadots: "assets/images/ideadots.png",
      vr: "assets/images/vr.png",
      hemp: "assets/images/weave1.jpg",
    };

    for (let key in paths) {
      shared.images[key] = p.loadImage(paths[key]);
    }
  };

  p.setup = function () {
    let pageHeight = p.select("body").height;
    let canvas = p.createCanvas(p.windowWidth, pageHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");

    shared.imageMap.set(
      "/jekyll/update/2025/09/06/urban",
      shared.images["sentinel"]
    );
    shared.imageMap.set(
      "/jekyll/update/2025/09/06/meditations",
      shared.images["mm"]
    );
    shared.imageMap.set(
      "/jekyll/update/2025/09/06/ideadots",
      shared.images["ideadots"]
    );
    shared.imageMap.set("/jekyll/update/2025/09/06/VR", shared.images["vr"]);
    shared.imageMap.set(
      "/jekyll/update/2025/09/06/hemp",
      shared.images["hemp"]
    );

    p.noStroke();
    for (let i = 0; i < shared.num; i++) {
      let loc = p.createVector(p.random(p.width * 1.2), p.random(p.height), 2);
      let dir = p.createVector(p.cos(0), p.sin(0));
      let speed = p.random(0.1, 0.5);
      shared.particles[i] = new Particle(p, loc, dir, speed);
    }
  };

  p.draw = function () {
    shared.time += 1;
    p.fill(0, 10);
    for (let particle of shared.particles) {
      particle.run();
    }

    if (shared.currentGraphics) {
      makeWobbleSphere(p);
    }

    if (shared.currentImage) {
      p.image(
        shared.currentImage,
        p.windowWidth - shared.previewPosition,
        p.windowHeight - shared.previewPosition,
        shared.previewImageSize,
        shared.previewImageSize
      );
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}

function sketch3D(p) {
  let shape;

  p.preload = function () {
    shape = p.loadModel("assets/models/flat.obj", { normalize: true });
  };

  p.setup = function () {
    let canvas3D = p.createCanvas(
      shared.previewImageSize,
      shared.previewImageSize,
      p.WEBGL
    );
    canvas3D.position(
      shared.previewPosition + 200,
      shared.previewPosition - 200
    );
  };

  p.draw = function () {
    p.background(255);
    p.lights();
    p.noStroke();
    p.orbitControl();

    p.push();
    p.translate(0, 0, 0);
    p.scale(2);
    // p.model(shape);
    p.box(100);
    p.pop();
  };
}

function makeWobbleSphere(p) {
  if (shared.webglContexts.length >= 2) {
    shared.webglContexts[0] = null;
    shared.webglContexts.shift();
  }

  shared.pg = p.createGraphics(
    shared.previewImageSize,
    shared.previewImageSize,
    p.WEBGL
  );
  shared.webglContexts.push(shared.pg);

  shared.pg.background(255, 192, 203);
  let c = p.color("orchid");
  shared.pg.ambientLight(c);
  shared.pg.directionalLight(255, 0, 0, 0, 1, 0);
  shared.pg.noStroke();

  shared.pg.sphere(100, 100, 100);
  shared.pg.translate(100, 10, 10);

  p.image(
    shared.pg,
    p.windowWidth - shared.previewPosition,
    p.windowHeight - shared.previewPosition,
    shared.previewImageSize,
    shared.previewImageSize
  );
}

function drawRandomCircle(titleid) {
  let path = shared.imageMap.get(titleid);
  if (titleid === "/jekyll/update/2025/09/06/ideadots") {
    shared.currentGraphics = path;
    shared.currentImage = null;
  } else {
    shared.currentImage = path;
    shared.currentGraphics = null;
  }
}

class Particle {
  constructor(p, loc, dir, speed) {
    this.p = p;
    this.loc = loc;
    this.dir = dir;
    this.speed = speed;
  }

  run() {
    this.move();
    this.checkEdges();
    this.update();
  }

  move() {
    let angle =
      this.p.noise(
        this.loc.x / shared.noiseScale,
        this.loc.y / shared.noiseScale,
        this.p.frameCount / shared.noiseScale
      ) *
      this.p.TWO_PI *
      shared.noiseStrength;

    this.dir.x = this.p.sin(angle);
    this.dir.y = this.p.tan(angle);
    let vel = this.dir.copy();
    let d = this.p.mouseX / this.p.mouseY;
    vel.mult(this.speed * d);
    this.loc.add(vel);
  }

  checkEdges() {
    if (
      this.loc.x < 0 ||
      this.loc.x > this.p.width ||
      this.loc.y < 0 ||
      this.loc.y > this.p.height
    ) {
      this.loc.x = this.p.random(this.p.width * 10);
      this.loc.y = this.p.random(this.p.height);
    }
  }

  update() {
    this.p.fill(50, 0, 255);
    this.p.ellipse(this.loc.x, this.loc.y, this.loc.z);
  }
}

// Launch both instances
new p5(sketchMain);
new p5(sketch3D);
