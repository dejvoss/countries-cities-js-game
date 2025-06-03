var gameState = {
    userName: null,
    difLevel: null,
    selCategor: [],
    alphabetOnStart: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
    currentGameAlphabet: [],
    roundLetter: null,
    totalPoints: 0,
    rndPoints: 0,
    usrAnswArr: [],
    PCAnswArr: [],
    usrPointsArr: [],
    FinishRndBtnClick: 0,
    CountryList: [],
    CapitalCityList: [],
    AnimalList: [],
    PlantList: [],
    roundTimerId: null,
    RoundCounter: 0
};

// --------------------------------- GAME INITIALIZE ------------------------------------------------------------
// Handles game initialization, user name form, and game settings.
// Core game state variables (userName, difLevel, selCategor) are managed within the gameState object.

var gameSetup = {
    /**
     * @description Displays the user name input form.
     */
    openUserNameForm: function() {
        $("#userNameForm").addClass("visible");
    },

    /**
     * @description Closes the user name input form and resets related UI elements.
     */
    closeUserNameForm: function() {
        $("#userNameInp").val(""); // Use jQuery val()
        $("#userNameForm").removeClass("visible");
        $("#gameSettings").removeClass("visible");
        $("#gameSection").removeClass("visible"); // Assuming gameSection is controlled this way
    },

    /**
     * @description Validates user name and proceeds to game settings, or shows an error.
     */
    openSettings: function() {
        var userNameValue = $("#userNameInp").val(); // Use jQuery val()
        if (userNameValue == "") {
            $("#noMessSpan").show();
        } else {
            gameState.userName = userNameValue;
            $("#userNameForm").removeClass("visible");
            $("#gameSettings").addClass("visible");
        }
    },

    /**
     * @description Saves the selected game settings (difficulty level, categories) and initializes the game.
     */
    saveSettings: function() {
        // Get selected difficulty level
        gameState.difLevel = $("#difLevel").val(); // Use jQuery val()

        // Get selected categories
        var tempSelCategor = [];
        var $inputCheck = $("#setCatCheckboxes input"); // Use jQuery selector
        // Iterate through checkboxes to find selected categories
        $inputCheck.each(function() {
            if (this.checked) { // 'this' refers to the current input element in the loop
                tempSelCategor.push(this.value);
            }
        });

        // Validate that at least one category is selected
        if (tempSelCategor.length === 0) {
            alert("You need to choose at least one category.");
            return; // Stop execution if no category is selected
        }
        gameState.selCategor = tempSelCategor;

        // Initialize game alphabet for the new game
        gameState.currentGameAlphabet = [...gameState.alphabetOnStart];

        // Hide settings and show the round pop-up
        $("#gameSettings").removeClass("visible");
        $("#roundPopUp").addClass("visible");

        // If gameLogic is available, call showStartLetters (relevant for starting the game flow)
        if (window.gameLogic && typeof window.gameLogic.showStartLetters === 'function') {
            window.gameLogic.showStartLetters();
        }
    }
};

window.gameSetup = gameSetup;

// Remove message when user name was empty but user clicks on user name input field
$("#userNameInp").focus(function () {
  $("#noMessSpan").hide(); // Use jQuery hide()
});

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// ----------------------------------------------------- GAME SETTINGS -------------------------------------------------//

// Game settings category buttons - select all
$("#selectAllCat").on("click", function () {
  $("#setCatCheckboxes input").prop("checked", true);
});

// Game settings category buttons - unselect all
$("#unSelectAllCat").on("click", function () {
  $("#setCatCheckboxes input").prop("checked", false);
});

// Click save settings button in game settings form, set categories and difficult level
$("#saveSettBtn").on("click", gameSetup.saveSettings);