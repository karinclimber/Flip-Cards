const inquirer = require("inquirer");
const confirm = require('inquirer-confirm');
const arr = require("./cardArr.json");
const BasicCard = require("./BasicCard.js")
const ClozeCard = require("./ClozeCard.js")
const colors = require('colors');
const fs = require("fs");
const quit = require("./quit");
const help = require("./help");

var drawnCard;
var playedCard;
var count = 0;

//initially give option to the user to Create new flashcards or use exiting ones.
function promptStart() {
	confirm(colors.rainbow("Welcome to Flip Cards! Are you ready to begin?"
)).then(function confirmed() {
        promptMenu();

 }), function cancelled() {
    console.log("Sorry to hear that. Come back later if you change your mind.")
 }
}

function promptMenu() {      
    inquirer.prompt([
        {
          type: "list",														//type list gives user a list of options
          message: colors.rainbow("\nPlease choose a menu option from the list below?"),	//message shown to the user
          choices: ["Create New Cards", "Use All", "Random", "Shuffle", "Show All", "Ask for Help", "Quit"],	//options that show in list
          name: "startMenu"												//refrence name of object
      }
  ]).then(function (answer) {												//Once inquirer gets answer then...
    var waitMsg;


    switch (answer.startMenu) {

        case 'Create New Cards':
            console.log("Are you excited to make a new card!?");
            waitMsg = setTimeout(createCard, 1000);
            break;

        case 'Use All the Cards':
            console.log("Let's go through the cards in order.");
            waitMsg = setTimeout(askQuestions, 1000);
            break;

        case 'Random Card':
            console.log("Let me pick a random card for you!");
            waitMsg = setTimeout(randomCard, 1000);
            break;

        case 'Shuffle':
            console.log("Let me mix up the cards! Then we can continue.");
            waitMsg = setTimeout(shuffleCards, 1000);
            break;

        case 'Show All':
            console.log("Don't look if you don't want to see all the cards and answers!");
            waitMsg = setTimeout(showCards, 1000);
            break;
          
        case 'Ask for Help':
            help();
            waitMsg = setTimeout(promptMenu, 10000)
            
            break;    

        case 'Quit':
            quit();
            return;
            break;

        default:
            console.log("");
            console.log("Sorry I don't understand");
            console.log("");
    }

  });
//If the choice is to create a card then this function will run
function createCard() {
    inquirer.prompt([
        {
            type: "list",
            message: "What type of flashcard do you want to create?",
            choices: ["Basic Card", "Fill in the Blanks"],
            name: "cardType"
        }

    ]).then(function (appData) {

        var cardType = appData.cardType;  			//the variable cardType will store the choice from the cardType inquirer object.
        console.log(cardType);			  			//prints the card type chosen to the user

        if (cardType === "Basic Card") {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please fill out the front of your card (Your Question).",
                    name: "front"
                },

                {
                    type: "input",
                    message: "Please fill out the back of your card (Your Answer).",
                    name: "back"
                }

            ]).then(function (cardData) {

                var cardObj = {						
                    type: "BasicCard",
                    front: cardData.front,
                    back: cardData.back
                };
                arr.push(cardObj);			
                fs.writeFile("cardArr.json", JSON.stringify(arr, null, 2)); 

                inquirer.prompt([					
                    {
                        type: "list",
                        message: "Do you want to create another card?",
                        choices: ["Yes", "No"],
                        name: "anotherCard"
                    }

                ]).then(function (appData) {				
                    if (appData.anotherCard === "Yes") {	
                        createCard();						
                    } else {								
                        setTimeout(promptMenu, 1000);			
                    }
                });
            });

        } else {					
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please type out the full text of your statement (remove cloze in next step).",
                    name: "text"
                },

                {
                    type: "input",
                    message: "Please type the portion of text you want to cloze, replacing it with '...'.",
                    name: "cloze"
                }

            ]).then(function (cardData) {            

                var cardObj = {						
                    type: "ClozeCard",
                    text: cardData.text,
                    cloze: cardData.cloze
                };
                if (cardObj.text.indexOf(cardObj.cloze) !== -1) {   
                    arr.push(cardObj);							
                    fs.writeFile("cardArr.json", JSON.stringify(arr, null, 2)); 
                } else {										
                    console.log("The cloze word must match a word in the statement.");

                }
                inquirer.prompt([					//prompt the user see if they want to keep making cards
                    {
                        type: "list",
                        message: "Do you want to create another card?",
                        choices: ["Yes", "No"],
                        name: "anotherCard"
                    }

                ]).then(function (appData) {				
                    if (appData.anotherCard === "Yes") {	
                        createCard();						
                    } else {								
                        setTimeout(promptMenu, 1000);		
                    }
                });
            });
        }

    });
};

function getQuestion(card) {
    if (card.type === "BasicCard") {						
        drawnCard = new BasicCard(card.front, card.back);	
        return drawnCard.front;								
    } else if (card.type === "Fill in the Blanks") {					
        drawnCard = new ClozeCard(card.text, card.cloze)	
        return drawnCard.clozeRemoved();					
    }
};

//function to ask questions from all stored card in the arr
function askQuestions() {
    if (count < arr.length) {					
        playedCard = getQuestion(arr[count]);	
        inquirer.prompt([							
            {
                type: "input",
                message: playedCard,
                name: "question"
            }
        ]).then(function (answer) {					
            if (answer.question === arr[count].back || answer.question === arr[count].cloze) {
                console.log(colors.red("You are correct."));
            } else {
            	
                if (drawnCard.front !== undefined) { 
                    console.log(colors.green("Sorry, the correct answer was ") + arr[count].back + "."); 
                } else { 
                    console.log(colors.green("Sorry, the correct answer was ") + arr[count].cloze + ".");
                }
            }
            count++; 		
            askQuestions(); 
        });
    } else {
      	count=0;			
      	promptMenu();			
    }
};

function shuffleCards() {
  newDeck = arr.slice(0); 
  for (var i = arr.length - 1; i > 0; i--) { 

      var getIndex = Math.floor(Math.random() * (i + 1));
      var shuffled = newDeck[getIndex];

      newDeck[getIndex] = newDeck[i];

      newDeck[i] = shuffled;
  }
  fs.writeFile("cardArr.json", JSON.stringify(newDeck, null, 2)); 
  console.log(colors.cyan("The deck of flashcards have been shuffled"));
}


function randomCard() {
  var randomNumber = Math.floor(Math.random() * (arr.length - 1)); 

  playedCard = getQuestion(arr[randomNumber]);
        inquirer.prompt([							
            {
                type: "input",
                message: playedCard,
                name: "question"
            }
        ]).then(function (answer) {				
            if (answer.question === arr[randomNumber].back || answer.question === arr[randomNumber].cloze) {
                console.log(colors.green("You are correct."));
                setTimeout(promptMenu, 1000);
            } else {
            
                if (drawnCard.front !== undefined) { 
                    console.log(colors.red("Sorry, the correct answer was ") + arr[randomNumber].back + "."); 
                    setTimeout(promptMenu, 1000);
                } else { 
                    console.log(colors.red("Sorry, the correct answer was ") + arr[randomNumber].cloze + ".");
                    setTimeout(promptMenu, 1000);
                }
            }
        });

};

//function to print all cards on screen for user to read through or cheat
function showCards () {

  var arr = require("./cardArr.json");

  if (count < arr.length) {                     

    if (arr[count].front !== undefined) { 
        console.log(`\n`);
        console.log(colors.rainbow("-+-+-+-+-+-+-+-+-+-+- Basic Card -+-+-+-+-+-+-+-+-+-+-"));
        console.log(colors.blue("-+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+-"));
        console.log("Front: " + arr[count].front); 
        console.log("------------------------------------------------");
        console.log("Back: " + arr[count].back + ".");
        console.log(colors.blue("-+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+-"));
        console.log(`\n`);

    } else { 
        console.log(`\n`);
        console.log(colors.rainbow("-+-+-+-+-+-+-+-+-+- Fill in the Blank Card -+-+-+-+-+-+-+-+-+-"));
        console.log(colors.blue("-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+-"));
        console.log("Statment: " + arr[count].text); 
        console.log("------------------------------------------------");
        console.log("Blank: " + arr[count].cloze + "."); 
        console.log(colors.blue("-+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+--+-+-+-+-+-+-+-+-+-+-"));
        console.log(`\n`);
    }
    count++;		
    showCards();	
  } else {
    count=0;		
    promptMenu();		
  }
}
}
promptStart();