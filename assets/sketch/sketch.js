let model;
let canvas1;
let canvas2;
let pageHeight;
let heightOffset = 170;
let canvasSize = 300;

function s1(p) {
  p.setup = function () {
    canvas1 = p
      .createCanvas(canvasSize, canvasSize, p.WEBGL)
      .parent("pfive-container");
    p.background(255, 192, 203);
    //p.background(0);

    let halfh = p.windowHeight / 2;
    let h = p.windowHeight / halfh;
    canvas1.position(p.windowWidth / 2 + 100, h + heightOffset);

    model = p.loadModel("/me/assets/models/by.obj", { normalize: true });
  };
  p.draw = function () {
    p.background(255, 192, 203);
    p.lights(255, 192, 203);
    //p.box(100);
    p.rotateY(p.frameCount * 0.01);
    p.box(100);
  };
  p.windowResized = function () {
    let halfh = p.windowHeight / 2;
    let h = p.windowHeight / halfh;
    canvas1.position(p.windowWidth / 2 + 100, h + heightOffset);
    console.log("window resized!");
  };
}

function s2(p) {
  p.setup = function () {
    pageHeight = p.select("body").height;
    canvas2 = p.createCanvas(canvasSize, canvasSize).parent("pfive-container");

    let halfh = p.windowHeight / 2;
    let h = p.windowHeight / halfh;
    canvas2.position(p.windowWidth / 2 + 100, h + heightOffset);

    //p.background(255);
    p.fill(0);
    p.stroke(255);
  };
  p.draw = function () {
    p.square(p.mouseX, p.mouseY, 50);
  };
  p.windowResized = function () {
    let halfh = p.windowHeight / 2;
    let h = p.windowHeight / halfh;
    canvas2.position(p.windowWidth / 2 + 100, h + heightOffset);
    console.log("window resized!");
  };
}

drawRandomCircle = function (titleid) {
  console.log(titleid);
  // let path = imageMap.get(titleid);
  // if (titleid === "/jekyll/update/2025/09/06/ideadots") {
  //   currentGraphics = path;
  //   currentImage = null;
  // } else {
  //   currentImage = path;
  //   currentGraphics = null;
  // }
};

new p5(s2);
new p5(s1);
