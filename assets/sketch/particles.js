class Particle {
  constructor(p, x, y, color) {
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
    let mouseA = this.p.atan2(this.p.mouseY - this.y, this.p.mouseX - this.x);
    // home
    let homeD = this.p.dist(this.x, this.y, this.homeX, this.homeY);
    let homeA = this.p.atan2(this.homeY - this.y, this.homeX - this.x);
    // forces
    let mouseF = this.p.constrain(this.p.map(mouseD, 0, 100, 10, 0), 0, 10);
    let homeF = this.p.map(homeD, 0, 100, 0, 10);
    let vx = this.p.cos(mouseA) * mouseF;
    vx += this.p.cos(homeA) * homeF;
    let vy = this.p.sin(mouseA) * mouseF;
    vx += this.p.sin(homeA) * homeF;

    this.x += vx;
    this.y += vy;
  }

  draw() {
    this.p.fill(0, 40);
    this.p.stroke(0, 40);
    this.p.ellipse(this.homeX, this.homeY, 5, 5);
    this.p.line(this.x, this.y, this.homeX, this.homeY);
    this.p.fill(this.color);
    this.p.ellipse(this.x, this.y, 10, 10);
  }
}
