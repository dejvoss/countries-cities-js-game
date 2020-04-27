// print all variable which should be known on game start - for test purpose

function printStartGameInfo()
{
    console.log(userName);
    console.log(difLevel);
    console.log(selCategor);
    console.log(roundLetter);
    console.log(currentGameAlphabet);
    console.log(gameResults);

}

let RoundCounter = 0;


// action for finish round button in game round section
document.getElementById("finishRdBtn").addEventListener("click", function ()
{
    getUserAnswers();
    printStartGameInfo();


});

// get user answers and save in array userAllAnswers

function getUserAnswers()
{

    gameResults.push([RoundCounter]); //add round number to the gameResults array

    $("#roundInput").ready(function ()
    {
        for (i = 0; i < selCategor.length; i++)
        {
            var answerIdBase = "usrAnsw";
            var answerIdFull = answerIdBase + selCategor[i];
            var usrAnswer = $('#' + answerIdFull).val(); //get user answer for each category
            gameResults[RoundCounter].push(usrAnswer); //add each user answer to game Result array
        };
    });
};






// format list of links as the list contain not only animal names








// function to get response from api for each user answer

// function for difficult level - set different time for user answers on different level, after that time show counter from 10 to 0, when timer show 0 lock user input and show message that time is gone, pop up round summary window;


// function to compare user answer with api response, different function for each category

// country category checking - check if api response has country word in it

// city category checking - check if api response has city word in it

// animal category checking - check if api response has animal word in it

// plant category checking - check if api response has plant word in it

// name category check - check if is response in api - if word exist in it - api for checking if name is male or female, still need to get access for it


// computer answers function - for countries find a word in csv file depend of category start from round letter, randomly choose one word of these and save in variable pcNaswerCategoru, add time function to give answer on each category every leveltime/categories (second) - purpose for achieve highest number of points in case that user will finish round before end time, example: round has 1 minute, user finsh in 30s computer has only half answers

//