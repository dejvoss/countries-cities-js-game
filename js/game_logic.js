function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

// ----------------------------------------------- GAME LOGIC - GAME BOARD, GET USER ANSWER, GENERATE PC ANSWERS, ASSING POINTS -----------------------------------

var gameLogic = {
    /**
     * @description Animation constants for showStartLetters
     */
    ltrAnimTimeDelay: 800, // time in milisecond for x y z letters animation
    AlphSpinDelay: 500, //time in milisecond for alphabet letter animation

    /**
     * @description Displays letter animation and prepares UI for round start.
     */
    showStartLetters: async function() {
        let letterChoosingDiv = '<div id="letterChoos"><span class="xyzLetters transform" id="letters"></span></div>';
        let loadingAlphabetSpin = '<div class="spinner-grow " style="width: 3rem; height: 3rem;" role="status"><span class="sr-only hidden" id="alphabetSayStatus">Saying alphabet...</span></div>';

        gameState.RoundCounter++; // add round number
        $("#roundTitle").html("Round " + gameState.RoundCounter);

        $('#startBtn').css("display", "none");
        $('#startInit').html(letterChoosingDiv);
        var letters = ["X", "Y", "Z"];
        for (var i = 0; i < letters.length; i++) { // Changed from for...i to regular for loop for broader compatibility
          $('#letters').text(letters[i]);
          $('.transform').addClass('transform-active');
          await sleep(this.ltrAnimTimeDelay); // Use this.ltrAnimTimeDelay
          $('.transform').removeClass('transform-active');
          await sleep(this.ltrAnimTimeDelay); // Use this.ltrAnimTimeDelay
        }
        $('#startInit').html(loadingAlphabetSpin);
        await sleep(this.AlphSpinDelay); // Use this.AlphSpinDelay
        this._toggleDisplay('#stopButtonDiv', true); // Use helper
        gameState.currentGameAlphabet = [...gameState.alphabetOnStart]; // Ensure using gameState
    },

    /**
     * @description Helper function to toggle visibility of pop-ups using the 'visible' class.
     * @param {string} popupId - The ID of the pop-up element.
     * @param {boolean} show - True to show, false to hide.
     */
    _togglePopUp: function(popupId, show) {
        $(popupId).toggleClass("visible", show);
    },

    /**
     * @description Helper function to toggle display of elements using 'showMyClass' and 'hide' classes.
     * @param {string} elementId - The ID of the element.
     * @param {boolean} show - True to show (adds 'showMyClass', removes 'hide'), false to hide.
     */
    _toggleDisplay: function(elementId, show) {
        $(elementId).toggleClass("showMyClass", show).toggleClass("hide", !show);
    },

    /**
     * @description Handles the logic when the "Stop" button is pressed to start a round.
     */
    stopButtonPress: function() {
        this._toggleDisplay('#stopButtonDiv', false);
        this._toggleDisplay('#finishRdBtn', true);
        this.chooseLetter(); // chose round letter
        this.gameRoundInitialize(gameState.selCategor, gameState.roundLetter); // initialize input form for answers
        this.showCounter(); // show counter to finish round
    },

    /**
     * @description Chooses a random letter for the round and updates the UI.
     */
    chooseLetter: function() {
        if (gameState.currentGameAlphabet.length < 1) { // avoid situation when all letters from alphabet will be used, when it happen use full alphabet again
            gameState.currentGameAlphabet = [...gameState.alphabetOnStart];
        }
        var ltrIndicator = Math.floor(Math.random() * gameState.currentGameAlphabet.length);
        gameState.roundLetter = gameState.currentGameAlphabet[ltrIndicator];
        gameState.currentGameAlphabet.splice(ltrIndicator, 1); // remove chosen letter from current game alphabet to avoid repeating letters
        var htmlLetter = "<span class='showLetter'>" + gameState.roundLetter + "</span>";
        $('#startInit').html(htmlLetter);
    },

    /**
     * @description Initializes the game round input fields based on selected categories.
     * @param {string[]} selCategor - Array of selected categories.
     * @param {string} roundLetter - The letter for the current round.
     */
    gameRoundInitialize: function(selCategor, roundLetter) {
        $('#roundInput').html("");
        for (var i = 0; i < selCategor.length; i++) {
            var htmlFormContent = "<div class='form-group'><label for='" + selCategor[i] + "'>" + selCategor[i] + "</label><input type='text' class='form-control my-input' id='usrAnsw" + selCategor[i] + "' placeholder='" + roundLetter + "'></div>";
            $('#roundInput').append(htmlFormContent);
        }
    },

    /**
     * @description Displays a countdown timer for the round.
     */
    showCounter: async function() {
        var localDifLvlTime;
        if (gameState.difLevel == 1) localDifLvlTime = 30000;
        else if (gameState.difLevel == 2) localDifLvlTime = 20000;
        else localDifLvlTime = 15000;

        await sleep(localDifLvlTime); // Initial delay before countdown starts

        if (gameState.FinishRndBtnClick === 1) { // Check if round was finished by button click during the initial sleep
            return;
        }

        this._toggleDisplay("#endCountDiv", true);
        let x = 15;
        $("#endCount").html(x);

        if (gameState.roundTimerId) { // Clear any existing timer before starting a new one
            clearInterval(gameState.roundTimerId);
        }

        gameState.roundTimerId = setInterval(() => {
            if (gameState.FinishRndBtnClick === 1) {
                clearInterval(gameState.roundTimerId);
                gameState.roundTimerId = null;
                return;
            }
            x--;
            $("#endCount").html(x);
            if (x <= 0) {
                clearInterval(gameState.roundTimerId);
                gameState.roundTimerId = null;
                this.finishRound();
            }
        }, 1000);
    },

    /**
     * @description Finalizes the round, gets answers, and shows results.
     */
    finishRound: function() {
        gameState.FinishRndBtnClick = 1;
        if (gameState.roundTimerId) {
            clearInterval(gameState.roundTimerId);
            gameState.roundTimerId = null;
        }
        this.getPCAnswers();
        this.getUserAnswers();
        this._togglePopUp("#roundPopUp", false);
        this._togglePopUp("#roundFinishPopUp", true);
        this.printAnswers();
    },

    /**
     * @description Retrieves user answers from input fields and stores them.
     */
    getUserAnswers: function() {
        var self = this; // Store reference to gameLogic object
        gameState.usrAnswArr = []; // Reset user answers for the new round
        $("#roundInput").ready(function () {
            for (var i = 0; i < gameState.selCategor.length; i++) {
                var answerIdBase = "usrAnsw";
                var answerIdFull = answerIdBase + gameState.selCategor[i];
                var usrAnswer = $('#' + answerIdFull).val(); //get user answer for each category
                if (usrAnswer && usrAnswer !== "") {
                    usrAnswer = usrAnswer.charAt(0).toUpperCase() + usrAnswer.slice(1);
                    gameState.usrAnswArr.push(usrAnswer);
                } else {
                    gameState.usrAnswArr.push(""); // Push empty string if no answer
                }
            }
            self.checkAnsw(); // Use stored reference
        });
    },

    /**
     * @description Generates a PC answer for a given word list and round letter.
     * Includes logic to sometimes return an empty answer for easier difficulty levels.
     * @param {string[]} wordList - The list of possible answers for a category.
     * @param {string} rndLetter - The letter for the current round.
     * @returns {string} The PC's answer for the category.
     */
    generatePCAnswers: function(wordList, rndLetter) {
        var tmpWordList = [];
        // For easy or medium difficulty, PC might not have an answer, increasing chances for player to get 15 points.
        if (gameState.difLevel == 1 || gameState.difLevel == 2) {
            tmpWordList.push("");
        }
        wordList.forEach(function (item) {
            if (typeof item === 'string') {
                var wrdLetter = item.charAt(0);
                if (wrdLetter === rndLetter) {
                    tmpWordList.push(item);
                }
            }
        });
        var rndCntr = Math.floor(Math.random() * tmpWordList.length);
        return tmpWordList[rndCntr]; // Return PCanswer directly
    },

    /**
     * @description Generates answers for the PC for each selected category by iterating through them.
     */
    getPCAnswers: function() {
        gameState.PCAnswArr = []; // Reset PC answers array for the round
        gameState.selCategor.forEach(category => {
            let PCanswer = "";
            switch (category) {
                case "Country":
                    PCanswer = this.generatePCAnswers(gameState.CountryList, gameState.roundLetter);
                    break;
                case "CapitalCity":
                    PCanswer = this.generatePCAnswers(gameState.CapitalCityList, gameState.roundLetter);
                    break;
                case "Animal":
                    PCanswer = this.generatePCAnswers(gameState.AnimalList, gameState.roundLetter);
                    break;
                case "Plant":
                    PCanswer = this.generatePCAnswers(gameState.PlantList, gameState.roundLetter);
                    break;
                default:
                    // Optionally handle unknown categories, though current setup implies fixed categories
                    console.warn("Unknown category encountered: " + category);
            }
            gameState.PCAnswArr.push(PCanswer);
        });
    },

    /**
     * @description Helper function to calculate points for a single word in a category.
     * @param {string} userWord - The user's answer.
     * @param {string} pcWord - The PC's answer.
     * @param {string} category - The current category.
     * @param {string} roundLetter - The letter for the current round.
     * @returns {number} Points awarded for the word.
     */
    _calculatePointsForWord: function(userWord, pcWord, category, roundLetter) {
        if (!userWord || userWord.length <= 1 || userWord.charAt(0).toUpperCase() !== roundLetter.toUpperCase()) {
            return 0;
        }

        if (userWord === pcWord) {
            return 5;
        }

        // Check if userWord is valid for the category
        let isValidWord = false;
        switch (category) {
            case "Country":
                isValidWord = gameState.CountryList.includes(userWord);
                break;
            case "CapitalCity":
                isValidWord = gameState.CapitalCityList.includes(userWord);
                break;
            case "Animal":
                isValidWord = gameState.AnimalList.includes(userWord);
                break;
            case "Plant":
                isValidWord = gameState.PlantList.includes(userWord);
                break;
        }

        if (isValidWord) {
            return pcWord && pcWord !== "" ? 10 : 15;
        }

        return 0; // Word not valid or other cases
    },

    /**
     * @description Checks user answers against PC answers, calculates points for the round.
     */
    checkAnsw: function() {
        gameState.rndPoints = 0; // Reset round points
        gameState.usrPointsArr = []; // Reset user points array for the round

        // Loop through each selected category
        for (var i = 0; i < gameState.selCategor.length; i++) {
            let uswrd = gameState.usrAnswArr[i];
            let pcwrd = gameState.PCAnswArr[i];
            let cat = gameState.selCategor[i];

            // Calculate points for the current word using the helper function
            let points = this._calculatePointsForWord(uswrd, pcwrd, cat, gameState.roundLetter);

            gameState.usrPointsArr.push(points);
            gameState.rndPoints += points;
        }

        gameState.totalPoints += gameState.rndPoints; // Add round points to total points
        this.showPointsRes(); // Update UI with points
        this.printAnswers(); // Update UI with answers
    },

    /**
     * @description Displays the answers and points in a table format.
     */
    printAnswers: function() {
        let pernamentHtml1 = '<thead><tr><th scope="col">Category</th><th scope="col">PC Answer</th><th scope="col">' + gameState.userName + ' Answers</th><th scope="col">Points</th></tr></thead><tbody>';
        var pernamentHtml2 = ""; // Initialize with empty string
        for (var x = 0; x < gameState.selCategor.length; x++) {
            let tempHtml1 = '<tr><th scope="row">' + gameState.selCategor[x] + '</th><td>' + gameState.PCAnswArr[x] + '</td><td>' + gameState.usrAnswArr[x] + '</td><td>' + gameState.usrPointsArr[x] + '</td></tr>';
            pernamentHtml2 = pernamentHtml2 + tempHtml1;
        }
        let fullHtml = pernamentHtml1 + pernamentHtml2;
        $("#gameResultTbl").html(fullHtml);
    },

    /**
     * @description Updates the UI to show points for the current round and total points.
     */
    showPointsRes: function() {
        $("#rndPointParagraph").html("You achieve " + gameState.rndPoints + " points in this round!");
        $("#totalPointParagraph").html("Your total results is " + gameState.totalPoints + " points!");
    },

    /**
     * @description Resets variables and UI elements for the next round.
     */
    nextRound: function() {
        gameState.usrPointsArr = [];
        gameState.FinishRndBtnClick = 0;
        if (gameState.roundTimerId) { // Clear timer from previous round
            clearInterval(gameState.roundTimerId);
            gameState.roundTimerId = null;
        }
        gameState.usrAnswArr = [];
        gameState.PCAnswArr = [];
        gameState.rndPoints = 0;
        this._toggleDisplay("#endCountDiv", false);
        $("#endCount").html("");
        $('#roundInput').html("");
        this._toggleDisplay('#finishRdBtn', false);
        this._togglePopUp("#roundFinishPopUp", false);
        this._togglePopUp("#roundPopUp", true);
        this.showStartLetters();
    }
};

window.gameLogic = gameLogic;

// Event listeners for game control buttons
$("#stopBtn").on("click", function() { gameLogic.stopButtonPress(); });
$("#finishRdBtn").on("click", function() { gameLogic.finishRound(); });
$("#nxtRnd").on("click", function() { gameLogic.nextRound(); });