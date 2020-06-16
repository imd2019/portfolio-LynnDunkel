function setup() {
  var canvas = createCanvas(665, 600);
  canvas.parent("snakejs");
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
//geister werden einmal beim öffnen gezeichnet
let start = true;
//schlange
let snake = { x: 1, y: 1, tail: [], laenge: 0, dir: { x: 0, y: 0 }, speed: 1 };
//spiel läuft
let mode = true;
//spielgeschwinidkeit
let time = 0;
let gameSpeed = 7;

//schlange wird gezeichnet
function drawPlayer(img, img1) {
  fill("yellow");
  noStroke();
  //körper erstmal leer
  for (let i = 0; i < snake.tail.length; i++) {
    imageMode(CENTER);
    image(
      img1,
      snake.tail[i][0] * gridScale + gridScale / 2,
      snake.tail[i][1] * gridScale + gridScale / 2,
      40 / (gridScale / 10),
      40 / (gridScale / 10)
    );
  }
  //kopf der schlange
  fill("green");
  imageMode(CENTER);
  image(
    img,
    snake.x * gridScale + gridScale / 2,
    snake.y * gridScale + gridScale / 2,
    40 / (gridScale / 10),
    40 / (gridScale / 10)
  );
}
//schlange bewegt sich
function movementPlayer() {
  //eine ellipse wird hinzugezeichnet, wenn spiel läuft
  if (mode === true) {
    snake.tail.push([snake.x, snake.y]);
  }
  //bewegung der schlange
  snake.x += snake.dir.x;
  snake.y += snake.dir.y;
  //eine ellipse wird immer weggenommen,
  // da sonst bei jeder bewegung eine neue gezeichnet wird.
  // wenn array größer als die länge ist, kommt eins weg
  if (snake.tail.length > snake.laenge && mode == true) {
    snake.tail.shift();
  }
}
//bewegung und reset
function keyPressed() {
  //bewegung durch Pfeiltasten
  if (mode === true) {
    if (keyCode === RIGHT_ARROW) {
      snake.dir.x = snake.speed;
      snake.dir.y = 0;
    }
    if (keyCode === LEFT_ARROW) {
      snake.dir.x = -snake.speed;
      snake.dir.y = 0;
    }
    if (keyCode === UP_ARROW) {
      snake.dir.x = 0;
      snake.dir.y = -snake.speed;
    }
    if (keyCode === DOWN_ARROW) {
      snake.dir.x = 0;
      snake.dir.y = snake.speed;
    }
  }
  //spiel hat gestoppt, reset erfolgt durch leertaste
  if (keyCode === 32 && mode === false) {
    mode = true;
    food = [];
    ghostKiller = [];
    snake.x = 1;
    snake.y = 1;
    snake.tail = [];
    snake.laenge = 0;
    snake.dir.x = 0;
    snake.dir.y = 0;
    scoreCount = 0;
    positionScore();
    colGhost = 0;
    for (let p in ghosts) {
      ghosts[p].dir.x = 0;
      ghosts[p].dir.y = 0;
    }
    ghosts[0].x = 14;
    ghosts[0].y = 15;
    ghosts[1].x = 15;
    ghosts[1].y = 15;
    ghosts[2].x = 14;
    ghosts[2].y = 16;
    ghosts[3].x = 15;
    ghosts[3].y = 16;
  }
}
//zusammenstoß von schlange
function collisionPlayer() {
  if (mode === true) {
    //kopf gegen wand
    if (map[snake.y][snake.x] === 0) {
      mode = false;
    }
    //essen & schlange wird länger
    for (let m in food) {
      if (snake.x === food[m][0] && snake.y === food[m][1]) {
        snake.laenge++;
        food.splice(m, 1);
        scoreCount += plusPoints;
        plusPoints = +50;
      }
    }
    //score erhöht
    for (let k in score) {
      if (snake.x === score[k][0] && snake.y === score[k][1]) {
        score.splice(k, 1);
        scoreCount += plusPoints;
        plusPoints = +10;
      }
    }
    //kopf trifft körper
    for (let i = 0; i < snake.tail.length; i++) {
      if (
        snake.x === snake.tail[i][0] &&
        snake.y === snake.tail[i][1] &&
        mode === true &&
        colGhost === 0
      ) {
        mode = false;
      }
    }
    //geist berührt am kopf wenn böse
    for (let p in ghosts) {
      if (
        snake.x === ghosts[p].x &&
        snake.y === ghosts[p].y &&
        colGhost === 0
      ) {
        mode = false;
      }
    }
    //geist berührt am kopf wenn gut
    for (let p in ghosts) {
      if (
        snake.x === ghosts[p].x &&
        snake.y === ghosts[p].y &&
        colGhost === 1
      ) {
        //geist wird zurückgesetzt
        for (let p in ghosts) {
          ghosts[p].x = 14;
          ghosts[p].y = 15;
        }
        plusPoints = +150;
      }
    }
    //switch auf andere seite schlange
    if (snake.x === -1 && snake.y === 10) {
      snake.x = 29;
      snake.y = 15;
    }
    if (snake.x === -1 && snake.y === 15) {
      snake.x = 29;
      snake.y = 10;
    }
    if (snake.x === 30 && snake.y === 10) {
      snake.x = 0;
      snake.y = 15;
    }
    if (snake.x === 30 && snake.y === 15) {
      snake.x = 0;
      snake.y = 10;
    }
    //switch auf andere seite ghost
    for (let p in ghosts) {
      if (ghosts[p].x === -1 && ghosts[p].y === 10) {
        ghosts[p].x = 29;
        ghosts[p].y = 10;
      }
      if (ghosts[p].x === -1 && ghosts[p].y === 15) {
        ghosts[p].x = 29;
        ghosts[p].y = 15;
      }
      if (ghosts[p].x === 30 && ghosts[p].y === 10) {
        ghosts[p].x = 0;
        ghosts[p].y = 10;
      }
      if (ghosts[p].x === 30 && ghosts[p].y === 15) {
        ghosts[p].x = 0;
        ghosts[p].y = 15;
      }
    }
    //geist berührt am körper wenn böse
    for (let t = snake.tail.length - 1; t >= 0; t--) {
      for (let p = 0; p < ghosts.length; p++) {
        if (
          snake.tail[t][0] === ghosts[p].x &&
          snake.tail[t][1] === ghosts[p].y &&
          colGhost === 0
        ) {
          //loch kommt in körper
          snake.tail.splice(t, 1);
          plusPoints = -100;
          break;
        }
      }
    }
    //geist berührt am körper wenn gut
    for (let t in snake.tail) {
      for (let p = 0; p < ghosts.length; p++) {
        if (
          snake.tail[t][0] === ghosts[p].x &&
          snake.tail[t][1] === ghosts[p].y &&
          colGhost === 1
        ) {
          plusPoints = +150;
          for (let p in ghosts) {
            ghosts[p].x = 14;
            ghosts[p].y = 15;
          }
        }
      }
    }
    //ghostKiller ist aktive
    //wenn colghost = 1 werden geister unschädlich
    for (let m in ghostKiller) {
      if (snake.x === ghostKiller[m][0] && snake.y === ghostKiller[m][1]) {
        colGhost = 1;
        ghostKiller.splice(m, 1);
      }
    }
    //geister sind nur begrenzte zeit unschädlich
    if (colGhost === 1) {
      timeGhostKiller++;
      if (timeGhostKiller === 300) {
        colGhost = 0;
        timeGhostKiller = 0;
      }
    }
  }
}
//wenn collision passiert moe=false,geht spiel nicht mehr
function gameOver() {
  if (mode === false) {
    snake.dir.x = 0;
    snake.dir.y = 0;
    if (scoreCount > highscore) {
      //highscore wird ersetzt
      highscore.splice(0, 1, scoreCount);
    }
  }
}
//wenn score leer, dann neue score punkte
function endless() {
  if (score.length <= 1) {
    positionScore();
  }
}

//nur einmal gezeichnet
fillMap();
border();
positionScore();

function draw() {
  background(0);
  time++;
  playfield();
  scorePoints();
  drawFood(diam);
  collisionPlayer();
  drawPlayer(head, bodytail);
  if (start === true) {
    start = false;
    spawnGhost(ghost1, ghost1kill, 14, 15);
    spawnGhost(ghost2, ghost2kill, 15, 15);
    spawnGhost(ghost3, ghost3kill, 14, 16);
    spawnGhost(ghost4, ghost4kill, 15, 16);
  }
  if (colGhost === 0) {
    drawGhost(0);
  }
  if (colGhost === 1) {
    drawGhost(1);
  }

  positionFood();
  gameOver();
  endless();
  drawGhostKiller(heart);
  positionGhostKiller();
  if (time > gameSpeed) {
    movementPlayer();
    movementGhost();
    if (snake.tail.length > 4) {
      movementGhostWays(0);
    }
    if (snake.tail.length > 8) {
      movementGhostWays(1);
    }
    if (snake.tail.length > 16) {
      movementGhostWays(2);
    }
    if (snake.tail.length > 32) {
      movementGhostWays(3);
    }
    time = 0;
  }
}
