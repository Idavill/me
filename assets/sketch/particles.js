class Particle {
  constructor(p, x, y, color) {
    this.p = p;
    this.x = x;
    this.y = y;

    this.homeX = x;
    this.homeY = y;

    this.color = color;
  }

  update() {}

  draw() {
    this.p.fill(this.color);
    this.p.ellipse(this.x, this.y, 100, 100);
  }
}
