//npm packages
var fs = require('fs');
var inquirer = require('inquirer');
var prompt = require('prompt');
var confirm = require('inquirer-confirm');
var jsonfile = require('jsonfile')
var colors = require('colors/safe');

var quit = require('./quit');
var basicfile = './basicdata.json';

function beginBasic() {
    console.log(colors.white(`Awesome! Let's get started. Choose 'Ask for Help' for instructions!`));
    inquirer.prompt([
        {
            type: "list",
            message: colors.red("Please choose a way to use your cards!"),
            choices: ["Play Game", "Create New Card", "Delete Most Recent Card", "Display All Cards", "Quit"], 
            name: "startMenu"
       } 

]).then(function(answers) {
    if (answers.startMenu === "Play Game") {
        play();
        console.log("ggggg");
    } else if (answers.startMenu === "Create New Card") {
        createNew();
        console.log("create card")
    } else if (answers.startMenu === "Delete Most Recent Card") {
        deleteCard();
        console.log("delete card")
    } else if (answers.startMenu === "Display All Cards") {
        display();
        console.log("display")
    } else if (answers.startMenu === "Quit") {
        quit();
    } else {
        quit();
    }
})
}

//play function 
var BasicCard = function(front, back) {
    this.front = front;
    this.back = back;
    this.play = function(front, back) {
        var createNew = new BasicCard(front, back);
        var deleteCard = function() {
            confirm(colors.rainbow("Are you sure you want to delete a card?"
            )).then(function confirmed() {
            fs.readFile(basicfile, 'utf-8', function(err, data) {
	        if (err) throw err;
        //create array from json file
	            var deleteArray = JSON.parse(data);
                console.log(deleteArray);

                }), function cancelled() {
	        console.log("cancel");
                }
        })
// end of delete card function ++++++++++++++++
        }
        var display = function (front, back) {
            fs.readFile(basicfile, "utf8", function(error,data){
		    if(error) console.log(error);
		    console.log(JSON.parse(data));
                })
    }
    }
}

module.exports = BasicCard;