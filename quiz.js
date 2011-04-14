var util = require('util');

var quizzes = {};

var aQuiz = {
    id: 'anId',
    correctDoor: '1, 2, or 3',
    firstChoice: null,
    removedDoor: null,
    finalChoice: null,
    removeDoor: function(firstChoice) {
        console.log(this);
        this.firstChoice = firstChoice;
        var doors = [1,2,3];
        delete doors[this.firstChoice];
        delete doors[this.correctDoor];
        this.removedDoor = doors[randomFromTo(1, doors.length) - 1];
        util.debug(util.inspect(this));
        return this.removedDoor;
    }

}

function randomFromTo(from, to){
   return Math.floor(Math.random() * (to - from + 1) + from);
}

var id = 1;
function nextId() {
    return id++;
}

exports.create = function() {
    var quiz = Object.create(aQuiz);
    quiz.id = nextId();
    quiz.correctDoor = randomFromTo(1, 3);
    util.debug(util.inspect(quiz));
    quizzes[quiz.id] = quiz;
    return quiz;
};

exports.find = function(id) {
    var quiz = quizzes[id];
    return quiz;
}
