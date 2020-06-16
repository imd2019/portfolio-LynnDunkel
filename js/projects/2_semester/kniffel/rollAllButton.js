import Button from "./button.js";

export default class RollAllButton extends Button {
  constructor(x, y, width, height, title, dice, count) {
    super(x, y, width, height);
    this.title = title;
    this.dice = dice;
    this.count = count;
    this.roundText = "Mach deinen ersten Wurf";
    this.gameText = " ";
    this.round = 0;
    this.game = 1;
  }
  display() {
    stroke("#23150c");
    rectMode(CENTER);
    fill("#507531");
    rect(this.x, this.y, this.width, this.height);
    fill("#23150c");
    noStroke();
    textSize(14);
    textAlign(CENTER);
    text(this.title, this.x, this.y + 4);
    text(this.roundText, this.x + 250, this.y - 160);
  }
  clicked() {
    if (this.count < 3) {
      for (let i in this.dice) {
        this.dice[i].roll();
      }
      this.count++;
      this.title = "Würfeln";
    }
    if (this.count === 0) {
      for (let i in this.dice) {
        this.dice[i].rightToDice = true;
        this.dice[i].mode = false;
        this.dice[i].roll();
      }
      this.roundText = "Mach deinen ersten Wurf";
    }
    if (this.count === 1) {
      this.roundText = "1.Wurf";
      for (let i in this.dice) {
        this.dice[i].mode = true;
      }
    }
    if (this.count === 2) {
      this.roundText = "2.Wurf";
      for (let i in this.dice) {
        this.dice[i].mode = true;
      }
    }
    if (this.count === 3) {
      this.roundText = "3.Wurf";
      this.title = "Nächste Runde";
      for (let i in this.dice) {
        this.dice[i].mode = true;
      }
    }

    // if (this.rounds === 13 && this.count === -1) {
    //   this.roundText = "Uuups, Spiel zuende";
    //   this.game++;
    // }
  }
}
