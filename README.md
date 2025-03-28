# First Interactive Frontend Development Project - Countries, Cities game
This is my second mileston project during learning WEB Development in Code Institute. My project is a word game in which user can test his word knowledge of countries, capital cities, animals and plants. By this game i try to give a second/ virtual life in a paper version of this game.

## UX

### Strategy
The main reasong for creating this web game was to make a online version of one of my favorite game in which i play in childhood. I wanted also to give the opportunity for all my friends to play again in that game and show it for the world.
I planned to make the general apperance of the webiste simple, intuitive and minimalistic with main focus on the game.
I ask my friends and family what they expect from the game to define the web structure and design. You can find below parts of their suggestions.
#### User stories:
* >I think that the paper card is very important in this game, thats how we start the game - we took the paper and created a game board.
* >In my opinion the start of each round when one person say loud X, Y, Z and the other one stopped him to choose the letter.
* >I expect that game will be not too easy, but also not hard, i want to win, but not too ease. I would like to see also correct answers as from i remember i learn a lot of new words during play in the game when i was kid.
* >Definietevly the paper and pen - when you told me countries, cities i have paper and pen in memory. And that pressure when somebody finish writing and start counting. Yes you need to feel that pressure.
* >I would like to see clear website and not complicated game. When i will came in to the web i would like to see very clear how to start the game.


### Scope

Taking to the consideration above stories i identified below requirments:
1. Page must be simple.
2. Project has to contain game instruction, and story about the offline game.
3. Graphic design need to link to the pen and paper.
4. Game has to have option to choose categories and difficulty level.
5. Game round needs to have time limit.
6. Round should start from animation of X,Y,Z to link it to the memories for the people who plays in the game in past, but this animation cannot bother too much to not discourage new users.
7. Game should have option to play with computer and computer answers needs to be showed to learn new words.
8. Computer answers must be true and came from good soruces.

Few requriments which i identified i cannot implemented due to my current knowledge level:
1. Multiplayer game.
2. Best players board.

### Structure

Based on all above i decide to create a nice, simple and not complicated website with 2 static sites - one for game itself, and second with section about this game in offline version.
With higher focus on the game i started looking for the API which i could use for finding correct words in different categories.

### Skeleton

![Main page view](/readme_purpose/wireFrame_1.png)
![Second page view](/readme_purpose/wireFrame_2.png)
![Page view during game](/readme_purpose/wireFrame_3.png)

### Colors and pictures
I try to find a nice picture with element of pen and paper which could be a background of my page, and picture of empty paper card as the element of the game board. To give more real feeling of the game i use the font color very similar to pen color and also hand writing font in the game board.

![Background picture](/readme_purpose/notebook_pen.jpg)
![paper card](/readme_purpose/emptyCard.jpg)


## Features

### Existing Features

* Navigation menu bar.
* Navigation links in footer.
* User name form.
* Game that consists of entering words into a random letter in a given category.
* Game difficulties level - 3 difficulties level to choose:
    * easy - user has 30 second per category to type words, computer can make mistake (can have no word in some categories, this give a chance for user to achieve 15 points)
    * medium - user has 20 second per category to type words, computer can make mistake (can have no word in some categories, this give a chance for user to achieve 15 points)
    * hard - user has 15 second per category to type words, computer can not make mistake, if there is no computer answer the word doesn't exist on that letter.
* Game categories - user can choose all 4 categories (countries, capital cities, animals, plants) or only some of these.
* Learnign new words, by seeing the computer answers after each round.
* Earning points during each rounds.

### Features to Implement in future

* more game categories - cars, cities(all not only capital), things, names
* game ranking
* contact form for reporting issues
* multiplayer game mode

## Technologies Used

* HTML5
* CSS
* JavaScript
* Bootstrap v4.4.1
    * The project uses Bootstrap to make it responsive design.
    * The project uses Bootstrap to make navigation menu bar.
    * Bootstrap responsive table with game results.
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
* VSCode - the main code editor which i used during the project.
* Gitpod - additional code editor used during the project, as i write code in different computers.
* Git - Used to keep track on changes and give the possibility to easliy write code in different work stations.
* GitHub - used to keep external repository with remote access and also to deploy website.
* Jasmine - used for testing functions.
* CSS validator - used to check for errors in CSS code.
* HTML validator - used to check for errors in HTML code.
* JavaScript beutifier - used to make code more readable and beauty.
* Google chrome developer tool - used for make live changes in website and testing.


## Testing

During wiritng code i did many tests by opening and refreshing the website. I did manual, automate and user testing listed below.

### Manual testing
During writing code i check many times the code by refreshing website and look in the web developer tool in web browser. I checked functionality of new added functions in web developer tool console by adding console.log line to see if the variables are correct assigned and functions are done correctly.
Detailed list of manual tests:
1. Check if links(from menu bar and from footer) on main page work correctly.
2. Check if links(from menu bar and from footer) on second page work correctly.
3. Check all buttons in main page and in each part of the game.
4. Check if page is responsive - done in developer web tool and also in 3 types of screens:
    * small screen - 6.5" Android v10
    * medium screen - 15.6" windows 10
    * large screen - 24" windows 10
    * extra large screen - 50" linux lubunto 19.04
5. Check if webpage is correctly work in different web browsers:
    * Google chrome 81.0.4044.138 (64-bit)
    * Brave Version 1.8.90 Chromium: 81.0.4044.129 (Official Build) (64-bit)
    * Firefox 71.0 (64-bit) - test passed positive with one issue - on the time counter, rest work without issues
    * Safari 5.1.7 - test failed, game didn't work

### Automated testing
I use few tools to do automate tests for my project:
1. HTML validator for finding bugs and errors in code - few type mistakes were find.
2. CSS Validator for finidng errors - none were find.

### User tests
After my tests i share link to game with 3 friends and ask them to play and test it.
1. Test web intuitiveness.
2. Test game intuitiveness - check if any of user can simply turn on the game without extra explenation.
3. Test intelligibility of instructions. - check if users can play without any addition explanation.
4. Test intelligibility of game settings.
5. Test game round time - does the time set is enough in different difficulties level.
6. Generally test game.


## Bugs

### Bugs during manual and automated tests:
Manual and automated tests were done systematically and also were fixed in the same way. I listed below the common challenges during the tests:
1. Cancel buttons in user form and settings form close the form, but doesn't clear user name and functions.
2. User can go to the next window without typing name.
3. User can select none of the category and save settings.
4. Points were calculated incorrectly.
5. Points numbers were printed incorrectlye in game result table.

### Bugs during User tests:
1. Time in round is too low.
2. Undefined as computer answer in plant category.
3. Time for each round is not reset. 
4. Missing some of the animals names.

## Fix

### Fixes bugs discovered during manual and automated tests:
1. Add function to clear variables for user name and settings.
2. Add function to check if the user name is not empty and show message in case of is empty.
3. Add function to check if at least one category is selected and show message if is not.
4. Points were calculated incorrectly due to incorect recognized lack of computer answer. Lack of answer in array were stand as "". Function is checking variable if has correct answer. Variable is taking value from array. When array value is "", the variable is undefinied. To fix issue i needed to change the comparision with undefinied instead of "".
5. Points numbers are printed by add html to the game result table. The points were taken to the html from array. Array were not cleaned before new round were start. In result to every round the same points were taken from array and has been show for user. 


### Fixes bugs discovered during User tests:
1. Adjust the time for finish each round.
2. Undefined was showing only in github page, not on local server. Link to the file were wrong. It is corrected and work well (Thanks Reuben).
3. Add the clearTimeOut function.
4. Add the animal name to the list.

## Deployment

1. Navigate to my Github repository - https://github.com/dejvoss/countries_cities
2. Click on the settings tab at the top of the page.
3. Scroll down to the GitHub Pages section.
4. Change the source to master branch.
5. After selecting master branch the page will refresh.
6. Scroll down to the GitHub Pages section and a green box saying "your site is published at" will appear.
7. Click the link to go to the published website.

You can view the deployed website [here](https://dejvoss.github.io/countries-cities-js-game/)

## Credits

### Content

* The list for computer answers in categories countries and capital cities is taken from [REST Countries v1 API](https://rapidapi.com/apilayernet/api/rest-countries-v1).
* The list for computer answers in category animals is based on [Wikipedia article List of animal names](https://en.wikipedia.org/wiki/List_of_animal_names) and is taken by [MediaWiki API](https://www.mediawiki.org/wiki/API:Tutorial).
* The list for computer answers in category plants is take from [Wikipedia](https://en.wikipedia.org/wiki/List_of_plants_by_common_name).
* Navigation bar and responsive design is done by using [Bootstrap](https://getbootstrap.com/)
* 

### Media
* The background photo and paper card image were obtained from [Stock?Photo Secrets](https://shop.stockphotosecrets.com/99club.html)

### Acknowledgements

* Thanks my wife, sisters and friends who gave me inspiration for this project and also test the very first version of the game.
* Big thanks to my mentor for patient, advices, guaidance and going through all steps to make this website work. 
