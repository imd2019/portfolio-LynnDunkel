let ghosts = [];
let directionPossible = true;

function drawGhost(a) {
  noStroke();
  //am anfang ist der index null, eine ellipse,
  for (p = 0; p < ghosts.length; p++) {
    imageMode(CENTER);
    image(
      ghosts[p].pic[a],
      ghosts[p].x * gridScale + gridScale / 2,
      ghosts[p].y * gridScale + gridScale / 2,
      40 / (gridScale / 10),
      40 / (gridScale / 10)
    );
  }
}
function spawnGhost(img1, img2, x, y) {
  let ghost = {
    pic: [img1, img2],
    x: x,
    y: y,
    dir: { x: 0, y: 0 },
    laenge: 1,
    directionsNumbers: [],
    right: true,
    left: true,
    down: true,
    up: true
  };
  ghosts.push(ghost);
}
function movementGhost() {
  for (let p in ghosts) {
    if (mode === true) {
      ghosts[p].x += ghosts[p].dir.x;
      ghosts[p].y += ghosts[p].dir.y;
    }
  }
}

function movementGhostWays(p) {
  ghostDirection(p);
  let rnd = random(ghosts[p].directionsNumbers);
  //raus aus dem kasten
  if (map[ghosts[p].y][ghosts[p].x] === 2) {
    ghosts[p].dir.y = -1;
    ghosts[p].dir.x = 0;
  }

  if (ghostWall(p) === false || ghostWays(p) === false) {
    while (directionPossible === false) {
      rnd = random(ghosts[p].directionsNumbers);

      if (
        rnd === "hoch" &&
        map[ghosts[p].y - 1][ghosts[p].x] === 1 &&
        ghosts[p].up === true
      ) {
        ghosts[p].dir.y = -1;
        ghosts[p].dir.x = 0;
        directionPossible = true;
      } else if (
        rnd === "runter" &&
        map[ghosts[p].y + 1][ghosts[p].x] === 1 &&
        ghosts[p].down === true
      ) {
        ghosts[p].dir.y = 1;
        ghosts[p].dir.x = 0;
        directionPossible = true;
      } else if (
        rnd === "rechts" &&
        map[ghosts[p].y][ghosts[p].x + 1] === 1 &&
        ghosts[p].right === true
      ) {
        ghosts[p].dir.x = 1;
        ghosts[p].dir.y = 0;
        directionPossible = true;
      } else if (
        rnd === "links" &&
        map[ghosts[p].y][ghosts[p].x - 1] === 1 &&
        ghosts[p].left === true
      ) {
        ghosts[p].dir.x = -1;
        ghosts[p].dir.y = 0;
        directionPossible = true;
      }
    }
    return;
  }
}

function ghostWays(p) {
  //trifft auf gang
  if (
    //alle
    (map[ghosts[p].y + 1][ghosts[p].x] === 1 &&
      map[ghosts[p].y - 1][ghosts[p].x] === 1 &&
      map[ghosts[p].y][ghosts[p].x + 1] === 1 &&
      map[ghosts[p].y][ghosts[p].x - 1] === 1) ||
    //oben unten und "rechts" frei
    (map[ghosts[p].y + 1][ghosts[p].x] === 1 &&
      map[ghosts[p].y - 1][ghosts[p].x] === 1 &&
      map[ghosts[p].y][ghosts[p].x + 1] === 1) ||
    //oben unten und "links" frei
    (map[ghosts[p].y + 1][ghosts[p].x] === 1 &&
      map[ghosts[p].y - 1][ghosts[p].x] === 1 &&
      map[ghosts[p].y][ghosts[p].x - 1] === 1) ||
    //""rechts"" "links" und oben frei
    (map[ghosts[p].y - 1][ghosts[p].x] === 1 &&
      map[ghosts[p].y][ghosts[p].x + 1] === 1 &&
      map[ghosts[p].y][ghosts[p].x - 1] === 1) ||
    //"rechts" "links" und unten
    (map[ghosts[p].y - 1][ghosts[p].x] === 1 &&
      map[ghosts[p].y][ghosts[p].x + 1] === 1 &&
      map[ghosts[p].y][ghosts[p].x - 1] === 1)
  ) {
    directionPossible = false;
    return false;
  } else {
    return true;
  }
}

function ghostWall(p) {
  //trifft auf wand
  if (map[ghosts[p].y + ghosts[p].dir.y][ghosts[p].x + ghosts[p].dir.x] === 0) {
    directionPossible = false;
    return false;
  } else {
    return true;
  }
}

function ghostDirection(p) {
  if (ghosts[p].dir.x === -1) {
    ghosts[p].right = false;
    ghosts[p].left = true;
    ghosts[p].up = true;
    ghosts[p].down = true;
    ghosts[p].directionsNumbers = ["runter", "hoch", "links"];
  }
  if (ghosts[p].dir.x === 1) {
    ghosts[p].left = false;
    ghosts[p].up = true;
    ghosts[p].down = true;
    ghosts[p].right = true;
    ghosts[p].directionsNumbers = ["runter", "hoch", "rechts"];
  }
  if (ghosts[p].dir.y === 1) {
    ghosts[p].up = false;
    ghosts[p].left = true;
    ghosts[p].right = true;
    ghosts[p].down = true;
    ghosts[p].directionsNumbers = ["runter", "rechts", "links"];
  }
  if (ghosts[p].dir.y === -1) {
    ghosts[p].down = false;
    ghosts[p].up = true;
    ghosts[p].left = true;
    ghosts[p].right = true;
    ghosts[p].directionsNumbers = ["hoch", "rechts", "links"];
  }
}
