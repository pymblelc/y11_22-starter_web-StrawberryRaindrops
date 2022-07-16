let myImage = document.getElementById("myPhoto");
let myButton = document.getElementById("btnAnalyse");
let results = document.getElementById("myText");

// let imageURL = myImage.src; <- this was how to get the img then send it through the api
//the webcam thingy
let startCameraBtn = document.getElementById("startCamera");
let stopCameraBtn = document.getElementById("stopCamera");
let takePhotoBtn = document.getElementById("takePhoto");
let myWebcam = document.getElementById("webcam");
let myCanvas = document.getElementById("canvas");
let ctx = myCanvas.getContext("2d");
let submitBtn = document.getElementById("submit");
// const snapSoundElement = document.getElementById('snapSound');

let webcam = new Webcam(myWebcam, "user", myCanvas); // is this making a function

startCameraBtn.addEventListener("click", function () {
  webcam
    .start()
    .then((result) => {
      console.log("webcam started!");
    })
    .catch((error) => {
      console.log("error D:");
    });
});

stopCameraBtn.addEventListener("click", function () {
  webcam.stop();
});

takePhotoBtn.addEventListener("click", function () {
  var picture = webcam.snap(); // what
  webcam.stop();
});

submitBtn.addEventListener("click", function () {
  myCanvas.toBlob(function(blob) {
    ImageAPI.analyseFacesBlob(blob, (data) => {
      //console.log(data); used to be here but i just replaced it with my calculation stuff
      for (let i = 0; i < data.length; i++) {
        let haircolor = data[i].faceAttributes.hair.hairColor[0].color;
        let lipstick = data[i].faceAttributes.makeup.lipMakeup;
        let glasses = data[i].faceAttributes.glasses;
        if (i >= 1){
          console.log("too many people")
        }
        console.log(data);
  
        // myText.innerHTML += txt;
        
        if (haircolor == "black") {
          let hairText = hair[0].text; //this tells hairtext to match with the matching hair colour from the hair array
          let hairImg = hair[0].image;
          document.getElementById("hairImg").src = hairImg
          textBox2.innerHTML += hairText;
        }
        
        if (haircolor == "blond") {
          let hairText = hair[1].text; //this tells hairtext to match with the matching hair colour from the hair array
          textBox2.innerHTML += hairText;
        }
        
        if (glasses == "NoGlasses") {
          let glassesText = pants[0].text;
          textBox4.innerHTML += glassesText;

        }
      // console.log(data[i].faceAttributes.glasses);
      }
   
    });
  });
});

// var picture = webcam.snap();

// results.innerHTML = imageURL;

// myButton.addEventListener("click", function () {
//   ImageAPI.analyseFaces(imageURL, function (data) {
//     for (let i = 0; i < data.length; i++) {
//       let finalInfo = data[i].faceAttributes.hair.hairColor[0].color;
//       let lipstick = data[1].faceAttributes.makeup.lipMakeup;
//       let glasses = data[1].faceAttributes.glasses;
//       let txt =
//         "<p>Face " +
//         (i + 1) +
//         ": age is " +
//         finalInfo +
//         ", lipstick = " +
//         lipstick +
//         " are they wearing glasses? : " +
//         glasses;
//       ("</p>");

//       myText.innerHTML += txt;

//       if (finalInfo == "black") {
//         hairText == hair[0].top; //this tells hairtext to match with the matching hair colour from the hair array
//       }

//       if (finalInfo == "blond") {
//         hairText == hair[1].top; //this tells hairtext to match with the matching hair colour from the hair array
//       }
//     }
//     console.log(data);
//   });
// });



//this is where i'll write a little description for each top
hair = [
  {
    hair: "black",
    text: "This is a chic top to cover up from the sun while still being stylish. This top is reminiscent of korean street fashion and kpop fashion.",
    image: "small-child.jpg"
  },
  {
    hair: "blond",
    text: "frilly top hehe",
  },
  {
    hair: "brown",
    text: "this top ahahaha",
  },
  {
    hair: "red",
    text: "comfyyyyy yah",
  },
  {
    hair: "unknown&other",
    text: "thissss thingy",
  },
  {
    hair: "white&gray",
    text: "bonk",
  },
];


pants = [
  {
    glasses: "NoGlasses",
    text: "very minimalistic pants to compliment the top. This also gives an elegant vibe to your outfit which is nice to wear on a date with friends.",
    image:"textiles-dress.png"
  },
  {
    glasses: "ReadingGlasses",
  },
];
    
shoes = [
  {

  }
];
    