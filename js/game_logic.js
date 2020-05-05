var FinishRndBtnClick = 0; // variable to stop counting round time if user press finish round button
var usrAnswArr = []; // global array for user game Results
var PCAnswArr = [];
var usrPointsArr = [];
var PCPointsArr = [];
var totalPoints = 0;
var rndPoints = 0;



// Generate computer answers, check user answers, show points and results, finish round,
// when stop button is pressed 
document.getElementById("stopBtn").addEventListener("click", stopButtonPress);

function stopButtonPress() {
  $('#stopButtonDiv').removeClass('showMyClass');
  $('#stopButtonDiv').addClass('hide');
  $('#finishRdBtn').removeClass('hide');
  chooseLetter();
  gameRoundInitialize(selCategor, roundLetter);
  showCounter();
}
// find random letter from alphabet and set as the round letter, also show in the round popup
function chooseLetter() {
  var ltrIndicator = Math.floor(Math.random() * currentGameAlphabet.length);
  roundLetter = currentGameAlphabet[ltrIndicator];
  currentGameAlphabet.splice(ltrIndicator, 1);
  var htmlLetter = "<span class='showLetter'>" + roundLetter + "</span>";
  $('#startInit').html(htmlLetter);
}
// add user input for each category with selected letter
function gameRoundInitialize(selCategor, roundLetter) {
  $('#roundInput').html("");
  for (var i = 0; i < selCategor.length; i++) {
    var htmlFormContent = "<div class='form-group'><label for='" + selCategor[i] + "'>" + selCategor[i] + "</label><input type='text' class='form-control' id='usrAnsw" + selCategor[i] + "' placeholder='" + roundLetter + "'></div>";
    $('#roundInput').append(htmlFormContent);
  };
}

// -------------------------------------------------- Finish Round functions --------------------------------------------------------------//

// ------------------------------Finish round automatically after x seconds; x value different depend of the difficulty level //

// create function for round time counter which will start counting from 15 to 0 after time set by difficult level
async function showCounter() {
  console.log(difLvlTime);
  await sleep(difLvlTime);
  $("#endCountDiv").css('display', 'block');
  for (var x = 15; x >= 0; x--) {
    $("#endCount").html(x);
    await sleep(1000);
    if (FinishRndBtnClick == 1) {
      break
    }
    if (x == 0) {
      finishRound();
    }
  };
};

//--------Finish round when user press finish round button - finish before end time //
// action for finish round button in game round section
document.getElementById("finishRdBtn").addEventListener("click", finishRound);


function finishRound() {
  FinishRndBtnClick = 1;
  getUserAnswers();
  console.log(usrAnswArr);
  getPCAnswers();
  checkAnswers();
  $("#roundPopUp").css("display", "none");
  $("#roundFinishPopUp").css("display", "block");
}

// get user answers, capitalize letters and save in array usrAnswArr

function getUserAnswers() {
  $("#roundInput").ready(function () {
    for (i = 0; i < selCategor.length; i++) {
      var answerIdBase = "usrAnsw";
      var answerIdFull = answerIdBase + selCategor[i];
      var usrAnswer = $('#' + answerIdFull).val(); //get user answer for each category
      if (usrAnswer !== ""){
        usrAnswer = usrAnswer.charAt(0).toUpperCase() + usrAnswer.slice(1);
        usrAnswArr.push(usrAnswer);
      } else {
      usrAnswArr.push(usrAnswer);}
    }
  });
  
};

// function for generate PC answer based on round letter
function generatePCAnswers(wordList, rndLetter) {
  var tmpWordList = [];
  wordList.forEach(function (item) {
    var wrdLetter = item.charAt(0);
    if (wrdLetter === rndLetter) {
      tmpWordList.push(item);
    };
  });
  var rndCntr = Math.floor(Math.random() * tmpWordList.length);
  return PCanswer = tmpWordList[rndCntr];
};

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
