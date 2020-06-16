import Button from "./button.js";

export default class Dice extends Button {
  constructor(
    x,
    y,
    width,
    height,
    scale,
    colorDiceOutside,
    colorDiceInside,
    colorDiceDeactivated
  ) {
    super(x, y, width, height);
    this.scale = scale;
    this.colorDiceOutside = colorDiceOutside;
    this.colorDiceInside = colorDiceInside;
    this.colorDiceDeactivated = colorDiceDeactivated;
    this.number = [1, 2, 3, 4, 5, 6];
    this.value = random(this.number);
    this.rightToDice = true;
    this.mode = false;
  }
  display() {
    rectMode(CENTER);
    stroke(this.colorDiceOutside);
    if (this.rightToDice === true) {
      fill(this.colorDiceInside);
    }
    if (this.rightToDice === false) {
      fill(this.colorDiceDeactivated);
    }
    rect(
      this.x,
      this.y,
      this.width * this.scale,
      this.height * this.scale,
      10 * this.scale
    );
    if (this.value === 1) {
      fill(this.colorDiceOutside);
      ellipse(this.x, this.y, 8 * this.scale, 8 * this.scale);
    }
    if (this.value === 2) {
      fill(this.colorDiceOutside);
      ellipse(
        this.x + (this.width / 4) * this.scale,
        this.y - (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(
        this.x - (this.width / 4) * this.scale,
        this.y + (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
    }
    if (this.value === 3) {
      fill(this.colorDiceOutside);
      ellipse(
        this.x + (this.width / 4) * this.scale,
        this.y - (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(
        this.x - (this.width / 4) * this.scale,
        this.y + (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(this.x, this.y, 8 * this.scale, 8 * this.scale);
    }
    if (this.value === 4) {
      fill(this.colorDiceOutside);
      ellipse(
        this.x + (this.width / 4) * this.scale,
        this.y + (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(
        this.x + (this.width / 4) * this.scale,
        this.y - (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(
        this.x - (this.width / 4) * this.scale,
        this.y + (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(
        this.x - (this.width / 4) * this.scale,
        this.y - (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
    }
    if (this.value === 5) {
      fill(this.colorDiceOutside);
      ellipse(
        this.x + (this.width / 4) * this.scale,
        this.y + (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(
        this.x + (this.width / 4) * this.scale,
        this.y - (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(
        this.x - (this.width / 4) * this.scale,
        this.y + (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(
        this.x - (this.width / 4) * this.scale,
        this.y - (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(this.x, this.y, 8 * this.scale, 8 * this.scale);
    }
    if (this.value === 6) {
      fill(this.colorDiceOutside);
      ellipse(
        this.x + (this.width / 4) * this.scale,
        this.y + (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(
        this.x + (this.width / 4) * this.scale,
        this.y - (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(
        this.x - (this.width / 4) * this.scale,
        this.y,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(
        this.x + (this.width / 4) * this.scale,
        this.y,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(
        this.x - (this.width / 4) * this.scale,
        this.y + (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
      ellipse(
        this.x - (this.width / 4) * this.scale,
        this.y - (this.height / 4) * this.scale,
        8 * this.scale,
        8 * this.scale
      );
    }
  }
  roll() {
    if (this.rightToDice === true) {
      this.value = random(this.number);
      return this.value;
    }
  }
  clicked() {
    if (this.mode) {
      if (this.rightToDice === true) {
        this.rightToDice = false;
      } else if (this.rightToDice === false) {
        this.rightToDice = true;
      }
    }
  }
}
