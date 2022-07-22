let myImage = document.getElementById("myPhoto");
let myButton = document.getElementById("btnAnalyse");
let results = document.getElementById("myText");

let imageURL = myImage.src;

results.innerHTML = imageURL;

myButton.addEventListener("click", function () {
  ImageAPI.analyseFaces(imageURL, function (data) {
    for (let i = 0; i < data.length; i++) {
      let finalInfo = data[i].faceAttributes.age;
      let lipstick = data[1].faceAttributes.makeup.lipMakeup;
      let txt =
        "<p>Face " +
        (i + 1) +
        ": age is " +
        finalInfo +
        ", lipstick = " +
        lipstick +
        "</p>";

      myText.innerHTML += txt;
    }
    console.log(data);
    // let finalInfo = 'Dr hadwen looks about ' + data[0].faceAttributes.age + 'years old';
    // finalInfo += 'and has' + data[0].faceAttributes.facialhair.moustache + 'moustache';
    results.innerHTML = finalInfo;
  });
});
