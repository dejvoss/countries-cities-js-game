// ------------------------ LOAD SETTINGS ON START GAME ROUND ---------------------------------------- //

// --------------------- VARIABLES ----------------------------------------------
var difLvlTime; // time in milisecond counted depence of chosen difficulties level and categories
var CountryList = []; // lsit with countries 
var CapitalCityList = []; // list with Capital cities
var AnimalList = []; // list with animals
var PlantList = []; // list with plants
var RoundCounter = 0; // variable for count number of rounds
const ltrAnimTimeDelay = 800; // time in milisecond for x y z letters animation
const AlphSpinDelay = 500; //time in milisecond for alphabet letter animation

// load game settings when the start round button is pressed
// 
function loadSettings() {
  loadCatSett();
  loadDiffLev();
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// -------------------------------------------- LOAD LISTS FROM DIFFERENT API DEPENCE OF THE CATEGORIES ---------------------------------------
// function for loading different function for different category based on selected settings
function loadCatSett() {
  selCategor.forEach(function (element) {
    if (element === "Country") {
      loadCountryList();
    }
    else if (element === "CapitalCity") {
      loadCapitalCityList();
    }
    else if (element === "Animal") {
      loadAnimalList();
    }
    else if (element === "Plant") {
      loadPlantList();
    }
    else {
      alert("Something went wrong - it looks like you didn't save game settings");

    }
  });
}


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------------------------- SET DIFFICULT LEVEL ------------------------------------------------

// function for loading different settings for different difficulties level selected in settings
function loadDiffLev() {
  let myCtr = selCategor.length;
  if (difLevel == 1) {
    difLvlTime = myCtr * 30000;
  }
  else if (difLevel == 2) {
    difLvlTime = myCtr * 20000;
  }
  else if (difLevel == 3) {
    difLvlTime = myCtr * 15000;
  }
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------------------------------------------- API -----------------------------------------------------

// ---------------------------------------------------------- RESTCOUNTRIES API FOR CAPITAL CITIES AND COUNTRIES---------------------------------------------------------- //
// restcountries API settings used below for download list of countries and list of capital cities
var allCountriesSett = {
  "async": true,
  "crossDomain": true,
  "url": "https://restcountries.com/v3.1/all?fields=name,capital",
  "method": "GET",
};

// download list of countries and save as array
function loadCountryList() {
  $.ajax(allCountriesSett).done(function (APIData) {
    APIData.forEach(function (APIItem) {
      CountryList.push(APIItem.name.official);
      CountryList.push(APIItem.name.common);
      if (APIItem.name.nativeName.eng) {
        CountryList.push(APIItem.name.nativeName.eng.official);
        CountryList.push(APIItem.name.nativeName.eng.common);
      }

    });
  });

}
// download list of capital cities and save as array
function loadCapitalCityList() {
  $.ajax(allCountriesSett).done(function (APIData) {
    APIData.forEach(function (APIItem) {
      CapitalCityList.push(APIItem.capital[0]);

    });
  });

}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ---------------------------------------------------------- MEDIAWIKI API OR ANIMAL LIST ---------------------------------------------------------- //

// MediaWiki API settings used below for download list of animals from wikipedia website (https://en.wikipedia.org/wiki/List_of_animal_names)
/**
 * parse.js
 *
 * MediaWiki API Demos
 * Demo of `Parse` module: Parse content of a page
 *
 * MIT License
 */
// API SETTINGS

var url = "https://en.wikipedia.org/w/api.php";

var params = {
  action: "parse",
  page: "List_of_animal_names",
  section: 2,
  prop: "categories|links",
  format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function (key) {
  url += "&" + key + "=" + params[key];
});


var ajSett = {
  url: url,
};


// get list of links from wikipedia Animal list page and format list as there are more links and some of these are not animal names
var unfAnimList = [];

function loadAnimalList() {
  $.ajax(ajSett).done(function (response) {
    var WikiAnimLinks = response.parse.links;
    WikiAnimLinks.forEach(function (element) {
      unfAnimList.push(element["*"]);
    });
  }).done(function () {
    unfAnimList = unfAnimList.slice(3, 338);
    unfAnimList.forEach(function (item, index) {
      var chckr = item.includes("List");
      var chckr2 = item.includes("identifier");
      if (chckr === false && chckr2 === false) {
        AnimalList.push(item);
      }
    });
  }).done(formatList);

}
// remove none animal names from list and add extra names which was not in the list on the beginning
function formatList() {
  var listOfNoneAnimal = ["African buffalo", "Bacon", "Beef", "Capon", "Carabeef", "Common chimpanzee", "Common merganser", "Collateral adjective", "Collective noun", "Colt (horse)", "Common merganser", "Domestic pig", "Domesticated turkey", "Escargot", "Black panther", "Blackback", "Blubber", "European goldfinch", "Female", "Flake (fish)", "Flocking (behaviour)", "Foal", "Goat meat", "Ham", "Herd", "Herpetoculture", "Jenny (donkey)", "Juliana Berners", "Kettle (birds)", "Kitten", "Lamb and mutton", "Male", "Mare", "Meat", "Planula", "Polyp (zoology)", "Pork", "Poultry", "Pristella maxillaris", "Puppy", "Rock salmon", "Scyphozoa", "Silverback", "Squab (food)", "Stallion (horse)", "Swarm", "Tim Caro", "Veal", "Venison", "Vixen", "Wayback Machine", "Wildebeest", "William Blades", "Spiny dogfish"];
  listOfNoneAnimal.forEach(function (element) {
    var indxInFrmtList = AnimalList.indexOf(element);
    AnimalList.splice(indxInFrmtList, 1);
  });
  var listOfExtraAnimal = ["Buffalo", "Bizon", "Chimpanzee", "Dogfish", "Eland", "Gnu", "Goldfinch", "Goosander", "Pig", "Seal", "Turkey", "Vinegaroon", "Zebra"];
  listOfExtraAnimal.forEach(function (element) {
    AnimalList.push(element);
  });
  AnimalList.sort();


}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ---------------------------------------------------------- READ PLANT LIST FROM CSV FILE ---------------------------------------------------------- //
// load plant list from CSV file by jquery.csv
var plantAjSet = {
  url: "./gameFiles/PlantList.csv",
  async: false,
  dataType: "text",

};

function loadPlantList() {
  $.ajax(plantAjSet).done(function (response) {
    var mydat = $.csv.toObjects(response);
    for (x = 0; x < mydat.length; x++) {
      PlantList.push(mydat[x].name);
    }
  });
}




// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ---------------------------------------------------- SLEEP FUNCTION ----------------------------------------------
// create sleep function for showStartLetters function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------------------------------- START ROUND BUTTON - TRIGGER ABOVE FUNCTIONS WHEN BUTTON IS CLICKED --------------------------------------------
// add event listener to the start round button which will triger showStartLetters function
document.getElementById("startBtn").addEventListener("click", roundStart);

// function on start round button press
function roundStart() {
  loadSettings();
  showStartLetters();
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ----------------------------------------- LETTER ANIMATION ON BEGINNING ROUND ----------------------------------------- //
// function showStartLetters - when user press start button start round pop up window is show and display letters x y z, after this stop btn is visible
async function showStartLetters() {
  let letterChoosingDiv = '<div id="letterChoos"><span class="xyzLetters transform" id="letters"></span></div>';
  let loadingAlphabetSpin = '<div class="spinner-grow " style="width: 3rem; height: 3rem;" role="status"><span class="sr-only hidden" id="alphabetSayStatus">Saying alphabet...</span></div>';

  RoundCounter++; // add round number
  $("#roundTitle").html("Round " + RoundCounter);

  $('#startBtn').css("display", "none");
  $('#startInit').html(letterChoosingDiv);
  var letters = ["X", "Y", "Z"];
  for (i = 0; i < letters.length; i++) {
    $('#letters').text(letters[i]);
    $('.transform').addClass('transform-active');
    await sleep(ltrAnimTimeDelay);
    $('.transform').removeClass('transform-active');
    await sleep(ltrAnimTimeDelay);
  }
  $('#startInit').html(loadingAlphabetSpin);
  await sleep(AlphSpinDelay);
  $('#stopButtonDiv').removeClass('hide');
  $('#stopButtonDiv').addClass('showMyClass');
  currentGameAlphabet = alphabetOnStart;
}