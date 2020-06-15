function setup() {
  var canvas = createCanvas(550, 550);
  canvas.parent("roulettejs");
}
//farben
var yellow = "#f0f000";
var magenta = "#910091";
var black = "grey";
var white = "#ffffff";
var monsterColor = "#669922";
var monsterShadow = "#008800";

//text
var speech = "Come one, try it!";
var speech2 = "Choose";

//position Monster
var x = 260;
var y = 320;

//zustände
//gelber kasten
var state3 = 0;
//magenta kasten
var state1 = 0;
//monster ding
var state2 = 2;

//linienstärke Farbauswwahl
var linienStärke1 = 0;
var linienStärke2 = 0;

//spielleiter
function monster(monsterColor, monsterShadow) {
  noStroke();

  function auge(x, y, scaleauge) {
    //auge
    noStroke();

    fill(monsterShadow);
    ellipse(x, y - 90 * scaleauge, 60 * scaleauge);

    fill(monsterColor);
    ellipse(x - 1, y - 89 * scaleauge, 56 * scaleauge);

    fill("#fff");
    ellipse(x, y - 90 * scaleauge, 50 * scaleauge);

    fill("#002244");
    ellipse(x, y - 90 * scaleauge, 30 * scaleauge);

    noStroke();
    fill("#fff");
    ellipse(x + 5 * scaleauge, y - 95 * scaleauge, 5 * scaleauge);
    fill("#fff");
    ellipse(
      x - 10 * scaleauge,
      y - 80 * scaleauge,
      8 * scaleauge,
      9 * scaleauge
    );

    //hals
    noStroke();
    fill(monsterColor);
    rect(x - 4 * scaleauge, y - 61 * scaleauge, 8 * scaleauge, 12 * scaleauge);

    fill(monsterShadow);
    rect(x + 2 * scaleauge, y - 61 * scaleauge, 4 * scaleauge, 12 * scaleauge);
  }

  //sprechblase

  noStroke();
  fill("#ffffff");
  ellipse(x + 100, y - 55, 50, 30);
  fill("#66ccff");
  ellipse(x + 80, y - 50, 50, 30);
  fill("#ffffff");
  ellipse(x + 150, y - 100, 200, 100);

  //augen
  noStroke();
  auge(x, y, 1);

  push();
  translate(x + 9, y - 25);
  rotate(QUARTER_PI);
  auge(0, 0, 0.5);
  pop();

  push();
  translate(x - 5, y - 100);
  rotate(QUARTER_PI);
  auge(0, 0, 0.5);
  pop();

  push();
  translate(x, y - 85);
  rotate(QUARTER_PI + PI);
  auge(0, 0, 0.5);
  pop();

  noStroke();

  //füße
  fill(monsterShadow);
  rect(x - 20, y + 45, 10, 20);
  rect(x - 30, y + 55, 20, 10, 5);

  rect(x + 10, y + 45, 10, 20);
  rect(x + 10, y + 55, 20, 10, 5);

  //hände
  fill(monsterColor);
  push();
  translate(x - 45, y);
  rotate(QUARTER_PI);
  rect(0, 0, 10, 20, 5);
  pop();

  fill(monsterShadow);
  rect(x + 45, y, 20, 10, 5);

  //körper
  fill(monsterShadow);
  ellipse(x, y, 100);

  fill(monsterColor);
  ellipse(x - 2.5, y - 2.5, 95);

  //mund
  fill("#007722");
  ellipse(x, y + 20, 20, 30);
  //zähne
  fill("fff");
  ellipse(x - 4, y + 10, 4, 9);
  ellipse(x, y + 9, 4, 9);
  ellipse(x + 4, y + 10, 4, 9);
  ellipse(x, y + 31, 4, 9);

  stroke("#007722");
  strokeWeight(2);
  noFill();
  ellipse(x, y + 20, 20, 30);
  strokeWeight();
  noStroke();
}

//linker kasten
function farbauswahlGelb() {
  stroke(black);
  strokeWeight(linienStärke1);
  fill(yellow);
  rect(155, 335, 50, 50, 5);
}

//rechter kasten
function farbauswahlMagenta() {
  stroke(black);
  strokeWeight(linienStärke2);
  fill(magenta);
  rect(325, 320, 50, 50, 5);
}

//nochmal
function again() {
  strokeWeight(0);
  fill(white);
  rect(228, 385, 65, 55, 5);

  fill("#000000");
  textSize(13);
  textAlign(CENTER);
  text(speech2, x, y + 95);
}

function mousePressed() {
  //gelberkasten geklickt, dann wird state3=1
  if (
    state3 == 0 &&
    mouseX > 155 &&
    mouseX < 205 &&
    mouseY > 335 &&
    mouseY < 385
  ) {
    state3 = 1;
    linienStärke1 = 4;
    speech = "Sure yellow?";
    speech2 = "";
  }
  //magentakasten geklickt, dann wird state1=1
  if (
    state1 == 0 &&
    mouseX > 325 &&
    mouseX < 375 &&
    mouseY > 320 &&
    mouseY < 370
  ) {
    state1 = 1;
    linienStärke2 = 4;
    speech = "Sure magenta?";
    speech2 = "";
  }
  if (
    //wenn ein kasten geklickt, dann wird state2=random, monster
    (state1 == 1 || state3 == 1) &&
    mouseX > 220 &&
    mouseX < 300 &&
    mouseY > 290 &&
    mouseY < 360
  ) {
    state2 = round(random(0, 1));
    speech2 = "Next try!";
  }
  //zurücksetzen auf anfang
  if (mouseX > 228 && mouseX < 293 && mouseY > 385 && mouseY < 440) {
    state1 = 0;
    state3 = 0;
    state2 = 2;
    linienStärke1 = 0;
    linienStärke2 = 0;
    speech = "Come one, try it!";
    speech2 = "Choose";
    monsterColor = "#669922";
    monsterShadow = "#008800";
  }
}

function draw() {
  clear();
  background("#66ccff");

  /*text("MausX" + mouseX, 150, 50);
  text("MausY" + mouseY, 150, 80);*/

  monster(monsterColor, monsterShadow);

  farbauswahlGelb(yellow);

  farbauswahlMagenta(magenta);

  again();

  //text
  noStroke();
  fill("#000000");
  textSize(16);
  textAlign(CENTER);
  text(speech, x + 150, y - 100);

  if (state1 == 1 && state2 == 1) {
    speech = "Damn it!";
    monsterColor = magenta;
    monsterShadow = "#771199";
  }
  if (state1 == 1 && state2 == 0) {
    speech = "Haha, you loose!";
    monsterColor = "#aa1133";
    monsterShadow = "#660022";
  }
  if (state3 == 1 && state2 == 1) {
    speech = "#?!$§&!!";
    monsterColor = yellow;
    monsterShadow = "#eecc11";
  }
  if (state3 == 1 && state2 == 0) {
    speech = "Loooooooser!";
    monsterColor = "#aa1133";
    monsterShadow = "#660022";
  }
}
