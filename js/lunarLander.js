function setup() {
  var canvas = createCanvas(650, 650);
  canvas.parent("lunarjs");
}
window.addEventListener(
  "keydown",
  function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

//werte spaceman
let spaceman = {
  x: 90,
  y: 450,
  scale: 1,
};

//werte ziel
let boden = {
  x: 500,
  y: 600,
  scale: 0,
};

//werte saat
let saat1 = { scale: 0 };

//werte text erklärung
let text1 = { x: 310, y: 290, size: 10, correction: 0 };

//werte pflanze
let pflanze1 = {
  x: 300,
  y: 330,
  scale: 0.4,
  color1: "#eeaa66",
  color2: "#ffeeaa",
};

//werte blase
let blase1 = { x: 210, y: 350, scale: 1 };

//tankanzeige
let fuel = 100.25;

//geschwindigkeistanzeige
let speed = 0;

//bewegungen: runter, rechts, links
let gravity = 0;
let movementRight = 0;
let movementLeft = 0;

//gewonnen oder verloren text
let winOrLoose = "";

//startpunkt (nichts läuft ohne, dass es war ist)
let mode = false;

//erklärung wie zu spielen
let whatToDo = "Can you help to find a good spot?";
let whatToDo2 = "Yes? So press enter!";

//spielfigur
function player(spaceman) {
  noStroke();

  //körper
  fill("#ffffff");
  rect(
    spaceman.x - 30 * spaceman.scale,
    spaceman.y + 20 * spaceman.scale,
    60 * spaceman.scale,
    60 * spaceman.scale
  );

  //körper innen
  fill("#000000");
  rect(
    spaceman.x - 27.5 * spaceman.scale,
    spaceman.y + 22 * spaceman.scale,
    55 * spaceman.scale,
    20 * spaceman.scale
  );
  //links innen innen
  fill("#ffffff");
  rect(
    spaceman.x - 20 * spaceman.scale,
    spaceman.y + 25 * spaceman.scale,
    20 * spaceman.scale,
    10 * spaceman.scale
  );

  fill("#000000");
  rect(
    spaceman.x - 18 * spaceman.scale,
    spaceman.y + 26 * spaceman.scale,
    5 * spaceman.scale,
    2 * spaceman.scale
  );
  rect(
    spaceman.x - 18 * spaceman.scale,
    spaceman.y + 29 * spaceman.scale,
    5 * spaceman.scale,
    2 * spaceman.scale
  );
  rect(
    spaceman.x - 18 * spaceman.scale,
    spaceman.y + 32 * spaceman.scale,
    5 * spaceman.scale,
    2 * spaceman.scale
  );

  rect(
    spaceman.x - 8 * spaceman.scale,
    spaceman.y + 26 * spaceman.scale,
    5 * spaceman.scale,
    2 * spaceman.scale
  );
  rect(
    spaceman.x - 8 * spaceman.scale,
    spaceman.y + 29 * spaceman.scale,
    5 * spaceman.scale,
    2 * spaceman.scale
  );
  rect(
    spaceman.x - 8 * spaceman.scale,
    spaceman.y + 32 * spaceman.scale,
    5 * spaceman.scale,
    2 * spaceman.scale
  );

  //rechts innen innen
  fill("#ffffff");
  rect(
    spaceman.x + 5 * spaceman.scale,
    spaceman.y + 25 * spaceman.scale,
    20 * spaceman.scale,
    14 * spaceman.scale
  );

  fill("#000000");
  ellipse(spaceman.x + 8 * spaceman.scale, spaceman.y + 28 * spaceman.scale, 3);
  rect(
    spaceman.x + 14 * spaceman.scale,
    spaceman.y + 26 * spaceman.scale,
    10 * spaceman.scale,
    1 * spaceman.scale
  );
  rect(
    spaceman.x + 14 * spaceman.scale,
    spaceman.y + 28 * spaceman.scale,
    10 * spaceman.scale,
    1 * spaceman.scale
  );
  rect(
    spaceman.x + 14 * spaceman.scale,
    spaceman.y + 31 * spaceman.scale,
    10 * spaceman.scale,
    1 * spaceman.scale
  );
  rect(
    spaceman.x + 14 * spaceman.scale,
    spaceman.y + 33 * spaceman.scale,
    10 * spaceman.scale,
    1 * spaceman.scale
  );
  rect(
    spaceman.x + 14 * spaceman.scale,
    spaceman.y + 37 * spaceman.scale,
    10 * spaceman.scale,
    1 * spaceman.scale
  );

  //hals bzw gesicht
  fill("#ffffff");
  rect(
    spaceman.x - 3 * spaceman.scale,
    spaceman.y + 12 * spaceman.scale,
    6 * spaceman.scale,
    8 * spaceman.scale
  );

  rect(
    spaceman.x - 4 * spaceman.scale,
    spaceman.y + 6 * spaceman.scale,
    8 * spaceman.scale,
    4 * spaceman.scale
  );
  //ding zwischen augen
  rect(
    spaceman.x - 3 * spaceman.scale,
    spaceman.y - 16 * spaceman.scale,
    6 * spaceman.scale,
    23 * spaceman.scale
  );

  //augen
  //rechts
  fill("#ffffff");
  beginShape();
  curveVertex(
    spaceman.x + 3 * spaceman.scale,
    spaceman.y - 20 * spaceman.scale
  );
  curveVertex(
    spaceman.x + 3 * spaceman.scale,
    spaceman.y - 20 * spaceman.scale
  );
  curveVertex(
    spaceman.x + 35 * spaceman.scale,
    spaceman.y - 9 * spaceman.scale
  );
  curveVertex(
    spaceman.x + 30 * spaceman.scale,
    spaceman.y + 10 * spaceman.scale
  );
  curveVertex(
    spaceman.x + 15 * spaceman.scale,
    spaceman.y + 10 * spaceman.scale
  );
  curveVertex(spaceman.x + 3 * spaceman.scale, spaceman.y - 2 * spaceman.scale);
  curveVertex(
    spaceman.x + 3 * spaceman.scale,
    spaceman.y - 12 * spaceman.scale
  );
  curveVertex(
    spaceman.x + 3 * spaceman.scale,
    spaceman.y - 12 * spaceman.scale
  );
  endShape();

  fill("#333333");
  stroke("#000000");
  strokeWeight(2 * spaceman.scale);
  ellipse(
    spaceman.x + 16 * spaceman.scale,
    spaceman.y - 5 * spaceman.scale,
    18 * spaceman.scale
  );

  //links
  noStroke();
  fill("#ffffff");
  beginShape();
  curveVertex(
    spaceman.x - 3 * spaceman.scale,
    spaceman.y - 20 * spaceman.scale
  );
  curveVertex(
    spaceman.x - 3 * spaceman.scale,
    spaceman.y - 20 * spaceman.scale
  );
  curveVertex(
    spaceman.x - 35 * spaceman.scale,
    spaceman.y - 9 * spaceman.scale
  );
  curveVertex(
    spaceman.x - 30 * spaceman.scale,
    spaceman.y + 10 * spaceman.scale
  );
  curveVertex(
    spaceman.x - 15 * spaceman.scale,
    spaceman.y + 10 * spaceman.scale
  );
  curveVertex(spaceman.x - 3 * spaceman.scale, spaceman.y - 2 * spaceman.scale);
  curveVertex(
    spaceman.x - 3 * spaceman.scale,
    spaceman.y - 12 * spaceman.scale
  );
  curveVertex(
    spaceman.x - 3 * spaceman.scale,
    spaceman.y - 12 * spaceman.scale
  );
  endShape();

  fill("#333333");
  stroke("#000000");
  strokeWeight(2 * spaceman.scale);
  ellipse(
    spaceman.x - 16 * spaceman.scale,
    spaceman.y - 5 * spaceman.scale,
    18 * spaceman.scale
  );

  //rechts rad
  noStroke();
  fill("#ffffff");
  rect(
    spaceman.x + 35 * spaceman.scale,
    spaceman.y + 60 * spaceman.scale,
    20 * spaceman.scale,
    3 * spaceman.scale
  );
  rect(
    spaceman.x + 35 * spaceman.scale,
    spaceman.y + 65 * spaceman.scale,
    20 * spaceman.scale,
    3 * spaceman.scale
  );
  rect(
    spaceman.x + 35 * spaceman.scale,
    spaceman.y + 70 * spaceman.scale,
    20 * spaceman.scale,
    3 * spaceman.scale
  );
  rect(
    spaceman.x + 35 * spaceman.scale,
    spaceman.y + 75 * spaceman.scale,
    20 * spaceman.scale,
    3 * spaceman.scale
  );
  rect(
    spaceman.x + 35 * spaceman.scale,
    spaceman.y + 80 * spaceman.scale,
    20 * spaceman.scale,
    3 * spaceman.scale
  );
  rect(
    spaceman.x + 35 * spaceman.scale,
    spaceman.y + 85 * spaceman.scale,
    20 * spaceman.scale,
    6 * spaceman.scale
  );

  //links rad
  fill("#ffffff");
  rect(
    spaceman.x - 55 * spaceman.scale,
    spaceman.y + 60 * spaceman.scale,
    20 * spaceman.scale,
    3 * spaceman.scale
  );
  rect(
    spaceman.x - 55 * spaceman.scale,
    spaceman.y + 65 * spaceman.scale,
    20 * spaceman.scale,
    3 * spaceman.scale
  );
  rect(
    spaceman.x - 55 * spaceman.scale,
    spaceman.y + 70 * spaceman.scale,
    20 * spaceman.scale,
    3 * spaceman.scale
  );
  rect(
    spaceman.x - 55 * spaceman.scale,
    spaceman.y + 75 * spaceman.scale,
    20 * spaceman.scale,
    3 * spaceman.scale
  );
  rect(
    spaceman.x - 55 * spaceman.scale,
    spaceman.y + 80 * spaceman.scale,
    20 * spaceman.scale,
    3 * spaceman.scale
  );
  rect(
    spaceman.x - 55 * spaceman.scale,
    spaceman.y + 85 * spaceman.scale,
    20 * spaceman.scale,
    6 * spaceman.scale
  );

  //hand links
  rect(
    spaceman.x - 45 * spaceman.scale,
    spaceman.y + 25 * spaceman.scale,
    20 * spaceman.scale,
    8 * spaceman.scale
  );
  rect(
    spaceman.x - 45 * spaceman.scale,
    spaceman.y + 35 * spaceman.scale,
    20 * spaceman.scale,
    8 * spaceman.scale
  );

  //hand rechts
  rect(
    spaceman.x + 25 * spaceman.scale,
    spaceman.y + 25 * spaceman.scale,
    20 * spaceman.scale,
    8 * spaceman.scale
  );
  rect(
    spaceman.x + 25 * spaceman.scale,
    spaceman.y + 35 * spaceman.scale,
    20 * spaceman.scale,
    8 * spaceman.scale
  );
}

//nahdran zu gewinnen
function herz(spaceman) {
  fill("#980000");
  ellipse(
    spaceman.x - 8 * spaceman.scale,
    spaceman.y + 55 * spaceman.scale,
    20 * spaceman.scale,
    18 * spaceman.scale
  );
  ellipse(
    spaceman.x + 8 * spaceman.scale,
    spaceman.y + 55 * spaceman.scale,
    20 * spaceman.scale,
    18 * spaceman.scale
  );
  triangle(
    spaceman.x - 17 * spaceman.scale,
    spaceman.y + 59.75 * spaceman.scale,
    spaceman.x,
    spaceman.y + 75 * spaceman.scale,
    spaceman.x + 17 * spaceman.scale,
    spaceman.y + 59.75 * spaceman.scale
  );
}

//boden
function ground(boden) {
  //boden
  noStroke();
  fill("#ffffdd");
  ellipse(boden.x, boden.y, 120 * boden.scale, 10 * boden.scale);

  //stab
  push();
  translate(boden.x - 80 * boden.scale, boden.y - 145 * boden.scale);
  rotate(6);
  fill("#aa8855");
  rect(0, 0, 5 * boden.scale, 150 * boden.scale);
  pop();

  //fahne
  fill("red");
  beginShape();
  //oberer teil
  curveVertex(boden.x - 78.5 * boden.scale, boden.y - 140 * boden.scale);
  curveVertex(boden.x - 78.5 * boden.scale, boden.y - 140 * boden.scale);
  curveVertex(boden.x - 100 * boden.scale, boden.y - 150 * boden.scale);
  curveVertex(boden.x - 110 * boden.scale, boden.y - 150 * boden.scale);
  curveVertex(boden.x - 120 * boden.scale, boden.y - 145 * boden.scale);
  curveVertex(boden.x - 130 * boden.scale, boden.y - 140 * boden.scale);
  curveVertex(boden.x - 140 * boden.scale, boden.y - 140 * boden.scale);

  //gerade linie
  curveVertex(boden.x - 160 * boden.scale, boden.y - 150 * boden.scale);

  curveVertex(boden.x - 160 * boden.scale, boden.y - 100 * boden.scale);

  //unterer teil
  curveVertex(boden.x - 160 * boden.scale, boden.y - 80 * boden.scale);
  curveVertex(boden.x - 150 * boden.scale, boden.y - 75 * boden.scale);
  curveVertex(boden.x - 140 * boden.scale, boden.y - 75 * boden.scale);
  curveVertex(boden.x - 130 * boden.scale, boden.y - 80 * boden.scale);
  curveVertex(boden.x - 120 * boden.scale, boden.y - 85 * boden.scale);
  curveVertex(boden.x - 110 * boden.scale, boden.y - 90 * boden.scale);
  curveVertex(boden.x - 100 * boden.scale, boden.y - 90 * boden.scale);
  curveVertex(boden.x - 61 * boden.scale, boden.y - 80 * boden.scale);
  curveVertex(boden.x - 61 * boden.scale, boden.y - 80 * boden.scale);
  endShape();
}

function playmode() {
  //pfeil nach oben
  if (keyIsDown(UP_ARROW) && mode === true) {
    gravity -= 0.5;
    fuel -= 1;
    speed -= 1.5;
  }

  //pfeil rechts
  if (keyIsDown(RIGHT_ARROW) && mode === true) {
    movementRight += 0.5;
    movementLeft = 0;
    fuel -= 0.5;
  }

  //pfeil links
  if (keyIsDown(LEFT_ARROW) && mode === true) {
    movementLeft += 0.5;
    movementRight = 0;
    fuel -= 0.5;
  }

  //extra speed für runter
  if (keyIsDown(DOWN_ARROW) && mode === true) {
    gravity += 1;
    fuel -= 0.5;
  }

  //aufhebung der rechts bewegung
  if (movementRight > 0 && mode === true) {
    movementRight -= 0.1;
  }

  //aufhebung der links bewegung
  if (movementLeft > 0 && mode === true) {
    movementLeft -= 0.1;
  }

  //beschleunigung der runter bewegung
  if (gravity > 0 && mode === true) {
    gravity += 0.15;
    speed += 0.5;
  }

  if (gravity < 0 && mode === true) {
    gravity += 0.3;
  }

  if ((speed <= 25 || speed === "A WINNER") && mode === true) {
    herz(spaceman);
  }
}

//wenn er auf den boden kommt
function ziel() {
  //stop am ende des bodens
  if (spaceman.y >= boden.y - 100 * boden.scale) {
    gravity = 0;
    movementLeft = 0;
    movementRight = 0;
  }

  //tank ist leer
  if (fuel <= 0) {
    gravity = 0;
    movementLeft = 0;
    movementRight = 0;
    fuel = 0;
    mode = false;
  }

  //gewonnen
  if (
    spaceman.x >= boden.x - 60 * boden.scale &&
    spaceman.x <= boden.x + 60 * boden.scale &&
    spaceman.y >= boden.y - 100 * boden.scale &&
    speed <= 25
  ) {
    whatToDo = "Yes, you got it! ";
    whatToDo2 = "One more time? Press space!";

    mode = false;
    fuel = "Sun is";
    speed = "here";

    pflanze1.scale = 3;
    pflanze1.x = 350;
    pflanze1.color1 = "#eeaa66";
    pflanze1.color2 = "#ffeeaa";
    blase1.scale = 3;
    blase1.x = 25;
    text1.x = 300;
    text1.y = 100;
    text1.size = 30;
    text1.correction = 15;
    spaceman.x = 320;
    spaceman.y = 400;
    spaceman.scale = 4;

    saat1.scale = 3;

    boden.scale = 0;
  }

  //verloren
  // 1. links vom ziel oder rechts vom ziel
  // 2.und y wie die grenze
  // 3.oder außerhalb des spielfeldes rechts
  // 4.oder außerhalb des spielfeldes links
  // 5.oder tank leer
  // 6.oder innerhalb des zieles mit zu hoher geschwindigkeit
  if (
    ((spaceman.x <= boden.x - 60 * boden.scale ||
      spaceman.x >= boden.x + 60 * boden.scale) &&
      spaceman.y >= boden.y - 100 * boden.scale) ||
    (spaceman.x >= 700 && spaceman.y >= 0) ||
    (spaceman.x < -50 && spaceman.y >= 0) ||
    fuel === 0 ||
    (spaceman.x >= boden.x - 60 * boden.scale &&
      spaceman.x <= boden.x + 60 * boden.scale &&
      spaceman.y >= boden.y - 100 * boden.scale &&
      speed > 25)
  ) {
    whatToDo = "Ohh, no! That was'nt a good spot! ";
    whatToDo2 = "Try it again and press space bar!";
    mode = false;
    fuel = "No";
    speed = "sun here";

    pflanze1.scale = 3;
    pflanze1.x = 350;
    pflanze1.color1 = "#3b0000";
    pflanze1.color2 = "#460000";
    blase1.scale = 3;
    blase1.x = 25;
    text1.x = 300;
    text1.y = 150;
    text1.size = 30;
    text1.correction = 15;
    spaceman.x = 320;
    spaceman.y = 400;
    spaceman.scale = 4;
  }
}

//reset & start
function keyPressed() {
  //start

  if (keyCode === ENTER && mode === false) {
    mode = true;
    gravity = 0.5;
    whatToDo = "";
    speed = 0;
    whatToDo = "";
    whatToDo2 = "";
    spaceman.x = 40;
    spaceman.y = 50;
    blase1.scale = 0;
    pflanze1.scale = 0;
    boden.scale = spaceman.scale = random(0.15, 0.5);
    boden.x = round(random(50, 500));
  }

  //reset
  if (keyCode === 32 && (mode === false || fuel <= 0)) {
    gravity = 0;
    movementLeft = 0;
    movementRight = 0;
    spaceman.x = 90;
    spaceman.y = 450;

    fuel = 100.25;
    speed = 0;

    spaceman.scale = 1;

    pflanze1.scale = 0.4;
    pflanze1.x = 310;
    pflanze1.color1 = "#eeaa66";
    pflanze1.color2 = "#ffeeaa";

    blase1.scale = 1;
    blase1.x = 210;

    whatToDo = "One more time?";
    whatToDo2 = "Yes? So press enter!";
    text1.x = 310;
    text1.y = 290;
    text1.size = 10;
    text1.correction = 0;

    boden.scale = 0;

    saat1.scale = 0;
  }
}

//texte
function erklärung(text1) {
  //erklärung ob enter oder reset und win or loose
  fill("#000000");
  noStroke();
  textAlign(CENTER);
  textSize(text1.size);
  text(whatToDo, text1.x, text1.y);
  text(whatToDo2, text1.x, text1.y + 15 + text1.correction);

  //anzeigen
  fill("#ffeeaa");
  textAlign(LEFT);
  textSize(12);
  //tank
  text("FUEL:   " + fuel, 530, 20);
  //speed
  text("SPEED:   " + speed, 520, 40);
}

function pflanze(pflanze1) {
  fill("#550000");
  ellipse(
    pflanze1.x - 10 * pflanze1.scale,
    pflanze1.y,
    180 * pflanze1.scale,
    30 * pflanze1.scale
  );

  strokeWeight(2 * pflanze1.scale);
  stroke(pflanze1.color1);
  fill(pflanze1.color2);
  ellipse(
    pflanze1.x - 10 * pflanze1.scale,
    pflanze1.y - 10 * pflanze1.scale,
    15 * pflanze1.scale,
    30 * pflanze1.scale
  );

  fill("#550000");
  noStroke();
  ellipse(
    pflanze1.x - 10 * pflanze1.scale,
    pflanze1.y - 5 * pflanze1.scale,
    30 * pflanze1.scale,
    10 * pflanze1.scale
  );

  stroke("#595959");
  strokeWeight(5 * pflanze1.scale);
  fill("#656565");
  rect(
    pflanze1.x - 100 * pflanze1.scale,
    pflanze1.y,
    180 * pflanze1.scale,
    160 * pflanze1.scale,
    10 * pflanze1.scale,
    10 * pflanze1.scale,
    400 * pflanze1.scale,
    400 * pflanze1.scale
  );
  rect(
    pflanze1.x - 120 * pflanze1.scale,
    pflanze1.y,
    220 * pflanze1.scale,
    60 * pflanze1.scale,
    10 * pflanze1.scale,
    10 * pflanze1.scale,
    400 * pflanze1.scale,
    400 * pflanze1.scale
  );
}

function blase(blase1, pflanze1) {
  noStroke();
  fill("#ffffff");
  ellipse(
    blase1.x - 70 * blase1.scale,
    blase1.y + 70 * blase1.scale,
    10 * blase1.scale,
    10 * blase1.scale
  );
  ellipse(
    blase1.x - 55 * blase1.scale,
    blase1.y + 55 * blase1.scale,
    20 * blase1.scale,
    20 * blase1.scale
  );
  ellipse(
    blase1.x - 30 * blase1.scale,
    blase1.y + 30 * blase1.scale,
    40 * blase1.scale,
    40 * blase1.scale
  );

  ellipse(
    blase1.x + 30 * blase1.scale,
    blase1.y,
    70 * blase1.scale,
    60 * blase1.scale
  );
  ellipse(
    blase1.x + 60 * blase1.scale,
    blase1.y + 30 * blase1.scale,
    70 * blase1.scale,
    60 * blase1.scale
  );
  ellipse(
    blase1.x + 20 * blase1.scale,
    blase1.y - 40 * blase1.scale,
    70 * blase1.scale,
    60 * blase1.scale
  );
  ellipse(
    blase1.x + 30 * blase1.scale,
    blase1.y - 60 * blase1.scale,
    70 * blase1.scale,
    60 * blase1.scale
  );
  ellipse(
    blase1.x + 50 * blase1.scale,
    blase1.y - 80 * blase1.scale,
    70 * blase1.scale,
    60 * blase1.scale
  );
  ellipse(
    blase1.x + 80 * blase1.scale,
    blase1.y - 90 * blase1.scale,
    70 * blase1.scale,
    60 * blase1.scale
  );

  ellipse(
    blase1.x + 170 * blase1.scale,
    blase1.y,
    70 * blase1.scale,
    60 * blase1.scale
  );
  ellipse(
    blase1.x + 160 * blase1.scale,
    blase1.y + 30 * blase1.scale,
    70 * blase1.scale,
    60 * blase1.scale
  );
  ellipse(
    blase1.x + 180 * blase1.scale,
    blase1.y - 40 * blase1.scale,
    70 * blase1.scale,
    60 * blase1.scale
  );
  ellipse(
    blase1.x + 170 * blase1.scale,
    blase1.y - 60 * blase1.scale,
    70 * blase1.scale,
    60 * blase1.scale
  );
  ellipse(
    blase1.x + 130 * blase1.scale,
    blase1.y - 90 * blase1.scale,
    70 * blase1.scale,
    60 * blase1.scale
  );
  ellipse(
    blase1.x + 120 * blase1.scale,
    blase1.y + 40 * blase1.scale,
    70 * blase1.scale,
    60 * blase1.scale
  );

  ellipse(
    blase1.x + 100 * blase1.scale,
    blase1.y - 30 * blase1.scale,
    110 * blase1.scale,
    110 * blase1.scale
  );

  pflanze(pflanze1);
}

function saat(pflanze1, saat1) {
  fill("#00ba00");
  stroke("#009a00");
  strokeWeight(1);
  rect(
    pflanze1.x - 13 * saat1.scale,
    pflanze1.y - 40 * saat1.scale,
    4 * saat1.scale,
    20 * saat1.scale,
    6 * saat1.scale
  );

  ellipse(
    pflanze1.x - 10.5 * saat1.scale,
    pflanze1.y - 50 * saat1.scale,
    10 * saat1.scale,
    25 * saat1.scale
  );
}

function draw() {
  clear();

  background("#66ccff");

  // text("MausX" + mouseX, 150, 50);
  // text("MausY" + mouseY, 150, 70);

  ground(boden);

  ziel();
  blase(blase1, pflanze1);
  saat(pflanze1, saat1);
  erklärung(text1);
  player(spaceman);
  playmode();

  //befehle für die bewegeungen
  spaceman.y += gravity;
  spaceman.x += movementRight;
  spaceman.x -= movementLeft;
}
