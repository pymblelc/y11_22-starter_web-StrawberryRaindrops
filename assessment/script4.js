// let myImage = document.getElementById("myPhoto");
// let myButton = document.getElementById("btnAnalyse");
// let results = document.getElementById("myText");

// let imageURL = myImage.src; <- this was how to get the img then send it through the api
//the webcam thingy
let startCameraBtn = document.getElementById("startCamera");
let stopCameraBtn = document.getElementById("stopCamera");
let takePhotoBtn = document.getElementById("takePhoto");
let myWebcam = document.getElementById("webcam");
let myCanvas = document.getElementById("canvas");
let ctx = myCanvas.getContext("2d");
let submitBtn = document.getElementById("submit");
let webcam = new Webcam(myWebcam, "user", myCanvas); 

var haircolor;
var lipMakeup;
var glasses;

function showDiv(){
  document.getElementById("boxId").style.display = "block";
  console.log("block");
}; 
function hideDiv(){
  document.getElementById("cameraId").style.display = "none";
  console.log("hide");
}; 


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

submitBtn.addEventListener("click", function () {
  myCanvas.toBlob(function(blob) {
    ImageAPI.analyseFacesBlob(blob, (data) => {
      
      for (let i = 0; i < data.length; i++) {
        haircolor = data[i].faceAttributes.hair.hairColor[0].color;
        glasses = data[i].faceAttributes.glasses;
        lipstick = data[i].faceAttributes.makeup.lipMakeup;
        let mask = data[i].faceAttributes.occlusion.mouthOccluded;

        if (i == 1) {
          console.log("too many people")
          document.location.href = "error.html";
        }else{
          console.log("1 person")
        }
        if (mask == true) {
          console.log("wearing a mask")
          document.location.href = "error.html";
        }
        console.log(data);
      }
        
      });
    });
  });
  
  getResults.addEventListener("click", function () {
    
    function topText (number) {
      let hairText = hair[number].text; 
      let hairImg = hair[number].image;
      document.getElementById("hairImg").src = hairImg
      textBox2.innerHTML += hairText;
      document.getElementById("boxId").style.display = "show";
    }
    
    if (haircolor == "black") {
      topText(0)
    }
    if (haircolor == "blond") {
      topText(1)
    }
    if (haircolor == "brown") {
      topText(2)
    }       
    if (haircolor == "red") {
      topText(3)
    }
    if (haircolor == "unknown") {
      topText(4)
    }
    if (haircolor == "other") {
      topText(4)
    }
    if (haircolor == "white") {
      topText(5)
    }
    if (haircolor == "gray") {
      topText(5)
    }
  
  
    if (glasses == "NoGlasses") {
      let glassesText = pants[0].text;
      textBox4.innerHTML += glassesText;
  
    }
  // console.log(data[i].faceAttributes.glasses);
  }
  );



//this is where i'll write a little description for each top
hair = [
  {
    hair: "black",
    text: "This is a chic top to cover up from the sun while still being stylish. This top is reminiscent of korean street fashion and kpop fashion. Some substitutes for this may be a black singlet with spaghetti straps over a plain white t-shirt to achieve a similar look.",
    image: "black.PNG",
  },
  {
    hair: "blond",
    text: "This is a summer-y corset bodice top with cute sleeves. It gives princess vibes while being elegant and mature at the same time. Very nice to wear to go shopping or sight seeing. A substitute for this top may be a flowery t-shirt from uniqlo.",
    image: "blond.PNG",
  },
  {
    hair: "brown",
    text: "This over the shoulder white shirt look is nice for a sunny day but you still want to be stylish. It gives off elegant and mature vibes but also has a modern and chic aesthetic when paired with pants. This top can be substituted with a plain white graphic tshirt if you are uncomfortable with the mature look.",
   image:"brown",
  },
  {
    hair: "red",
    text: "This is a cute top that suits any weather. The sheer cardigan gives the look at cute and cozy vibe. A nice cafe look or to go out with friends. A substitute for this top would be a white singlet with a bulky cardigen to go for the oversized look.",
    image:"red.PNG",
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
  }
];


pants = [
  {
    glasses: "NoGlasses",
    text: "very minimalistic pants to compliment the top. This also gives an elegant vibe to your outfit which is nice to wear on a date with friends.",
    image:"noGlasses"
  },
  {
    glasses: "ReadingGlasses",
    text: "Nice torn black jeans to pair with any top, they are confortable to wear and helps give you outfit a casual vibe.",
    image:"yesGlasses",
  }
];
    
shoes = [
  {
    lip: "true",
    text: "White boot heels fit with any outfit, it gives you an extra bit of height and helps highlight the length of your legs.",
    image: "yesMakeup.PNG,"
  },
  {
    lip: "false",
    text: "plain white sneakers to tie in the outfit and help you stay confortable where ever you go.",
    image: "noMakeup.PNG",
  }
];
    