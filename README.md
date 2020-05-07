# First Interactive Frontend Development Project - Countries, Cities game
This is my second mileston project during learning WEB Development in Code Institute. My project is a word game in which user can test his word knowledge of countries, capital cities, animals and plants. By this game i try to give a second/ virtual life in a paper version of this game.

## UX
I planned to make the general apperance of the webiste simple, intuitive and minimalistic with main focus on the game.
I made this project for my friends with whom I played this game many times in our childhood. I wanted it to reflect the memories of playing on a piece of paper as much as possible, that's why i asked my friends what could bring them these memories if they will play in the game on the computer. Let see their answers:
* >I think that the paper card is ver important in this game, thats how we start the game - we took the paper and created a game board.
* >In my opinion the start of each round when one person say loud X, Y, Z and the other one stopped him to choose the letter.
* >I expect that game will be not too easy, but also not hard, i want to win, but not too ease. I would like to see also correct answers as from i remember i learn a lot of new words during play in the game when i was kid.
* >Definietevly the paper and pen - when you told me countries, cities i have paper and pen in memory. And that pressure when somebody finish writing and start counting. Yes you need to feel that pressure.

Taking to the consideration above stories i decide to focus on simple website with element of paper and pen in visual laid. I also thought about people who don't know the game and i decide to create section with game story and paper game version rules. I create first view of web as in below picture. During developing i change the game board place to the pop up window instead of the section in main page.

![Firt project view](/readme_purpose/prViewImg.png)
### Colors and pictures
I try to find a nice picture with element of pen and paper which could be a background of my page, and picture of empty paper card as the element of the game board. To give more real feeling of the game i use the font color very similar to pen color and also hand writing font in the game board.

![Background picture](/readme_purpose/notebook_pen.jpg)
![paper card](/readme_purpose/emptyCard.jpg)


## Features

### Existing Features

 * Game difficulties level - user can choose 1 from 3 different difficulties levels - depence of the level, player has different time for typing the words. In level easy also is a chance that computer will don't know the answer and user can achieve extra points in that case.
* Game categories - user can choose all 4 categories (countries, capital cities, animals, plants) or only some of these.

### Features Left to Implement

* more game categories - cars, cities(all not only capital), things, names
* multiplayer game mode

## Technologies Used

* HTML5
* CSS
* JavaScript
* Bootstrap v4.4.1
    * The project uses Bootstrap to make it responsive design.
    * The project uses Bootstrap to make navigation menu bar.
* Font awesome.
    * The project uses Font awesome to implement some of the fonts and icons.
* JQuery v3.4.1
    * The project uses JQuery to simplify DOM manipulation and to get information from APIs.
* RestCountries API v1
    *The project uses RestCountries API to get lists of countries and capital cities.
* MediaWiki API
    * The project uses MediaWiki API to get list of animal names.
* JQuery-csv
    * The project uses JQuery-csv to read list of plant names from csv file format.

## Testing

## Deployment

The project is deployed [here](https://dejvoss.github.io/countries_cities/) by Github Pages.

## Credits

### Content

* The list for computer answers in categories countries and capital cities is taken from [REST Countries v1 API](https://rapidapi.com/apilayernet/api/rest-countries-v1).
* The list for computer answers in category animals is based on [Wikipedia article List of animal names](https://en.wikipedia.org/wiki/List_of_animal_names) and is taken by [MediaWiki API](https://www.mediawiki.org/wiki/API:Tutorial).
* The list for computer answers in category plants is take from

### Media
* The background photo and paper card image were obtained from [Stock?Photo Secrets](https://shop.stockphotosecrets.com/99club.html)

### Acknowledgements

* Thanks my wife and sister who gave me inspiration for this project.