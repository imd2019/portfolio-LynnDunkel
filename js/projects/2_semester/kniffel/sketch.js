import Dice from "./dice.js";
import RollAllButton from "./rollAllButton.js";
import Table from "./table.js";
import Title from "./text.js";
import NewGame from "./newgame.js";

function setup() {
  var canvas = createCanvas(650, 600);
  canvas.parent("kniffeljs");
}
window.setup = setup;

let diceOne = new Dice(270, 80, 60, 60, 1, "#23150c", "#96642c", "#507531");
let diceTwo = new Dice(340, 80, 60, 60, 1, "#23150c", "#96642c", "#507531");
let diceThree = new Dice(410, 80, 60, 60, 1, "#23150c", "#96642c", "#507531");
let diceFour = new Dice(480, 80, 60, 60, 1, "#23150c", "#96642c", "#507531");
let diceFive = new Dice(550, 80, 60, 60, 1, "#23150c", "#96642c", "#507531");
let rollAllButton = new RollAllButton(
  170,
  190,
  100,
  20,
  "Würfeln",
  [diceOne, diceTwo, diceThree, diceFour, diceFive],
  0
);
let table = new Table(
  340,
  180,
  50,
  20,
  19,
  6,
  [diceOne, diceTwo, diceThree, diceFour, diceFive],
  rollAllButton
);

let newGame = new NewGame(65, 245, 95, 20, table, rollAllButton, [
  diceOne,
  diceTwo,
  diceThree,
  diceFour,
  diceFive,
]);

function mouseClicked() {
  rollAllButton.mouseClicked();

  diceOne.mouseClicked();
  diceTwo.mouseClicked();
  diceThree.mouseClicked();
  diceFour.mouseClicked();
  diceFive.mouseClicked();
  table.mouseClicked();
  newGame.mouseClicked();
}
window.mouseClicked = mouseClicked;

table.draw();

function textPasche() {
  let einser = new Title(308, 183, 12, "#23150c", "Einser:");
  let zweier = new Title(308, 203, 12, "#23150c", "Zweier:");
  let dreier = new Title(308, 223, 12, "#23150c", "Dreier:");
  let vierer = new Title(308, 243, 12, "#23150c", "Vierer:");
  let fünfer = new Title(308, 263, 12, "#23150c", "Fünfer:");
  let sechser = new Title(308, 283, 12, "#23150c", "Sechser:");

  let gsmt = new Title(308, 303, 12, "#23150c", "Gesamt:");
  let bonus = new Title(308, 323, 12, "#23150c", "Bonus:");
  let gsmtoben1 = new Title(308, 343, 12, "#23150c", "Gesamt oben:");

  let dreierpasch = new Title(308, 363, 12, "#23150c", "Dreierpasch:");
  let viererpasch = new Title(308, 383, 12, "#23150c", "Viererpasch:");
  let fullhouse = new Title(308, 403, 12, "#23150c", "Fullhouse:");
  let kleineStrasse = new Title(308, 423, 12, "#23150c", "Kleine Straße:");
  let grosseStrasse = new Title(308, 443, 12, "#23150c", "Große Straße:");
  let kniffel = new Title(308, 463, 12, "#23150c", "Kniffel:");
  let chance = new Title(308, 483, 12, "#23150c", "Chance:");

  let gsmtunten = new Title(308, 503, 12, "#23150c", "Gesamt unten:");
  let endsumme = new Title(308, 543, 12, "#23150c", "Endsumme:");
  einser.display();
  zweier.display();
  dreier.display();
  vierer.display();
  fünfer.display();
  sechser.display();

  gsmt.display();
  bonus.display();
  gsmtoben1.display();

  gsmtunten.display();
  endsumme.display();

  dreierpasch.display();
  viererpasch.display();
  fullhouse.display();
  kleineStrasse.display();
  grosseStrasse.display();
  kniffel.display();
  chance.display();
}

function textSpiel() {
  let spielEins = new Title(355, 165, 12, "#23150c", "1.Spiel");
  let spielZwei = new Title(407, 165, 12, "#23150c", "2.Spiel");
  let spielDrei = new Title(457, 165, 12, "#23150c", "3.Spiel");
  let spielVier = new Title(507, 165, 12, "#23150c", "4.Spiel");
  let spielFünf = new Title(557, 165, 12, "#23150c", "5.Spiel");
  let spielSechs = new Title(607, 165, 12, "#23150c", "6.Spiel");

  spielEins.display();
  spielZwei.display();
  spielDrei.display();
  spielVier.display();
  spielFünf.display();
  spielSechs.display();
}

function draw() {
  clear();
  background("#66ccff");
  image(wood, 220, 140, 440 / 1.1, 460 / 1.1);
  image(leaveOne, 25, 300, 215 / 2, 330 / 2);
  image(leaveTwo, 115, 240, 215 / 2, 440 / 2);
  image(totoro, 25, 400, 400 / 2, 330 / 2);
  image(fusel, 35, 270, 230 / 4, 230 / 4);
  image(fusel, 135, 210, 230 / 3, 230 / 3);

  table.display();
  diceOne.display();
  diceTwo.display();
  diceThree.display();
  diceFour.display();
  diceFive.display();
  rollAllButton.display();
  newGame.display();
  textPasche();
  textSpiel();
}
window.draw = draw;
