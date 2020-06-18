export default class Title {
  constructor(x, y, size, color, title) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.title = title;
  }
  display() {
    fill(this.color);
    noStroke();
    textSize(this.size);
    textAlign(RIGHT);
    text(this.title, this.x, this.y);
  }
}
