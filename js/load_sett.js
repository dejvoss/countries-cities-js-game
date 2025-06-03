// ------------------------ LOAD SETTINGS ON START GAME ROUND ---------------------------------------- //

// load game settings when the start round button is pressed
function loadSettings() {
  loadCatSett();
  // loadDiffLev(); // Removed as difLvlTime calculation is handled in gameLogic.showCounter based on gameState.difLevel
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// -------------------------------------------- LOAD LISTS FROM DIFFERENT API DEPENCE OF THE CATEGORIES ---------------------------------------
// function for loading different function for different category based on selected settings
function loadCatSett() {
  if (!window.gameState || !window.gameState.selCategor) {
    console.error("gameState or gameState.selCategor not available in loadCatSett.");
    alert("Something went wrong - game settings might not have been saved correctly. Please refresh.");
    return;
  }
  // Initialize lists in gameState to ensure they are empty before loading
  gameState.CountryList = [];
  gameState.CapitalCityList = [];
  gameState.AnimalList = [];
  gameState.PlantList = [];

  gameState.selCategor.forEach(function (element) {
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
      alert("Something went wrong - an unknown category was selected: " + element);
    }
  });
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
  let localCountryList = [];
  $.ajax(allCountriesSett)
    .done(function (APIData) {
      if (APIData && Array.isArray(APIData)) {
        APIData.forEach(function (APIItem) {
          if (APIItem && APIItem.name) {
            if (APIItem.name.official) localCountryList.push(APIItem.name.official);
            if (APIItem.name.common) localCountryList.push(APIItem.name.common);
            if (APIItem.name.nativeName && APIItem.name.nativeName.eng) {
              if (APIItem.name.nativeName.eng.official) localCountryList.push(APIItem.name.nativeName.eng.official);
              if (APIItem.name.nativeName.eng.common) localCountryList.push(APIItem.name.nativeName.eng.common);
            }
          }
        });
        gameState.CountryList = localCountryList;
      } else {
        console.error("Unexpected data structure for countries:", APIData);
        alert('Failed to parse country list. Data might be incomplete.');
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.error('Error loading Country list:', textStatus, errorThrown);
      alert('Failed to load country list. Please try refreshing the page.');
    });
}

// download list of capital cities and save as array
function loadCapitalCityList() {
  let localCapitalCityList = [];
  $.ajax(allCountriesSett)
    .done(function (APIData) {
      if (APIData && Array.isArray(APIData)) {
        APIData.forEach(function (APIItem) {
          if (APIItem && APIItem.capital && APIItem.capital[0]) {
            localCapitalCityList.push(APIItem.capital[0]);
          }
        });
        gameState.CapitalCityList = localCapitalCityList;
      } else {
        console.error("Unexpected data structure for capital cities:", APIData);
        alert('Failed to parse capital city list. Data might be incomplete.');
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.error('Error loading Capital City list:', textStatus, errorThrown);
      alert('Failed to load capital city list. Please try refreshing the page.');
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
function loadAnimalList() {
  let localUnfAnimList = [];
  let localAnimalList = []; // Use a local list for processing

  $.ajax(ajSett)
    .done(function (response) {
      if (response && response.parse && response.parse.links && Array.isArray(response.parse.links)) {
        var WikiAnimLinks = response.parse.links;
        WikiAnimLinks.forEach(function (element) {
          if (element && element["*"]) {
            localUnfAnimList.push(element["*"]);
          }
        });
      } else {
        console.error("Unexpected response structure from MediaWiki API:", response);
        alert('Failed to parse animal list from Wikipedia. Data might be incomplete.');
        return;
      }

      // Process the unfAnimList
      // The slicing range (3, 338) should be verified for its purpose.
      localUnfAnimList = localUnfAnimList.slice(3, 338);
      localUnfAnimList.forEach(function (item) {
        var chckr = item.includes("List");
        var chckr2 = item.includes("identifier");
        if (chckr === false && chckr2 === false) {
          localAnimalList.push(item);
        }
      });

      formatAnimalList(localAnimalList);
      gameState.AnimalList = localAnimalList;
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.error('Error loading Animal list from Wikipedia:', textStatus, errorThrown);
      alert('Failed to load animal list from Wikipedia. Please try refreshing the page.');
    });
}

// remove none animal names from list and add extra names which was not in the list on the beginning
function formatAnimalList(listToFormat) { // Renamed from formatList
  var listOfNoneAnimal = ["African buffalo", "Bacon", "Beef", "Capon", "Carabeef", "Common chimpanzee", "Common merganser", "Collateral adjective", "Collective noun", "Colt (horse)", "Common merganser", "Domestic pig", "Domesticated turkey", "Escargot", "Black panther", "Blackback", "Blubber", "European goldfinch", "Female", "Flake (fish)", "Flocking (behaviour)", "Foal", "Goat meat", "Ham", "Herd", "Herpetoculture", "Jenny (donkey)", "Juliana Berners", "Kettle (birds)", "Kitten", "Lamb and mutton", "Male", "Mare", "Meat", "Planula", "Polyp (zoology)", "Pork", "Poultry", "Pristella maxillaris", "Puppy", "Rock salmon", "Scyphozoa", "Silverback", "Squab (food)", "Stallion (horse)", "Swarm", "Tim Caro", "Veal", "Venison", "Vixen", "Wayback Machine", "Wildebeest", "William Blades", "Spiny dogfish"];

  let tempFilteredList = listToFormat.filter(item => !listOfNoneAnimal.includes(item));

  var listOfExtraAnimal = ["Buffalo", "Bizon", "Chimpanzee", "Dogfish", "Eland", "Gnu", "Goldfinch", "Goosander", "Pig", "Seal", "Turkey", "Vinegaroon", "Zebra"];
  listOfExtraAnimal.forEach(function (element) {
    if (!tempFilteredList.includes(element)) {
        tempFilteredList.push(element);
    }
  });

  tempFilteredList.sort();

  listToFormat.length = 0;
  tempFilteredList.forEach(item => listToFormat.push(item));
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ---------------------------------------------------------- READ PLANT LIST FROM CSV FILE ---------------------------------------------------------- //
// load plant list from CSV file by jquery.csv
var plantAjSet = {
  url: "./gameFiles/PlantList.csv",
  // async: false, // Consider changing to true if possible, but leaving as is for now.
  dataType: "text",
};

function loadPlantList() {
  let localPlantList = [];
  $.ajax(plantAjSet)
    .done(function (response) {
      if (response) {
        var mydat = $.csv.toObjects(response);
        if (mydat && Array.isArray(mydat)) {
          for (var x = 0; x < mydat.length; x++) {
            if (mydat[x] && mydat[x].name) {
              localPlantList.push(mydat[x].name);
            }
          }
          gameState.PlantList = localPlantList;
        } else {
          console.error("Unexpected data structure from PlantList CSV:", mydat);
          alert('Failed to parse plant list. Data might be incomplete.');
        }
      } else {
        console.error("Empty response from PlantList CSV");
        alert('Failed to load plant list, empty data received.');
      }
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      console.error('Error loading Plant list from CSV:', textStatus, errorThrown);
      alert('Failed to load plant list. Please try refreshing the page.');
    });
}

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ------------------------------------------------- START ROUND BUTTON - TRIGGER ABOVE FUNCTIONS WHEN BUTTON IS CLICKED --------------------------------------------
// Add event listener to the start round button to trigger round initialization and letter animation.
$("#startBtn").on("click", roundStart);

// Function called when the start round button is pressed.
function roundStart() {
  loadSettings();
  if (window.gameLogic && typeof window.gameLogic.showStartLetters === 'function') {
    window.gameLogic.showStartLetters();
  } else {
    console.error("gameLogic.showStartLetters is not available at roundStart.");
    alert("Critical error: Game cannot start. Please refresh.");
  }
}