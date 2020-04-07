//game initialization, user name form, game settings, declaring 3 important variable for game - user name, difficult level and choosen categories

var userName; //declare global variable user name    
var difLevel;   // global variable for difficult level
var selCategor =[]; // global variable for selected categories


// Initialize User name form by clicking get started button
function openUserNameForm() {
    document.getElementById("userNameForm").style.display = "block";
};

// Close user name form by clicking cancel
function closeUserNameForm() {
    document.getElementById("userNameInp").value = "";
    document.getElementById("userNameForm").style.display = "none";
    document.getElementById("gameSettings").style.display = "none";   
  };

//   Click next in user name form, set the user name variable
function openSettings() {
    var inputForm = document.getElementById("userNameInp");
    if (inputForm.value == "") {
        document.getElementById("noMessSpan").style.display = "block"; // show message when userName field is empty
    } else {
        userName = inputForm.value;
        document.getElementById("userNameForm").style.display = "none"; // close username form
        document.getElementById("gameSettings").style.display = "block";   // open game settings form
    }      

};

// remove message when user name was empty but user click on user name input field
$("#userNameInp").focus(function(){
    document.getElementById("noMessSpan").style.display = "none";
});

// game settings category buttons - select all
var inputCheck = document.getElementById("setCatCheckboxes").getElementsByTagName("input");
document.getElementById("selectAllCat").addEventListener("click", function(){
    for (i=0; i < inputCheck.length; i++) {
        inputCheck[i].checked = true;
    }
});
// game settings category buttons - unselect all
document.getElementById("unSelectAllCat").addEventListener("click", function(){
    for (i=0; i < inputCheck.length; i++) {
        inputCheck[i].checked = false;
    }
});

// click save settings button in game settings form, set categories and difficult level
document.getElementById("saveSettBtn").addEventListener("click", function(){
    difLevel = document.getElementById("difLevel").value;
    var tempSelCategor =[];             //declare local empty variable for categoriers
    for (i=0; i< inputCheck.length; i++){   //check if category is choosen and add to the local category variable
        if (inputCheck[i].checked === true){    
            tempSelCategor.push(inputCheck[i].value);
        };

        // if (tempSelCategor = 0) {
        //     prompt("Minimum one category needs to be choose.");
        // }
    };
    // show alert if none category is selected
    if (tempSelCategor.length === 0){
        alert("You need to choose at least one category.");
    }
    selCategor = tempSelCategor; // assing local category variable to the global one 
    document.getElementById("gameSettings").style.display = "none"; // hide game settings div
});

// moving letters source https://tobiasahlin.com/moving-letters/#4
document.getElementById("startBtn").addEventListener("click", function(){


var ml4 = {};
ml4.opacityIn = [0,1];
ml4.scaleIn = [0.2, 1];
ml4.scaleOut = 3;
ml4.durationIn = 800;
ml4.durationOut = 600;
ml4.delay = 500;

anime.timeline({})
  .add({
    targets: '.ml4 .letters-1',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add({
    targets: '.ml4 .letters-1',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
  }).add({
    targets: '.ml4 .letters-2',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add({
    targets: '.ml4 .letters-2',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
  }).add({
    targets: '.ml4 .letters-3',
    opacity: ml4.opacityIn,
    scale: ml4.scaleIn,
    duration: ml4.durationIn
  }).add({
    targets: '.ml4 .letters-3',
    opacity: 0,
    scale: ml4.scaleOut,
    duration: ml4.durationOut,
    easing: "easeInExpo",
    delay: ml4.delay
  }).add({
    targets: '.ml4',
    opacity: 0,
    duration: 500,
    delay: 500
  });
  
})