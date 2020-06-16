import Button from "./button.js";

export default class Table extends Button {
  constructor(x, y, width, height, rows, cols, dice, rollAllButton) {
    super(x, y, width, height);
    this.rows = rows;
    this.cols = cols;
    this.dice = dice;
    this.rollAllButton = rollAllButton;
    this.table = [];
    this.rowtable = [];
    this.lastButtonX = -1;
    this.lastButtonY = -1;
  }
  draw() {
    for (let i = 0; i < this.rows; i++) {
      this.rowtable = [];
      for (let j = 0; j < this.cols; j++) {
        this.rowtable.push(" ");
      }
      this.table.push(this.rowtable);
    }
    for (let i = 0; i < 6; i++) {
      this.table[6][i] = "-";
      this.table[7][i] = "-";
      this.table[8][i] = "-";
      this.table[16][i] = "-";
      this.table[17][i] = "-";
      this.table[18][i] = "*";
    }
  }
  display() {
    for (let i = 0; i < this.table.length; i++) {
      for (let j = 0; j < this.table[i].length; j++) {
        // zahlen
        noStroke();
        fill("#23150c");
        textAlign(CENTER);
        textSize(10);
        text(
          this.table[i][j],
          j * this.width + this.x,
          i * this.height + this.y
        );
        //tabelle
        stroke("#59371c");
        rectMode(CENTER);
        strokeWeight(2);
        noFill();
        rect(
          j * this.width + this.x,
          i * this.height + this.y,
          this.width,
          this.height,
          5
        );
      }
    }
  }
  getSum(total, num) {
    //Quelle: https://editor.p5js.org/samchasan/sketches/BkyEL_okf
    return total + num;
  }
  //bezieht sich nur auf eine augenzahl
  calculateOneDiceValue(n) {
    let eyes = [0, 0, 0, 0, 0, 0];
    for (let i in this.dice) {
      let value = this.dice[i].value;
      eyes[value - 1] += value;
    }
    return eyes[n];
  }
  arePasch(n) {
    let result = this.calculateOneDiceValue(n);

    return result;
  }
  //bezieht sich auch alle augenzahlen
  calculateAllDiceValue() {
    let eyes = [0, 0, 0, 0, 0, 0];
    for (let i in this.dice) {
      let value = this.dice[i].value;
      eyes[value - 1] += value;
    }
    return eyes;
  }
  //alle augenzahlen werden gezählt
  allCount() {
    let result = this.calculateAllDiceValue();
    let sum = result.reduce(this.getSum, 0);

    return sum;
  }
  //welche augenzahl wie oft
  calculateAllDiceCount() {
    let eyes = [0, 0, 0, 0, 0, 0];
    for (let i in this.dice) {
      let value = this.dice[i].value;
      eyes[value - 1] += 1;
    }
    return eyes;
  }
  //für straßen
  streets(a, b, c, d, e, f) {
    let eyes = this.calculateAllDiceCount();
    if (
      eyes[0] >= a &&
      eyes[1] >= b &&
      eyes[2] >= c &&
      eyes[3] >= d &&
      eyes[4] >= e &&
      eyes[5] >= f
    ) {
      return true;
    }
    return false;
  }
  //für pasch
  sameDice(n) {
    let eyes = this.calculateAllDiceCount();
    for (let i in eyes) {
      if (eyes[i] >= n) {
        return true;
      }
    }
    return false;
  }
  //für fullhouse
  fullhouse(n, m) {
    let eyes = this.calculateAllDiceCount();
    let zweier = false;
    let dreier = false;

    for (let i in eyes) {
      if (eyes[i] === n) {
        zweier = true;
      }
      if (eyes[i] === m) {
        dreier = true;
      }
    }
    if (zweier && dreier) {
      return true;
    }
    return false;
  }

  clicked() {
    if (
      (this.table[this.lastButtonY][this.lastButtonX] === " " ||
        this.table[this.lastButtonY][this.lastButtonX] === "*") &&
      this.rollAllButton.game - 1 === this.lastButtonX
    ) {
      if (this.rollAllButton.count > 0 && this.rollAllButton.count <= 3) {
        for (let i in this.dice) {
          //nur für obere tabelle

          if (this.dice[i].value === this.lastButtonY + 1) {
            this.table[this.dice[i].value - 1].splice(
              this.rollAllButton.game - 1,
              1,
              this.arePasch(this.dice[i].value - 1)
            );
            this.rollAllButton.count = -1;
            this.rollAllButton.title = "Nächste Runde";
            break;
          }

          //untere Tabelle

          //dreierpasch
          else if (this.lastButtonY === 9 && this.sameDice(3)) {
            this.table[9].splice(
              this.rollAllButton.game - 1,
              1,
              this.allCount()
            );
            this.rollAllButton.count = -1;
            this.rollAllButton.title = "Nächste Runde";
          }
          //viererpasch
          else if (this.lastButtonY === 10 && this.sameDice(4)) {
            this.table[10].splice(
              this.rollAllButton.game - 1,
              1,
              this.allCount()
            );
            this.rollAllButton.count = -1;
            this.rollAllButton.title = "Nächste Runde";
          }

          // fullhouse (geht noch nicht)
          else if (
            this.lastButtonY === 11 &&
            (this.fullhouse(2, 3) || this.fullhouse(3, 2))
          ) {
            this.table[11].splice(this.rollAllButton.game - 1, 1, 25);
            this.rollAllButton.count = -1;
            this.rollAllButton.title = "Nächste Runde";
          }
          //  kleine Straße
          else if (
            this.lastButtonY === 12 &&
            (this.streets(0, 0, 1, 1, 1, 1) ||
              this.streets(1, 1, 1, 1, 0, 0) ||
              this.streets(0, 1, 1, 1, 1, 0))
          ) {
            this.table[12].splice(this.rollAllButton.game - 1, 1, 30);
            this.rollAllButton.count = -1;
            this.rollAllButton.title = "Nächste Runde";
          }
          // Große Straße
          else if (
            this.lastButtonY === 13 &&
            (this.streets(0, 1, 1, 1, 1, 1) || this.streets(1, 1, 1, 1, 1, 0))
          ) {
            this.table[13].splice(this.rollAllButton.game - 1, 1, 40);
            this.rollAllButton.count = -1;
            this.rollAllButton.title = "Nächste Runde";
          }
          // Kniffel
          else if (this.lastButtonY === 14 && this.sameDice(5)) {
            this.table[14].splice(this.rollAllButton.game - 1, 1, 50);
            this.rollAllButton.count = -1;
            this.rollAllButton.title = "Nächste Runde";
          }
          // Chance
          else if (this.lastButtonY === 15) {
            this.table[15].splice(
              this.rollAllButton.game - 1,
              1,
              this.allCount()
            );
            this.rollAllButton.count = -1;
            this.rollAllButton.title = "Nächste Runde";
          } else {
            this.table[this.lastButtonY].splice(
              this.rollAllButton.game - 1,
              1,
              0
            );
            this.rollAllButton.count = -1;
            this.rollAllButton.title = "Nächste Runde";
          }
        }
      }
      //punkte berechnung
      if (this.lastButtonY === 18) {
        //oben gesamtberechnung
        //array der Punkte ohne Bonus
        let pointsUpWithoutBonus = [
          this.table[0][0],
          this.table[1][0],
          this.table[2][0],
          this.table[3][0],
          this.table[4][0],
          this.table[5][0],
        ];
        //rechnet Punkte ohne Bonus zusammen
        let sumUp = pointsUpWithoutBonus.reduce(this.getSum, 0);
        //fügt Punkte ohne Bonus hinzu
        this.table[6].splice(this.rollAllButton.game - 1, 1, sumUp);
        //es gibt Bonuspunkte, wenn gewisse Zahl erreicht ist
        if (this.table[6][0] >= 63) {
          //für 35 Punkte in Bonus ein
          this.table[7].splice(this.rollAllButton.game - 1, 1, 35);
          //array der Punkte und des Bonuses
          let pointsUpWithBonus = [this.table[6][0], this.table[7][0]];
          //rechnet Punkte und Bonus zusammen
          let sumUp = pointsUpWithBonus.reduce(this.getSum, 0);
          //fügt erechnete Punkte in Gesamt oben ein
          this.table[8].splice(this.rollAllButton.game - 1, 1, sumUp);
          this.table[17].splice(
            this.rollAllButton.game - 1,
            1,
            this.table[8][0]
          );
        } else if (this.table[6][0] < 63) {
          //fallse der Bonus nicht erreicht wird, bei Bonus 0
          this.table[7].splice(this.rollAllButton.game - 1, 1, 0);
          //fügt erechnete Punkte in Gesamt oben ein
          this.table[8].splice(
            this.rollAllButton.game - 1,
            1,
            this.table[6][0]
          );
          this.table[17].splice(
            this.rollAllButton.game - 1,
            1,
            this.table[8][0]
          );
        }
        //unten gesamtberechnung
        //fügt alle Punkte in ein Array ein
        let pointsDown = [
          this.table[9][0],
          this.table[10][0],
          this.table[11][0],
          this.table[12][0],
          this.table[13][0],
          this.table[14][0],
          this.table[15][0],
        ];
        //rechnet Punkte zusammen
        let sumDown = pointsDown.reduce(this.getSum, 0);
        //fügt Punkte in gesamt unten ein
        this.table[16].splice(this.rollAllButton.game - 1, 1, sumDown);
        //fügt gesamt punkte oben und gesamt punkte unten in ein array
        let pointsTotal = [this.table[17][0], this.table[16][0]];
        //rechnet die gesamt punkte zusammen
        let sumTotal = pointsTotal.reduce(this.getSum, 0);
        //fügt die Endsumme in Endsumme ein
        this.table[18].splice(this.rollAllButton.game - 1, 1, sumTotal);
        this.rollAllButton.game++;
        this.rollAllButton.roundText = "Neue Runde, neues Glück";
        this.rollAllButton.title = "Nächstes Spiel";
        this.rollAllButton.count = -1;
      }
    }
  }
  hitTest(x, y) {
    for (let i = 0; i < this.table.length; i++) {
      for (let j = 0; j < this.table[i].length; j++) {
        if (
          x > j * this.width + this.x - this.width / 2 &&
          x < j * this.width + this.x + this.width / 2 &&
          y > i * this.height + this.y - this.height / 2 &&
          y < i * this.height + this.y + this.height / 2
        ) {
          this.lastButtonX = j;
          this.lastButtonY = i;
          return true;
        }
      }
    }
    return false;
  }
}
