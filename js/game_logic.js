// ----------------------------------------------- GAME LOGIC - GAME BOARD, GET USER ANSWER, GENERATE PC ANSWERS, ASSING POINTS -----------------------------------


var FinishRndBtnClick = 0; // variable to stop counting round time if user press finish round button
var usrAnswArr = []; // global array for user Answers
var PCAnswArr = []; // array for PC answers
var totalPoints = 0; // variable for total game points
var rndPoints = 0; // variable for round points
var usrPointsArr = []; // array for points, needed to show points for user

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------------- STOP BUTTON PRESSED - ROUND START --------------------------------------------
// Generate computer answers, check user answers, show points and results, finish round,
// when stop button is pressed 
document.getElementById("stopBtn").addEventListener("click", stopButtonPress);

function stopButtonPress() {
  $('#stopButtonDiv').removeClass('showMyClass');
  $('#stopButtonDiv').addClass('hide');
  $('#finishRdBtn').removeClass('hide');
  chooseLetter(); // chose round letter
  gameRoundInitialize(selCategor, roundLetter); // initialize input form for answers
  showCounter(); // show counter to finish round
}

// ------------------------- CHOOSE LETTER FROM ALPHABET ------------------------------------
// find random letter from alphabet and set as the round letter, also show in the round popup
function chooseLetter() {
  if (currentGameAlphabet.length < 1) { // avoid situation when all letters from alphabet will be used, when it happen use full alphabet again
    currentGameAlphabet = alphabetOnStart;
  };
  var ltrIndicator = Math.floor(Math.random() * currentGameAlphabet.length);
  roundLetter = currentGameAlphabet[ltrIndicator];
  currentGameAlphabet.splice(ltrIndicator, 1); // remove chosen letter from current game alphabet to avoid repeating letters
  var htmlLetter = "<span class='showLetter'>" + roundLetter + "</span>";
  $('#startInit').html(htmlLetter);
}


// -------------------------------------- USER GAME INPUT FORM ------------------------------------------------------
// add user input for each category with selected letter
function gameRoundInitialize(selCategor, roundLetter) {
  $('#roundInput').html("");
  for (var i = 0; i < selCategor.length; i++) {
    var htmlFormContent = "<div class='form-group'><label for='" + selCategor[i] + "'>" + selCategor[i] + "</label><input type='text' class='form-control my-input' id='usrAnsw" + selCategor[i] + "' placeholder='" + roundLetter + "'></div>";
    $('#roundInput').append(htmlFormContent);
  };
}


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// -------------------------------------------------- FINISH GAME ROUND --------------------------------------------------------------//

// ------------------------------Initialize Finish round function automatically after x seconds; x value different depend of the difficulty level //

// create function for round time counter which will start counting from 15 to 0 after time set by difficult level
async function showCounter() {
  await sleep(difLvlTime);
  $("#endCountDiv").css('display', 'block');
  for (var x = 15; x >= 0; x--) {
    $("#endCount").html(x);
    await sleep(1000);
    if (FinishRndBtnClick == 1) { // finish counting if user finished round alone by pressing finish btn
      x = 0;
      break
    }
    if (x == 0) {
      finishRound();
    }
  };
};

//--------Initialize Finish round function when user press finish round button - finish before end time //
// action for finish round button in game round section
document.getElementById("finishRdBtn").addEventListener("click", finishRound);


// ------------------------------------------------- FINISH ROUND FUNCTION ---------------------------------------
function finishRound() {
  FinishRndBtnClick = 1; // aassing value to stop counter
  getPCAnswers();
  getUserAnswers();
  clearTimeout(sleep);
  // showPointsRes();
  $("#roundPopUp").css("display", "none");
  $("#roundFinishPopUp").css("display", "block");
  printAnswers();
}

// get user answers, capitalize first letter and save in array usrAnswArr

// ---------------------------------------------- GET USER ANSWERS AND SAVE AS ARRAY ---------------------------------------------------
//  IN THE END OF FUNCTION GO TO CHECK ANSWER FUNCTION 

function getUserAnswers() {
  $("#roundInput").ready(function () {
    for (i = 0; i < selCategor.length; i++) {

      var answerIdBase = "usrAnsw";
      var answerIdFull = answerIdBase + selCategor[i];
      var usrAnswer = $('#' + answerIdFull).val(); //get user answer for each category
      if (usrAnswer !== "") {
        usrAnswer = usrAnswer.charAt(0).toUpperCase() + usrAnswer.slice(1);
        usrAnswArr.push(usrAnswer);
      }
      else {
        usrAnswArr.push(usrAnswer);
      }
    }
    checkAnsw();
  });

};

// --------------------------------------------- GENERATE PC ANSWERS AND SAVE AS ARRAY ----------------------------------------

// function for generate PC answer based on round letter, if difficulties level is easy add empty answer to answer array - to give possibility that PC has no answer and user can gain 15 points

// -------------- GENERAL GET ANSWER FUNCTION ------------------------
function generatePCAnswers(wordList, rndLetter) {
  var tmpWordList = [];
  if (difLevel == 1 || difLevel == 2) {
    tmpWordList.push("");
  }
  wordList.forEach(function (item) {
    var wrdLetter = item.charAt(0);
    if (wrdLetter === rndLetter) {
      tmpWordList.push(item);
    };
  });
  var rndCntr = Math.floor(Math.random() * tmpWordList.length);
  return PCanswer = tmpWordList[rndCntr];
};


// ------------------------------ GET ANSWER FOR EACH CATEGORY DEPENCE OF SELECTION IN THE SETTINGS ------------------------------------
// -- run general get answer function with different variables
function getPCAnswers() {
  if (selCategor.includes("Country")) {
    let PCCountry = generatePCAnswers(CountryList, roundLetter);
    PCAnswArr.push(PCCountry);
  };
  if (selCategor.includes("CapitalCity")) {
    let PCCity = generatePCAnswers(CapitalCityList, roundLetter);
    PCAnswArr.push(PCCity);
  };
  if (selCategor.includes("Animal")) {
    let PCAnimal = generatePCAnswers(AnimalList, roundLetter);
    PCAnswArr.push(PCAnimal);
  }
  if (selCategor.includes("Plant")) {
    let PCPlant = generatePCAnswers(PlantList, roundLetter);
    PCAnswArr.push(PCPlant);
  }
};

// ---------------------------------- COMPARE ANSWERS AND ASSIGN POINTS ---------------------------------------------------- //
// check each answer and assign points to array


function checkAnsw() {
  for (i = 0; i < selCategor.length; i++) {
    let uswrd = usrAnswArr[i];
    let pcwrd = PCAnswArr[i];
    let cat = selCategor[i];

    if (uswrd === "undefined") { // check if usr answer exist, if not assing 0 points
      usrPointsArr.push(0);
    }
    else if (uswrd.length > 1 && uswrd.charAt(0) === roundLetter) { // if usr answer exist, check if is start from correct letter
      if (uswrd === pcwrd) { // if user word is same as PC word assing 5 points
        usrPointsArr.push(5);
      }
      else if (uswrd !== pcwrd && pcwrd !== "") { // if user answer is different than pc answer, check if is correct for each category and assing 10 points if is
        if (cat === "Country" && CountryList.includes(uswrd)) {
          usrPointsArr.push(10);
        }
        else if (cat === "CapitalCity" && CapitalCityList.includes(uswrd)) {
          usrPointsArr.push(10);
        }
        else if (cat === "Animal" && AnimalList.includes(uswrd)) {
          usrPointsArr.push(10);
        }
        else if (cat === "Plant" && PlantList.includes(uswrd)) {
          usrPointsArr.push(10);
        }
        else {
          usrPointsArr.push(0);
        } // if user word is not correct - word doesn't exist assing 0 points
      }
      else if (uswrd !== pcwrd && pcwrd === "") { // if user word is different than pcword and pc has no answer check if usr word is correct for each category
        if (cat === "Country" && CountryList.includes(uswrd)) { // and assing 15 points if is correct
          usrPointsArr.push(15);
        }
        else if (cat === "CapitalCity" && CapitalCityList.includes(uswrd)) {
          usrPointsArr.push(15);
        }
        else if (cat === "Animal" && AnimalList.includes(uswrd)) {
          usrPointsArr.push(15);
        }
        else if (cat === "Plant" && PlantList.includes(uswrd)) {
          usrPointsArr.push(15);
        }
        else {
          usrPointsArr.push(0);
        } // if user word is not correct - word doesn't exist assing 0 points
      }
    }
    else {
      usrPointsArr.push(0)
    } // if user answer start from wrong letter assing 0 points
    rndPoints += usrPointsArr[i]; // add point from array to rndPoint variable

  }

  totalPoints += rndPoints; // add round points to total points variable  
  showPointsRes(); // run function which show points and answers
  printAnswers();
};


//  ----------------------------------------- SHOW ANSWERS AND POINTS RESULT --------------------------------------------------- //

function printAnswers() {
  let pernamentHtml1 = '<thead><tr><th scope="col">Category</th><th scope="col">PC Answer</th><th scope="col">' + userName + ' Answers</th><th scope="col">Points</th></tr></thead><tbody>';
  var pernamentHtml2;
  for (x = 0; x < selCategor.length; x++) {
    let tempHtml1 = '<tr><th scope="row">' + selCategor[x] + '</th><td>' + PCAnswArr[x] + '</td><td>' + usrAnswArr[x] + '</td><td>' + usrPointsArr[x] + '</td></tr>'
    pernamentHtml2 = pernamentHtml2 + tempHtml1;
  };
  let fullHtml = pernamentHtml1 + pernamentHtml2;
  $("#gameResultTbl").html(fullHtml);
}

// ---------------------------------------------------- SHOW ROUND POINT AND TOTAL POINT QTY --------------------------------------------------------- //

function showPointsRes() {
  $("#rndPointParagraph").html("You achieve " + rndPoints + " points in this round!");
  $("#totalPointParagraph").html("Your total results is " + totalPoints + " points!");
};


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ---------------------------------------- INITIALIZE NEXT ROUND BY PRESSING NEXT ROUND BUTTON ---------------------------------------------------------- //

document.getElementById("nxtRnd").addEventListener("click", nextRound);

// clear variables when new round is start, initiate new round
function nextRound() {
  usrPointsArr = [];
  FinishRndBtnClick = 0; // variable to stop counting round time if user press finish round button
  usrAnswArr = []; // global array for user game Results
  PCAnswArr = [];
  rndPoints = 0;
  $("#endCountDiv").css('display', 'none');
  $("#endCount").html("");
  $('#roundInput').html("");
  $('#finishRdBtn').addClass('hide');
  $("#roundFinishPopUp").css("display", "none");
  $("#roundPopUp").css("display", "block");
  showStartLetters();

}