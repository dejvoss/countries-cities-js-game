

function printStartGameInfo(){
console.log(userName);
console.log(difLevel);
console.log(selCategor);
console.log(roundLetter);
console.log(currentGameAlphabet);
}

document.getElementById("finishRdBtn").addEventListener("click", finishRound);


var userAllAnswers = [];

function finishRound(){
    printStartGameInfo();
}
// get user Answers in to array
function getUserAnswers(){
    for (i = 0; i < selCategor.length; i++){
        var answerId = '"#' + selCategor[i] + '"';
        var usrAnswer = $(answerId).val();
        userAllAnswers.push(usrAnswer);
    }
};

// dictionary api access

var settings = {
	"async": true,
	"crossDomain": true,
	url,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
		"x-rapidapi-key": "611a569c35msh65ff74f34b25d3ap19724bjsne5db4e1e1809"
	}
}

//$.ajax(settings).done(function (response) {
//	console.log(response);
//});
var lookedWord = "Poland"
var url = '"url": "https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=' + lookedWord + '"';