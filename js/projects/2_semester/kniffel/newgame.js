import Button from "./button.js";

export default class NewGame extends Button {
  constructor(x, y, width, height, tableReset, rollAllButtonReset, diceReset) {
    super(x, y, width, height);
    this.tableReset = tableReset;
    this.rollAllButtonReset = rollAllButtonReset;
    this.diceReset = diceReset;
  }
  display() {
    stroke("#23150c");
    rectMode(CENTER);
    fill("#507531");
    rect(this.x, this.y, this.width, this.height);
    noStroke();
    fill("#23150c");

    textSize(12);
    textAlign(CENTER);
    text("Neuer Spielblock", this.x, this.y + 4);
  }
  clicked() {
    this.rollAllButtonReset.count = 0;
    this.rollAllButtonReset.roundText = "Mach deinen ersten Wurf";
    this.rollAllButtonReset.game = 1;
    for (let i in this.diceReset) {
      this.diceReset[i].rightToDice = true;
    }
    for (let i = 0; i < this.tableReset.table.length; i++) {
      for (let j = 0; j < this.tableReset.table[i].length; j++) {
        this.tableReset.table[i][j] = " ";
      }

      for (let i = 0; i < 6; i++) {
        this.tableReset.table[6][i] = "-";
        this.tableReset.table[7][i] = "-";
        this.tableReset.table[8][i] = "-";
        this.tableReset.table[16][i] = "-";
        this.tableReset.table[17][i] = "-";
        this.tableReset.table[18][i] = "*";
      }
    }
  }
}
