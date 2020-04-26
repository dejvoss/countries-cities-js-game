# Countries, Cities game
This is my first Interactive Frontend Development Project maked during the Full Stack Web Development course in Code Institute.
My project is a word game in which user can test his knowledge of countries, cities, animals and plants. Based on chosen letter user has to type the words under different categories. In the end his answers are compared with computer answers and for both are assigned points.

## UX
I planned to make the general apperance of the webiste simple, intuitive and minimalistic with main focus on the game.
I made this project for my friends with whom I played this game many times in our childhood. I wanted it to reflect the memories of playing on a piece of paper as much as possible, that's why i asked my friends what could bring them these memories if they will play in the game on the computer. Let see their answers:
* >I think that the paper card is the most important in this game, thats how we start the game - we took the paper and created a game board.
* >In my opinion the start of each round when one person say loud X, Y, Z and the other one stopped him to choose the letter.
* >Definietevly the paper and pen - when you told me countries, cities i have paper and pen in memory. And that pressure when somebody finish writing and start counting. Yes you need to feel that pressure.

Based on that I decided to focus on elements of paper and pen in website and exact game board as we use to play on. I created a simple picture of my project as below and i started writing code.

![Firt project view](/readme_purpose/prViewImg.png)


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