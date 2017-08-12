// make the cloze card
function ClozeCard(text, cloze) {
    this.text = text.split(cloze); 
    this.cloze = cloze;

};
//text.split will break up the statement at the cloze

//this will create the statement as two separate statements divided by ...
function ClozePrototype() {

    this.clozeRemoved = function () {
        return `${this.text[0]} ... ${this.text[1]}`;
    };											
};

ClozeCard.prototype = new ClozePrototype();

//make the constructor accessible to the play file
module.exports = ClozeCard; 