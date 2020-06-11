let project1;
let project2;
let project3;

function preload() {
  project1 = loadImage("../img/monster.svg");
  project2 = loadImage("../img/walle.svg");
  project3 = loadImage("../img/logo.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
}

new p5();
var width = windowWidth;
var height = windowHeight;

window.addEventListener("resize", function () {
  resizeCanvas(windowWidth, windowHeight);
  clear();
});
