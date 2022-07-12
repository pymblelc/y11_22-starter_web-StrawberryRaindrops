let button = document.getElementById("camerabtn");

let images = [
  "small-child.jpg",
  "textiles-dress.png",
  "small-child.jpg",
  "textiles-dress.png",
  "small-child.jpg",
  "textiles-dress.png",
  "small-child.jpg",
];

let currentSlide = 0 ;


camerabtn.addEventListener("click", function () {
  currentSlide += 1;
  console.log("+1");
  console.log(currentSlide, "pog")
  document.getElementById("slideImg").src = images[currentSlide];

  // if (currentSlide > 5) {
  //   currentSlide = 0 ;
  // }
  
});
//myDate.innerHTML = JSON.stringify(slides),

// document.getElementById("slideImg").src = images[currentSlide]

// if (currentSlide == 5) {
//   currentslide = 0;
//   console.log("back to 0");
// }