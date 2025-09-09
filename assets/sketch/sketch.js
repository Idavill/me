let model;
let canvas1;
let canvas2;
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

function s1(p) {
  p.setup = function () {
    canvas1 = p
      .createCanvas(canvasSize, canvasSize, p.WEBGL)
      .parent("pfive-container");
    //p.background(255, 192, 203);
    canvas1.position(p.windowWidth / 2 + 100, calculateHeight());
    //model = p.loadModel("/me/assets/models/by.obj", { normalize: true });
  };
  p.draw = function () {
    //p.background(255, 192, 203);
    let c = p.color(255, 150, 203);
    p.ambientLight(c);
    p.orbitControl();
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
    img1 = p.loadImage("assets/images/mm.gif", handleImage, handleError);
    img2 = p.loadImage("assets/images/sentinel.gif", handleImage, handleError);
    img3 = p.loadImage("assets/images/ideadots.png", handleImage, handleError);
    img4 = p.loadImage("assets/images/fauna2.gif", handleImage, handleError);
    img5 = p.loadImage("assets/images/flax2.png", handleImage, handleError);
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
    setImageMap();

    pageHeight = p.select("body").height;
    canvas2 = p.createCanvas(canvasSize, canvasSize).parent("pfive-container");
    canvas2.position(p.windowWidth / 2 + 100, calculateHeight());
  };
  p.draw = function () {
    if (currentImage) {
      canvas2.position(p.windowWidth / 2 + 100, calculateHeight());
      p.image(currentImage, 0, 0, previewImageSize, previewImageSize);
    } else {
      canvas2.position(1000, 1000, 1000);
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

new p5(s1);
new p5(s2);
