const colors = require('colors/safe');
//function to exit game
function quit() {
console.log(colors.red("Thanks for playing! Come again soon!")); //sends a goodbye messge in American colors (sorry Dzmitry)
    process.exit(-1);
    
}

//makes quit accesible to the play.js file
module.exports = quit;