// print all variable which should be known on game start - for test purpose

function printStartGameInfo(){
console.log(userName);
console.log(difLevel);
console.log(selCategor);
console.log(roundLetter);
console.log(currentGameAlphabet);
console.log(gameResults);

}

let RoundCounter = 0;


// action for finish round button in game round section
document.getElementById("finishRdBtn").addEventListener("click", function(){
	printStartGameInfo();
	getUserAnswers();
	$.when(getUserAnswers).then(assingWord);
});

// get user answers and save in array userAllAnswers

function getUserAnswers(){

	gameResults.push([RoundCounter]);
	$("#roundInput").ready(function(){
		//add round number to the gameResults array
    for (i = 0; i < selCategor.length; i++){
		var answerIdBase = "usrAnsw";
		var answerIdFull = answerIdBase + selCategor[i];
		var usrAnswer = $('#' + answerIdFull).val();		//get user answer for each category
        gameResults[RoundCounter].push(usrAnswer);					//add each user answer to game Result array
	};
	
	console.log(gameResults);
});
};

// check if country provided by user exist

// function to assign word for checking in API
var assignedWord;
function assingWord(category, roundNr){

	var indexX = gameResults[0].indexOf(category);
	assignedWord = gameResults[roundNr][indexX];
}


// function to create a url for API
function getURL(word, baseUrl) {
    let finalURL = baseUrl + word;
    return finalURL;
}



function apiSuccess(event) {
    
}

function apiError(event) {
    
}

// API for country check

var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://restcountries-v1.p.rapidapi.com/name/czech",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
			"x-rapidapi-key": "611a569c35msh65ff74f34b25d3ap19724bjsne5db4e1e1809"
		}
	}
	
$.ajax(settings).done(function (response) {
		console.log(response);
	});


/**
 * parse.js
 *
 * MediaWiki API Demos
 * Demo of `Parse` module: Parse content of a page
 *
 * MIT License


var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "parse",
	page: "List_of_ISO_3166_country_codes",
	prop: "text",
	section: 1,
//	prop: "sections",
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
	.then(function(response){return response.json();})
	.then(function(response) {
		var obj = JSON.parse(json);

            console.log(obj.text);
        
    })

 */









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

