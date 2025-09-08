let model;

function s1(p) {
  p.setup = function () {
    p.createCanvas(200, 200, p.WEBGL).parent("pfive-container");
    p.background(255, 192, 203);
  };
  p.draw = function () {
    p.orbitControl();
    p.box();
  };
}

function s2(p) {
  p.setup = function () {
    p.createCanvas(200, 200).parent("pfive-container");
    p.background(255, 192, 203);
    p.fill(0);
    p.stroke(255);
  };
  p.draw = function () {
    p.square(p.mouseX, p.mouseY, 50);
  };
}
new p5(s1);
new p5(s2);
