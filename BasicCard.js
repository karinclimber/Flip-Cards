// how to make a "basic" card
function BasicCard(front, back) {
    this.front = front;
    this.back = back;

};
//make the constructor accessible to the play file
module.exports = BasicCard;