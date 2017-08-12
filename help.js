//only npm package needed
var colors = require('colors/safe');

function help() {
	console.log(colors.rainbow(`Do You Need Help?

Flip Cards is a game that allows the user to pick a card with 
a front and a back and play a trivia game. 


To run Flip Cards, run node play.js in your terminal. 

You will be prompted as such:

? Are you ready to begin? (Y/n)
Choose yes!

Then: 
Please choose a menu option from the list below? (Use arrow keys)
❯ Create New Cards
  Use All
  Random
  Shuffle
  Show All
  Ask for Help
  Quit

If you choose Create New Cards, 
you will be prompted to create a card and choose between Basic and Fill in the Blanks(Cloze).
If you choose Basic, 
You will be prompted for a question and 
then prompted for an answer.

If you choose Fill in the Blanks, 
You will be prompted for a statement and then the missing word.


If you choose Use All, the cards will be displayed in the order that they are listed in the array. 

If you choose Random, you will pick a random card.

If you choose Shuffle, you will mix up the cards in the array.

If you choose Ask for Help, 
you will get sent back here. 

The game will continue until you choose to quit or run out of cards. 

Let me know if you have any other questions!
`))
}

module.exports = help;