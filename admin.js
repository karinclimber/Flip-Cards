//npm packages
var fs = require('fs');
var inquirer = require('inquirer');
var prompt = require('prompt');
var confirm = require('inquirer-confirm');
var jsonfile = require('jsonfile')
var colors = require('colors/safe');

//external sources
var beginBasic = require('./BasicCard.js');
var ClozeCard = require('./ClozeCard.js');
var help = require('./help');
var quit = require('./quit');
var jsonfile = require('jsonfile');
var clozefile = './clozedata.json'; 
var basicfile = './basicdata.json';


function promptStart() {
	confirm(colors.rainbow("Welcome to Flip Cards! Are you ready to begin?"
)).then(function confirmed() {
		inquirer.prompt([
        {
            type: "list",
            message: colors.red("What type of game would you like to play?"),
            choices: ["Fill in the Blanks", "Basic Trivia", "Ask for Help", "Quit"], 
            name: "gameType"
	   } 
		]).then(function(answers) {

        if (answers.gameType === "Fill in the Blank"){
            console.log("heyyyuuuy");
						// ClozeCard();
						
        }

        else if (answers.gameType === "Basic Trivia"){
            console.log("jjeoollllejeo");
            beginBasic();
        }

        else if (answers.gameType === "Ask for Help") {
            help();
        }

        else if (answers.gameType === "Quit") {
            quit();
        }

        else {
            quit();
        }

    }), function cancelled() {
        console.log("Sorry to hear that. Come back later if you change your mind.")
	}
	});
    }
promptStart();