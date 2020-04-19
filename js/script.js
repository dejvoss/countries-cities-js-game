

// this file contain script which is not use for now, but i was used it during making the website. For some of the reasons i remove these scripts, but maybe in future i will want it to use.
// function for writing category names
var categoryNames = "Country City Animal Thing Plant Name Car Points";
var letterCtr = 0;
var headerIndx = 0;
var speed = 120;

function wrtieCategory() {
    var hdrTag = document.getElementById("headerRow").getElementsByTagName("th"); // take table header
    if (letterCtr < categoryNames.length) {
        if (categoryNames.charAt(letterCtr) == " ") { //check if text in category names has space, if yes change the header index
            headerIndx++;
        }
        hdrTag[headerIndx].innerHTML += categoryNames.charAt(letterCtr);
        letterCtr++;
        setTimeout(wrtieCategory, speed);
    }
}

function drawTable() {
    document.getElementById("GameTable").classList.add("bottomLine");
    
}




// dictionary api access
var lookedWord = "elephant"
var baseUrl = "https://twinword-word-graph-dictionary.p.rapidapi.com/definition/?entry=";
var finalUrl = baseUrl + lookedWord
var settings1 = {
	"async": true,
	"crossDomain": true,
	"url": finalUrl,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "twinword-word-graph-dictionary.p.rapidapi.com",
		"x-rapidapi-key": "611a569c35msh65ff74f34b25d3ap19724bjsne5db4e1e1809"
	}
}

// get api response
$(document).ready(function(){
$.ajax(settings1).done(function (response) {
	console.log(response);
});
})
// api purpose
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://wordsapiv1.p.rapidapi.com/words/elephant/definition",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
		"x-rapidapi-key": "611a569c35msh65ff74f34b25d3ap19724bjsne5db4e1e1809"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});



/*
    get_categories.js

    MediaWiki API Demos
    Demo of `Categories` module: Get categories associated with a page.

    MIT License
*/

var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "query",
    format: "json",
	prop: "categories",
	cllimit: 100,
    titles: "Poland"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        var pages = response.query.pages;
        for (var p in pages) {
            for (var cat of pages[p].categories) {
                console.log(cat.title);
            }
        }
    })
    .catch(function(error){console.log(error);});





/*
    get_category_items.js

    MediaWiki API Demos
    Demo of `Categorymembers` module : List twenty items in a category

    MIT License
*/

var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "query",
    list: "categorymembers",
    cmtitle: "Category:Countries",
    cmlimit: "20",
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        var pages = response.query.categorymembers;
        for (var page in pages) {
            console.log(pages[page].title);
        }
    })
    .catch(function(error){console.log(error);});












    

/*
    get_allcategories.js

    MediaWiki API Demos
    Demo of `Allcategories` module: Get all categories, starting from a certain point, as ordered by category title.

    MIT License
*/

var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "query",
    format: "json",
    list: "allcategories",
    acfrom: "Poland"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        var categories = response.query.allcategories;
        for (var cat in categories) {
            console.log(categories[cat]["*"]);
        }
    })
    .catch(function(error){console.log(error);});




    
/*
    search.js

    MediaWiki API Demos
    Demo of `Search` module: Search for a text or title

    MIT License
*/

var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "query",
	list: "search",
	srlimit: 10,
	cmtitle: "Category:Countries",
	srprop: "categorysnippet:Animals",
    srsearch: "animal monkey",
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
	.then(function(response){return response.json();})

    .then(function(response) {
		console.log(response);
        if (response.query.search[0].title === "Nelson Mandela"){
            console.log("Your search page 'Nelson Mandela' exists on English Wikipedia" );
        }
    })
    .catch(function(error){console.log(error);});





/*
    get_allcategories.js

    MediaWiki API Demos
    Demo of `Allcategories` module: Get all categories, starting from a certain point, as ordered by category title.

    MIT License
*/

var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "query",
    format: "json",
    list: "allcategories",
    acfrom: "animals"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {
        var categories = response.query.allcategories;
        for (var cat in categories) {
            console.log(categories[cat]["*"]);
        }
    })
	.catch(function(error){console.log(error);});
	

/*
    opensearch.js
    MediaWiki API Demos
    Demo of `Opensearch` module: Search the wiki and obtain
	results in an OpenSearch (http://www.opensearch.org) format
    MIT License
*/

var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "opensearch",
    search: "Country Poland",
    limit: "5",
    namespace: "0",
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function(response){return response.json();})
    .then(function(response) {console.log(response);})
	.catch(function(error){console.log(error);});
	


