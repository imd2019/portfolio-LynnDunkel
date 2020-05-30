//leeres array für grid, spielfeld
let map = [];
//größe meiner kästchen
let gridScale = 22;

//reihen und spalten
let rows = 25;
let cols = 30;

//grid wird ausgeführt, ünfangs "0"berall a, auf länge und breite (unten definiert)
function fillMap() {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(0);
    }
    map.push(row);
  }
}
//j = spalte, i=reihe, überall wo eine "0"  ist, wird element hinhzugefügt
function playfield() {
  for (i = 0; i < map.length; i++) {
    for (j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        stroke("#0000cc");
        strokeWeight(2);
        noFill();
        rect(j * gridScale, i * gridScale, gridScale, gridScale, 5);
      }
    }
  }
}
//fügt "1" hinzu, entfernt "0" in Reihe
function row(row, start, end, was) {
  for (let i = start; i < end; i++) {
    map[row].splice(i, 1, was);
  }
}
//fügt "1" hinzu,entfernt "0" in Spalte
function col(col, start, end, was) {
  for (let i = start; i < end; i++) {
    map[i].splice(col, 1, was);
  }
}
//durch funktion elemente entfernt, "0" für "1"
function border() {
  // 0=Mauer, 1=weg, 2=geisterkasten, 3=startpunkt (kein scorepunkt)

  row(1, 1, 2, 4);
  //links
  row(1, 2, 14, 1);
  row(4, 2, 15, 1);
  row(6, 3, 6, 1);
  row(7, 8, 15, 1);
  row(8, 3, 6, 1);
  row(10, 0, 10, 1);
  row(13, 3, 15, 1);
  row(15, 0, 10, 1);
  row(19, 3, 15, 1);
  row(21, 8, 15, 1);
  row(23, 2, 15, 1);

  col(1, 2, 5, 1);
  col(2, 6, 9, 1);
  col(2, 16, 23, 1);
  col(3, 11, 13, 1);
  col(6, 5, 10, 1);
  col(6, 11, 13, 1);
  col(6, 14, 15, 1);
  col(7, 2, 4, 1);
  col(6, 20, 23, 1);
  col(8, 5, 7, 1);
  col(8, 20, 21, 1);
  col(10, 10, 13, 1);
  col(10, 14, 19, 1);
  col(10, 20, 21, 1);
  col(11, 5, 7, 1);
  col(11, 2, 4, 1);
  col(12, 8, 13, 1);
  col(12, 14, 19, 1);
  col(13, 2, 4, 1);
  col(14, 15, 17, 2);

  //rechts
  row(1, 16, 28, 1);
  row(4, 15, 28, 1);
  row(6, 24, 28, 1);
  row(7, 15, 21, 1);
  row(8, 24, 27, 1);
  row(10, 20, 30, 1);
  row(13, 15, 27, 1);
  row(15, 20, 30, 1);
  row(19, 15, 27, 1);
  row(21, 15, 22, 1);
  row(23, 15, 27, 1);
  row(14, 14, 16, 2);

  col(28, 1, 5, 1);
  col(27, 7, 9, 1);
  col(27, 16, 24, 1);
  col(26, 11, 13, 1);
  col(23, 5, 10, 1);
  col(23, 11, 13, 1);
  col(23, 14, 15, 1);
  col(22, 2, 4, 1);
  col(23, 20, 23, 1);
  col(21, 5, 8, 1);
  col(21, 20, 21, 1);
  col(19, 10, 13, 1);
  col(19, 14, 19, 1);
  col(19, 20, 21, 1);
  col(18, 5, 7, 1);
  col(18, 2, 4, 1);

  col(17, 14, 19, 1);
  col(17, 8, 13, 1);
  col(16, 2, 4, 1);
  col(15, 15, 17, 2);
}
