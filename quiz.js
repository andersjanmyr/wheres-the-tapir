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
        doors.delete(this.firstChoice);
        doors.delete(this.correct_door);
        this.removedDoor = doors[randomFromTo(1, doors.length) - 1];
        return removedDoor;
    }

}

function randomFromTo(from, to){
   return Math.floor(Math.random() * (to - from + 1) + from);
}

var id = 1;
function nextId() {
    id++;
}

exports.create = function() {
    var quiz = Object.create(aQuiz);
    quiz.id = nextId();
    console.log(quiz.id);
    quiz.correctDoor = randomFromTo(1, 3);

    return quiz;
};

exports.find = function(id) {
    var quiz = quizzes[id];
    return quiz;
}
