import Button from "./button.js";

export default class NextRound extends Button {
  constructor(x, y, width, height, rollAll) {
    super(x, y, width, height);
    this.rollAll = rollAll;
    this.round = 0;
  }
  display() {
    rectMode(CENTER);
    fill("pink");
    rect(this.x, this.y, this.width, this.height);
    fill("black");
    noStroke();
    textSize(12);
    textAlign(CENTER);
    text("Nächste Runde", this.x, this.y + 4);
  }
  clicked() {
    console.log("hi");
    this.round++;
  }
}
