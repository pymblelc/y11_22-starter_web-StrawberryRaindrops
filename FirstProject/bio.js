let button = document.getElementById("camerabtn");


let images = [
    "https://imgur.com/gallery/NUyttbn",
    "https://imgur.com/gallery/lVlPvCB",
    "https://imgur.com/gallery/VWjRf",
    
  ];

button.addEventListener(
    "click", 
    currentSlide = 0 + 1,
    document.getElementById("slideImg").src = images[currentSlide]
);
//myDate.innerHTML = JSON.stringify(slides),
let currentSlide = 0; 
// document.getElementById("slideImg").src = images[currentSlide]
