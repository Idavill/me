// try this shader https://p5js.org/examples/advanced-canvas-rendering-shader-as-a-texture/

// this variable will hold our shader object
let theShader;
let shaderExperiment;
// this variable will hold our createGraphics layer
let shaderTexture;

let model;
let canvas1;
let canvas2;
let canvas3;
let canvas4;
let pageHeight = 1000;
let heightOffset = 300; // 170
let canvasSize = 400;
let particles;
let titleId;
let imageMap = new Map();
let img;
let img1;
let img2;
let img3;
let img4;
let img5;
let currentGraphics = null;
let currentImage = null;
let previewImageSize = 390;
let postShowingvar = true;

let backgroundImageTest;
let testheadline1;

let dropShadow;

let opacity = 0;
let transitioning = false;

let palette = ["#3c93eaff", "#ffaf25ff", "#ff60ffff", "#1c2dbeff"];

function s1(p) {
  p.setup = function () {
    canvas1 = p
      .createCanvas(canvasSize, canvasSize, p.WEBGL)
      .parent("pfive-container");
    canvas1.style("z-index", "-2");
    canvas1.position(p.windowWidth / 2 + 100, calculateHeight(p));
    dropShadow = p.select(".drop-shadow");
    dropShadow.position(p.windowWidth / 2 + 100, calculateHeight(p));

    let openpost = p.select(".openpost-class");
    if (openpost) {
      postShowingvar = true;
    } else {
      postShowingvar = false;
    }
  };
  p.draw = function () {
    if (postShowingvar) {
      canvas1.style("opacity", "0%");
      dropShadow.style("opacity", "0%");
    } else {
      canvas1.style("opacity", "100%");
      dropShadow.style("opacity", "100%");
    }
    let c = p.color(255, 150, 203);
    p.ambientLight(c);
    //p.spotLight(100, 100, 0);
    p.translate(0, 0, 0); // -04 y
    p.rotateY(p.frameCount * 0.003);
    p.sphere(120, 20, 10);
    //p.sphere.computeNormals();
  };
}
function s2(p) {
  p.preload = function () {
    if (!postShowingvar) {
      img1 = p.loadImage("/me/assets/images/mm.gif", handleImage, handleError);
      img2 = p.loadImage(
        "/me/assets/images/sentinel.gif",
        handleImage,
        handleError
      );
      img3 = p.loadImage(
        "/me/assets/images/ideadots.png",
        handleImage,
        handleError
      );
      img4 = p.loadImage(
        "/me/assets/images/fauna2.gif",
        handleImage,
        handleError
      );
      img5 = p.loadImage(
        "/me/assets/images/flax2.png",
        handleImage,
        handleError
      );
    }
  };
  function handleImage(img) {
    console.log("Image loaded successfully:", img);
  }
  function handleError(event) {
    console.error("Oops!", event);
  }
  function setImageMap() {
    imageMap.set("/jekyll/update/2025/09/06/urban", img2);
    imageMap.set("/jekyll/update/2025/09/06/meditations", img1);
    imageMap.set("/jekyll/update/2025/09/06/ideadots", img3);
    imageMap.set("/jekyll/update/2025/09/06/VR", img4);
    imageMap.set("/jekyll/update/2025/09/06/hemp", img5);
  }
  p.setup = function () {
    if (!postShowingvar) {
      setImageMap();
      pageHeight = p.select("body").height;
      canvas2 = p
        .createCanvas(canvasSize, canvasSize)
        .parent("pfive-container");
      canvas2.style("z-index", "-2");
      canvas2.position(p.windowWidth / 2 + 100, calculateHeight(p));
    }
  };
  p.draw = function () {
    if (!postShowingvar) {
      if (currentImage) {
        p.tint(255, 255);
        canvas2.position(p.windowWidth / 2 + 100, calculateHeight(p));
        p.image(currentImage, 0, 0, previewImageSize, previewImageSize);
        canvas2.style("opacity", "100%");
      } else {
        //p.tint(255, 0);
        canvas2.style("opacity", "0%");
      }
    }
  };
}

function background(p) {
  p.preload = function () {
    shaderExperiment = p.loadShader(
      "/me/assets/sketch/shader_experiment.vert",
      "/me/assets/sketch/shader_experiment.frag"
    );
  };
  p.setup = function () {
    backgroundImageTest = p.loadImage("/me/assets/images/weave1.jpg");
    canvas3 = p
      .createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
      .parent("pfive-container");
    canvas3.position(0, 0);
    canvas3.style("z-index", "-2");
    p.shader(shaderExperiment);
    p.noStroke();
  };
  p.draw = function () {
    p.clear();
    p.rect(0, 0, p.windowWidth, p.windowHeight);
    shaderExperiment.setUniform("background", backgroundImageTest);
  };
}

calculateHeight = function (p) {
  let halfh = p.windowHeight / 2;
  let h = p.windowHeight / halfh;
  return h + heightOffset;
};

drawRandomCircle = function (titleid) {
  let path = imageMap.get(titleid);
  console.log(path, titleid);
  if (titleid === "/jekyll/update/2025/09/06/ideadots") {
    currentGraphics = path;
    currentImage = null;
  } else {
    currentImage = path;
    currentGraphics = null;
  }
};

determineHeadlineColor = function (p, img) {
  postlink = p.selectAll(".post-link");
  sitetitle = p.select(".site-title");
  about = p.select(".page-link");
  social = p.select(".social-media-list");
  // console.log("span username :", span);

  determineColor(p, sitetitle);
  determineColor(p, about);
  determineColor(p, social);

  if (postlink !== undefined) {
    postlink.forEach((elm) => {
      determineColor(p, elm);
    });
  }

  social.style("width", "150px");
  social.style("padding", "10px");
  about.style("padding", "10px");
  about.style("width", "150px");
};

determineColor = function (p, element) {
  //addPictureColors();
  colorOffset = 0;
  elementHtml = element.elt.getBoundingClientRect();
  x = (elementHtml.x / p.windowWidth) * img.width;
  y = (elementHtml.y / p.windowHeight) * img.height;
  pureColor = img.get(x + colorOffset, y);
  color = `rgb(${pureColor})`;
  element.style("background", color);
  element.style("border", `border: 2px solid ${color}`);
  element.style("border-radius", "5px");
  element.style("box-shadow", "10px 10px");
  hexcolor =
    "#" +
    ((1 << 24) | (pureColor[0] << 16) | (pureColor[1] << 8) | pureColor[2])
      .toString(16)
      .slice(1);

  readbleContrastingColor = getReadableContrastColor(hexcolor, palette);
  element.style("color", `${readbleContrastingColor}`);
};

function convertToHex(r, g, b) {
  return (hexcolor =
    "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1));
}

function addPictureColors() {
  let a = img.get(0, 0);
  let b = img.get(100, 100);
  let c = img.get(500, 500);

  let a1 = convertToHex(a[0] / 2, a[1] / 2, a[2] / 2);
  let b1 = convertToHex(b[0] / 2, b[1] / 2, b[2] / 2);
  let c1 = convertToHex(c[0] / 2, c[1] / 2, c[2] / 2);

  palette.push(a1, b1, c1);
}

function getReadableContrastColor(baseHex, palette) {
  function luminance(r, g, b) {
    let a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }

  function contrast(hex1, hex2) {
    let rgb1 = hexToRgb(hex1);
    let rgb2 = hexToRgb(hex2);
    let lum1 = luminance(rgb1.r, rgb1.g, rgb1.b);
    let lum2 = luminance(rgb2.r, rgb2.g, rgb2.b);
    let brightest = Math.max(lum1, lum2);
    let darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  function hexToRgb(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3)
      hex = hex
        .split("")
        .map((c) => c + c)
        .join("");
    let bigint = parseInt(hex, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }

  let bestColor = null;
  let bestContrast = 0;

  for (let color of palette) {
    let cRatio = contrast(baseHex, color);
    if (cRatio > bestContrast && cRatio >= 4.5) {
      bestContrast = cRatio;
      bestColor = color;
    }
  }

  return bestColor; //|| "#000"; // fallback
}

particlebackground = function (p) {
  let particles = [];
  let res = 12;
  p.preload = function () {
    img = p.loadImage("/me/assets/images/18.jpg"); //17!
  };
  p.setup = function () {
    canvas4 = p
      .createCanvas(p.windowWidth, pageHeight)
      .parent("pfive-container-background");
    canvas4.position(0, 0);
    canvas4.style("z-index", "-3");
    placeParticles();
    p.noStroke();
    img.resize(p.windowWidth, pageHeight); // pageHeight
    determineHeadlineColor(p, img);
  };
  p.draw = function () {
    paintParticles();
  };
  paintParticles = function () {
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
  };
  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, pageHeight);
    canvas1.position(p.windowWidth / 2 + 100, calculateHeight(p));
    dropShadow.position(p.windowWidth / 2 + 100, calculateHeight(p));
    determineHeadlineColor(p, img);
    img.resize(p.windowWidth, pageHeight);
    paintParticles();
    p.updatePixels();
    console.log("window resized!");
  };

  function placeParticles() {
    for (let i = 0; i < p.width; i += res) {
      for (let j = 0; j < p.height; j += res) {
        let x = (i / p.width) * img.width;
        let y = (j / p.height) * img.height;
        let c = img.get(x, y);

        if (c[0] + c[1] + c[2] != 255 * 3) {
          particles.push(new Particle(p, i, j, c, res));
        }
      }
    }
  }

  class Particle {
    constructor(p, x, y, color, res) {
      this.res = res;
      this.p = p;
      this.x = x;
      this.y = y;

      this.homeX = x;
      this.homeY = y;

      this.color = color;
    }

    update() {
      // mouse
      let mouseD = this.p.dist(this.x, this.y, this.p.mouseX, this.p.mouseY);
      let mouseA = this.p.atan2(this.y - this.p.mouseY, this.x - this.p.mouseX);
      // home
      let homeD = this.p.dist(this.x, this.y, this.homeX, this.homeY);
      let homeA = this.p.atan2(this.homeY - this.y, this.homeX - this.x);
      // forces
      let mouseF = this.p.constrain(this.p.map(mouseD, 0, 200, 10, 0), 0, 10);
      //console.log(mouseF);
      //let mouseF = this.p.map(mouseD, 0, 100, 10, 0);
      let homeF = this.p.map(homeD, 0, 100, 0, 10);

      let vx = (this.p.cos(mouseA) * mouseF) / 4;
      vx += this.p.cos(homeA) * homeF;

      let vy = (this.p.sin(mouseA) * mouseF) / 4;
      vy += this.p.sin(homeA) * homeF;

      this.x += vx;
      this.y += vy;
    }

    draw() {
      this.p.fill(this.color);
      this.p.ellipse(this.x, this.y, this.res, this.res);
    }
  }
};

new p5(particlebackground);
new p5(s1);
new p5(s2);
