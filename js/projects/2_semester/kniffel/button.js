export default class Button {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  display() {
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }
  hitTest(x, y) {
    if (
      x > this.x - this.width / 2 &&
      x < this.x + this.width / 2 &&
      y > this.y - this.height / 2 &&
      y < this.y + this.height / 2
    ) {
      return true;
    }
    return false;
  }
  clicked() {}
  mouseClicked() {
    if (this.hitTest(mouseX, mouseY)) {
      this.clicked();
    }
  }
}
