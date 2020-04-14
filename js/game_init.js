//game initialization, user name form, game settings, declaring 3 important variable for game - user name, difficult level and choosen categories

var userName; //declare global variable user name    
var difLevel;   // global variable for difficult level
var selCategor =[]; // global variable for selected categories
var alphabetOnStart = ["A", "B", "C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
var currentGameAlphabet =[]; // global variable for current game alphabet - after each round the chosen letter is removed from that alphabet to don't repeat it in next rounds
var roundLetter; // global variable for chosen letter for current game round

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
        document.getElementById("gameSection").style.display = "block";
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
// create sleep function for showStartLetters function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// add event listener to the start button which will triger showStartLetters function
document.getElementById("startBtn").addEventListener("click", showStartLetters);

//letter choosing and loading alphabet spin
var letterChoosingDiv = '<div id="letterChoos"><span class="xyzLetters transform" id="letters"></span></div>'
var loadingAlphabetSpin = '<div class="spinner-grow " style="width: 3rem; height: 3rem;" role="status"><span class="sr-only hidden" id="alphabetSayStatus">Saying alphabet...</span></div>'

// function showStartLetters - when user press start button start round pop up window is show and display letters x y z, after this stop btn is visible
async function showStartLetters() {
    $('#roundPopUp').css('display', 'block')
  $('#startBtn').css("display", "none");
  $('#startInit').html(letterChoosingDiv);
var letters = ["X", "Y", "Z"]
for (i=0; i < letters.length; i++) {
  $('#letters').text(letters[i]);
  $('.transform').addClass('transform-active');
  await sleep(1000);
  $('.transform').removeClass('transform-active');
  await sleep(1000);
};
$('#startInit').html(loadingAlphabetSpin);
await sleep(500);
$('#stopButtonDiv').removeClass('hide');
$('#stopButtonDiv').addClass('showMyClass');
currentGameAlphabet = alphabetOnStart;
};


// when stop button is pressed 
document.getElementById("stopBtn").addEventListener("click", stopButtonPress);

function stopButtonPress(){
    chooseLetter();
    gameRoundInitialize(selCategor, roundLetter);
}
// find random number as use as a index for alphabet variable to set the round letter
function chooseLetter(){
    var ltrIndicator = Math.floor(Math.random() * currentGameAlphabet.length);
    roundLetter = currentGameAlphabet[ltrIndicator];
    currentGameAlphabet.splice(ltrIndicator, 1);
    var htmlLetter = "<span class='showLetter'>" + roundLetter + "</span>";
    $('#startInit').html(htmlLetter);
}
// add user input for each category with selected letter
function gameRoundInitialize(selCategor, roundLetter){
    for (var i = 0; i < selCategor.length; i++){
        var htmlFormContent = "<div class='form-group'><label for='" + selCategor[i] + "'>" + selCategor[i] + "</label><input type='text' class='form-control' id='" + selCategor[i] + "' placeholder='" + roundLetter + "'></div>"
        $('#roundInput').append(htmlFormContent);
    };
}

// functionality for menu buttons