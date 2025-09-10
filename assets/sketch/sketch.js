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
let pageHeight;
let heightOffset = 170;
let canvasSize = 400;
let particles;
let titleId;
let imageMap = new Map();
let img1;
let img2;
let img3;
let img4;
let img5;
let currentGraphics = null;
let currentImage = null;
let previewImageSize = 400;
let postShowingvar = true;

let backgroundImageTest;

function s1(p) {
  p.setup = function () {
    //contextReadFrequently = createCanvas(800, 600).elt.getContext('2d', { willReadFrequently: true });

    canvas1 = p
      .createCanvas(canvasSize, canvasSize, p.WEBGL)
      .parent("pfive-container");
    //.elt.getContext("2d", { willReadFrequently: true });

    canvas1.position(p.windowWidth / 2 + 100, calculateHeight());

    let openpost = p.select(".openpost-class");
    if (openpost) {
      postShowingvar = true;
    } else {
      postShowingvar = false;
    }
    //model = p.loadModel("/me/assets/models/by.obj", { normalize: true });
  };
  p.draw = function () {
    if (postShowingvar) {
      p.remove();
    }
    //p.background(255, 192, 203);
    let c = p.color(255, 150, 203);
    p.ambientLight(c);
    //p.orbitControl();
    p.translate(0, -40, 0);
    p.rotateY(p.frameCount * 0.001);
    p.sphere(120, 20, 10);
  };
  p.windowResized = function () {
    canvas1.position(p.windowWidth / 2 + 100, calculateHeight);
    console.log("window resized!");
  };
  calculateHeight = function () {
    let halfh = p.windowHeight / 2;
    let h = p.windowHeight / halfh;
    return h + heightOffset;
  };
}
function s2(p) {
  p.preload = function () {
    if (!postShowingvar) {
      img1 = p.loadImage("assets/images/mm.gif", handleImage, handleError);
      img2 = p.loadImage(
        "assets/images/sentinel.gif",
        handleImage,
        handleError
      );
      img3 = p.loadImage(
        "assets/images/ideadots.png",
        handleImage,
        handleError
      );
      img4 = p.loadImage("assets/images/fauna2.gif", handleImage, handleError);
      img5 = p.loadImage("assets/images/flax2.png", handleImage, handleError);
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
      canvas2.position(p.windowWidth / 2 + 100, calculateHeight());
    }
  };
  p.draw = function () {
    if (!postShowingvar) {
      if (currentImage) {
        canvas2.position(p.windowWidth / 2 + 100, calculateHeight());
        p.image(currentImage, 0, 0, previewImageSize, previewImageSize);
      } else {
        canvas2.position(1000, 1000, 1000);
      }
    }
  };
  p.windowResized = function () {
    canvas2.position(p.windowWidth / 2 + 100, calculateHeight());
    console.log("window resized!");
  };
  calculateHeight = function () {
    let halfh = p.windowHeight / 2;
    let h = p.windowHeight / halfh;
    return h + heightOffset;
  };
}

function background(p) {
  p.preload = function () {
    shaderExperiment = p.loadShader(
      "assets/sketch/shader_experiment.vert",
      "assets/sketch/shader_experiment.frag"
    );
  };
  p.setup = function () {
    backgroundImageTest = p.loadImage("assets/images/weave1.jpg");
    canvas3 = p
      .createCanvas(p.windowWidth, p.windowHeight, p.WEBGL)
      .parent("pfive-container");
    canvas3.position(0, 0);
    canvas3.style("z-index", "-1");
    //p.angleMode(p.DEGREES);

    p.shader(shaderExperiment);
    p.noStroke();
    //theShader = p.createShader(vertexShader, fragmentShader);

    //p.background(255);
  };
  p.draw = function () {
    p.clear();
    p.rect(0, 0, p.windowWidth, p.windowHeight);
    shaderExperiment.setUniform("background", backgroundImageTest);
    //p.background(0);
    // send uniform values to the shader
    // theShader.setUniform("resolution", [400, 400]);
    // theShader.setUniform("time", p.millis() / 1000.0);
    // theShader.setUniform("mouse", [p.mouseX, p.map(p.mouseY, 0, 400, 400, 0)]);
    //p.shader(theShader);
    // add a sphere using the texture
    // p.translate(-150, 0, 0);
    // p.push();
    // p.rotateX(-p.mouseY);
    // p.rotateY(-p.mouseX);
    // p.sphere(125);
    // p.pop();
    // add an ellipse using the texture
    // passing a fifth parameter to ellipse for smooth edges in 3D
    //p.ellipse(0, 0, 500, 500, 50);
  };
}

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

new p5(background);
new p5(s1);
new p5(s2);
