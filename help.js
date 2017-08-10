//only npm package needed
var colors = require('colors/safe');

function help() {
	console.log(colors.red(`Do You Need Help?

Flip Cards is a game that allows the user to pick a card with 
a front and a back and play a trivia game. 


To run Flip Cards, run node play.js in your terminal. 

You will be prompted as such:

? Are you ready to begin? (Y/n)
Choose yes!

Then: 
? What type of questions would you like? (Use arrow keys)
❯ Fill in the Blanks
  Basic Trivia
  Ask for Help

If you choose Basic Trivia, 
you will be prompted to create a card, delete a card, or play.
If you choose create a card, you will be prompted to make a new card.
If you choose delete a card, you will delete the last created card. 
If you choose play, you will be given a question and 
prompted for an answer.

If you choose Fill in the Blanks, 
If you choose create a card, you will be prompted to make a new card.
If you choose delete a card, you will delete the last created card. 
If you choose play, you will be given a statement with a word missing. 
You will be prompted to guess the missing word. 

If you choose Ask for Help, 
you will get sent back here. 

The game will continue until you choose to quit or run out of cards. 

Let me know if you have any other questions!
`))
}

module.exports = help;