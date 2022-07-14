let myImage = document.getElementById("myPhoto");
let myButton = document.getElementById("btnAnalyse");
let results = document.getElementById("myText");

let imageURL = myImage.src;
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
        let finalInfo = data[i].faceAttributes.hair.hairColor[0].color;
        let lipstick = data[1].faceAttributes.makeup.lipMakeup;
        let glasses = data[1].faceAttributes.glasses;
        let txt =
          "<p>Face " +
          (i + 1) +
          ": age is " +
          finalInfo +
          ", lipstick = " +
          lipstick +
          " are they wearing glasses? : " +
          glasses;
        ("</p>");
  
        myText.innerHTML += txt;
  
        if (finalInfo == "black") {
          hairText == hair[0].top; //this tells hairtext to match with the matching hair colour from the hair array
        }
  
        if (finalInfo == "blond") {
          hairText == hair[1].top; //this tells hairtext to match with the matching hair colour from the hair array
        }
      }
      console.log(data);
   
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

function text() {
  textBox1.innerHTML += hairtext; //this function puts things into text box in like a flex div thing i'll make later
}

//this is where i'll write a little description for each top
hair = [
  {
    hair: "black",
    top: "uhhhhhhhhhhh poggers champers",
  },
  {
    hair: "blond",
    top: "frilly top hehe",
  },
  {
    hair: "brown",
    top: "this top ahahaha",
  },
  {
    hair: "red",
    top: "comfyyyyy yah",
  },
  {
    hair: "unknown&other",
    top: "thissss thingy",
  },
  {
    hair: "white&gray",
    top: "bonk",
  },
];


 