let slideIndex = 1;

let prev = document.getElementById("prev");
let next = document.getElementById("next");
let one = document.getElementById("one");
let two = document.getElementById("two");
let three = document.getElementById("three");
let four = document.getElementById("four");

showSlide(slideIndex);

function plusSlides(n) {
  showSlide((slideIndex += n));
}

function currentSlide(n) {
  showSlide((slideIndex = n));
}

function showSlide(n) {
  let i;

  let slides = document.getElementsByClassName("myslides");

  let dots = document.getElementsByClassName("dots");

  if (n > slides.length) {
    slideIndex = 1;
  }

  if (n < 1) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";

  dots[slideIndex - 1].className += " active";
}

document.getElementById("prev").addEventListener("click", function () {
  plusSlides(-1);
});

document.getElementById("next").addEventListener("click", function () {
  plusSlides(1);
});

document.getElementById("one").addEventListener("click", function () {
  currentSlide(1);
});

document.getElementById("two").addEventListener("click", function () {
  currentSlide(2);
});

document.getElementById("three").addEventListener("click", function () {
  currentSlide(3);
});

document.getElementById("four").addEventListener("click", function () {
  currentSlide(4);
});
