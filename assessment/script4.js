//these are for the camera bits
let startCameraBtn = document.getElementById("startCamera");
let stopCameraBtn = document.getElementById("stopCamera");
let takePhotoBtn = document.getElementById("takePhoto");
let myWebcam = document.getElementById("webcam");
let myCanvas = document.getElementById("canvas");
let ctx = myCanvas.getContext("2d");
let submitBtn = document.getElementById("submit");
let webcam = new Webcam(myWebcam, "user", myCanvas);
//these functions are to hide or show stuff
function showDiv() {
  document.getElementById("boxId").style.display = "block";
  console.log("hidden camera and shown results");
}
function hideDiv() {
  document.getElementById("cameraId").style.display = "none";
  console.log("hide");
}
//this is the start camera button
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
  var picture = webcam.snap();
  webcam.stop();
});
//this submit button checks whether a person is covering their face or have many people in camera view and if they do,
//it sends them to the error screen
submitBtn.addEventListener("click", function () {
  myCanvas.toBlob(function (blob) { //this takes the data from the canvas and the data is turned into a blob
    ImageAPI.analyseFacesBlob(blob, (data) => { //the blob is then fed into the API
      for (let i = 0; i < data.length; i++) {
        let mask = data[i].faceAttributes.occlusion.mouthOccluded; //this analyses whether the person has a mouth covering
        
        if (i == 1) {
          console.log("too many people");
          document.location.href = "error.html";
        } else {
          console.log("1 person");
        }
        if (mask == true) {
          console.log("wearing a mask");
          document.location.href = "error.html";
        }
        console.log(data);
      }
    });
  });
});

// this button goes through the image again to get the results
getResults.addEventListener("click", function () {
  myCanvas.toBlob(function (blob) {
    ImageAPI.analyseFacesBlob(blob, (data) => {
      for (let i = 0; i < data.length; i++) {
        //these check for the hair colour, whether they wear glasses or wear lipstick
        let haircolor = data[i].faceAttributes.hair.hairColor[0].color;
        let glasses = data[i].faceAttributes.glasses;
        let lipstick = data[i].faceAttributes.makeup.lipMakeup;

        function topText (number) { //this function is for the 1st row of boxes in the results
          let hairText = hair[number].text; //this is turning the hairText into a text message from the array
          let hairImg = hair[number].image; // this is doing the same thing as text but for image
          document.getElementById("hairImg").src = hairImg //this tells the image div to turn into the image from the array
          textBox2.innerHTML += hairText; //this tells the div to turn into the text from the array
        }
        function pantsText (number) { //the functions for pants and shoes are the exact same to the top 
          let pantsText = pants[number].text; 
          let pantsImg = pants[number].image;
          document.getElementById("pantsImg").src = pantsImg
          textBox4.innerHTML += pantsText;
        }
        function shoesText (number) {
          let shoesText = shoes[number].text; 
          let shoesImg = shoes[number].image;
          document.getElementById("shoesImg").src = shoesImg
          textBox6.innerHTML += shoesText;
        }
        //haircolour
        if (haircolor == "black") { //this checks what the ai brought back and if the haircolour is black then it runs the topText function with the details for black hair from the hair array
          topText(0);
        }
        if (haircolor == "blond") {
          topText(1);
        }
        if (haircolor == "brown") {
          topText(2);
        }
        if (haircolor == "red") {
          topText(3);
        }
        if (haircolor == "unknown") {
          topText(4);
        }
        if (haircolor == "other") {
          topText(4);
        }
        if (haircolor == "white") {
          topText(5);
        }
        if (haircolor == "gray") {
          topText(5);
        }
        //glasses
        if (glasses == "NoGlasses") {
          pantsText(0);
        }
        if (glasses == "ReadingGlasses") {
          pantsText(1);
        }
        //lipstick
        if (lipstick == true) {
          shoesText(0);
        }
        if (lipstick == false) {
          shoesText(1);
        }
        console.log(shoes[0].image)
      }
    });
  });
});

//arrays

hair = [//this is the array for the haircolour
  {
    hair: "black",//this indicates to me which hair colour i'm writing for
    //below is the text message that describes the image
    text: "This is a chic top to cover up from the sun while still being stylish. This top is reminiscent of korean street fashion and kpop fashion. Some substitutes for this may be a black singlet with spaghetti straps over a plain white t-shirt to achieve a similar look.",
    image: "black.PNG", //this is the image of the top that i've picked to match black hair
  },
  {
    hair: "blond",
    text: "This is a summer-y corset bodice top with cute sleeves. It gives princess vibes while being elegant and mature at the same time. Very nice to wear to go shopping or sight seeing. A substitute for this top may be a flowery t-shirt from uniqlo.",
    image: "blond.PNG",
  },
  {
    hair: "brown",
    text: "This over the shoulder white shirt look is nice for a sunny day but you still want to be stylish. It gives off elegant and mature vibes but also has a modern and chic aesthetic when paired with pants. This top can be substituted with a plain white graphic tshirt if you are uncomfortable with the mature look.",
    image: "brown",
  },
  {
    hair: "red",
    text: "This is a cute top that suits any weather. The sheer cardigan gives the look at cute and cozy vibe. A nice cafe look or to go out with friends. A substitute for this top would be a white singlet with a bulky cardigen to go for the oversized look.",
    image: "red.PNG",
  },
  {
    hair: "unknown&other",
    text: "comfy clothing",
    image: "unknown_other.PNG",
  },
  {
    hair: "white&gray",
    text: "This red knitted crop top is a very cute piece to fit a romantic look. This is reminiscent of french fashion which is very clean and sleek. Any red top would be a good substitute if crop tops are not your type. ",
    image: "white_gray.PNG",
  },
];

pants = [
  {
    glasses: "NoGlasses",
    text: "These black leather pants are very minimalistic which helps to compliment the top. This also gives an elegant vibe to your outfit which is nice to wear on a date with friends.",
    image: "noGlasses.PNG",
  },
  {
    glasses: "ReadingGlasses",
    text: "Nice torn black jeans to pair with any top, they are confortable to wear and helps give you outfit a casual vibe.",
    image: "yesGlasses.PNG",
  },
];

shoes = [
  {
    lipstick: "true",
    text: "White boot heels fit with any outfit, it gives you an extra bit of height and helps highlight the length of your legs.",
    image: "yesLipstick.PNG",
  },
  {
    lipstick: "false",
    text: "Plain white sneakers to tie in the outfit and help you stay confortable where ever you go.",
    image: "noLipstick.PNG",
  },
];
