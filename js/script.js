


// function for writing category names
var categoryNames = "Country City Animal Thing Plant Name Car Points";
var letterCtr = 0;
var headerIndx = 0;
var speed = 120;

function wrtieCategory() {
    var hdrTag = document.getElementById("headerRow").getElementsByTagName("th"); // take table header
    if (letterCtr < categoryNames.length) {
        if (categoryNames.charAt(letterCtr) == " ") { //check if text in category names has space, if yes change the header index
            headerIndx++;
        }
        hdrTag[headerIndx].innerHTML += categoryNames.charAt(letterCtr);
        letterCtr++;
        setTimeout(wrtieCategory, speed);
    }
}

function drawTable() {
    document.getElementById("GameTable").classList.add("bottomLine");
 
}

