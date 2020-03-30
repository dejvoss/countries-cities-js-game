var categoryNames = "Country City Animal Thing Plant Name Car Points";
var letterCtr = 0;
var headerIndx = 0;
var speed = 120;

function wrtieCategory() {
    var hdrTag = document.getElementById("headerRow").getElementsByTagName("th");
  if (letterCtr < categoryNames.length) { 
      if (categoryNames.charAt(letterCtr) == " ") {
        headerIndx++;
      }
    hdrTag[headerIndx].innerHTML += categoryNames.charAt(letterCtr);
    letterCtr++;
    console.log(letterCtr);
    setTimeout(wrtieCategory, speed);
  }
}