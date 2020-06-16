let timeGhostKiller = 0;
let colGhost = 0;

//meine punkte
let score = [];
let scoreCount = 0;
let plusPoints = 0;
//futter
let food = [];
//leben
let lifes = [];
let highscore = [0];
//
ghostKiller = [];
//meine kleinen weißen Punkte gemalt
function scorePoints() {
  for (k = 0; k < score.length; k++) {
    noStroke();
    fill("white");
    ellipse(
      score[k][0] * gridScale + gridScale / 2,
      score[k][1] * gridScale + gridScale / 2,
      gridScale / 10,
      gridScale / 10
    );
  }
  stroke("white");
  strokeWeight(1);
  noFill();
  rect(
    0.5 * gridScale,
    26 * gridScale,
    4 * gridScale,
    gridScale,
    0.5 * gridScale
  );

  fill("white");
  textSize(0.6 * gridScale);
  textAlign(LEFT);
  noStroke();
  text("score: " + scoreCount, 1 * gridScale, 26.7 * gridScale);

  stroke("white");
  strokeWeight(1);
  noFill();
  rect(
    12 * gridScale,
    26 * gridScale,
    6 * gridScale,
    gridScale,
    0.5 * gridScale
  );
  fill("white");
  textSize(0.6 * gridScale);
  textAlign(LEFT);
  noStroke();
  text("Highscore: " + highscore, 12.5 * gridScale, 26.7 * gridScale);
}
//meine kleinen weißen Punkte positioniert
function positionScore() {
  for (i = 0; i < map.length; i++) {
    for (j = 0; j < map[i].length; j++) {
      if (map[i][j] === 1) {
        score.push([j, i]);
      }
    }
  }
}
//jetzt gehts ums futter
function drawFood(img) {
  noStroke();
  fill("white");
  for (let m = 0; m < food.length; m++) {
    imageMode(CENTER);
    image(
      img,
      food[m][0] * gridScale + gridScale / 2,
      food[m][1] * gridScale + gridScale / 2,
      40 / (gridScale / 10),
      40 / (gridScale / 10)
    );
  }
}
//essen wird positioniert
function positionFood() {
  while (food.length < 35 && mode === true) {
    food.push(random(score));
  }
}
//geist unschädlich macher wird gezeichnet
function drawGhostKiller(img) {
  noStroke();
  fill("yellow");
  for (let m = 0; m < ghostKiller.length; m++) {
    imageMode(CENTER);
    image(
      img,
      ghostKiller[m][0] * gridScale + gridScale / 2,
      ghostKiller[m][1] * gridScale + gridScale / 2,
      40 / (gridScale / 10),
      40 / (gridScale / 10)
    );
  }
}
//essen wird positioniert
function positionGhostKiller() {
  while (ghostKiller.length < 5) {
    ghostKiller.push(random(score));
  }
  //verhindert das zwei sachen aufeinander liegen
  for (let m in ghostKiller) {
    for (let p in food) {
      if (
        ghostKiller[m][0] === food[p][0] &&
        ghostKiller[m][1] === food[p][1]
      ) {
        ghostKiller.splice(m, 1);
        ghostKiller.push(random(score));
      }
    }
  }
}
