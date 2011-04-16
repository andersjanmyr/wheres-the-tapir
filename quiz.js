var util = require('util');

var quizzes = {};

var aQuiz = {
    id: 'anId',
    correctDoor: '1, 2, or 3',
    firstChoice: null,
    removedDoor: null,
    finalChoice: null,
    removeDoor: function(firstChoice) {
        this.firstChoice = firstChoice;
        var doors = [1,2,3];
        removeElement(doors, this.firstChoice);
        removeElement(doors, this.correctDoor);
        util.debug(doors);
        this.removedDoor = doors[randomFromTo(1, doors.length) - 1];
        util.debug(util.inspect(this));
        return this.removedDoor;
    },
    choose: function(choice) {
        this.finalChoice = choice;
        stats.update(this.finalChoice, this.isCorrect());
    },
    isCorrect: function() {
        return (this.finalChoice == 'stick') == (this.firstChoice == this.correctDoor);
    },
    status: function() {
        return {
          correct_door: this.correctDoor,
          is_correct: this.isCorrect(),
          choice: this.finalChoice
        }
    }
}

var aStats = {
  stickCount: 0,
  stickCorrectCount: 0,
  switchCount: 0,
  switchCorrectCount: 0,

  update: function(choice, correct) {
    if (choice  == 'stick') {
      this.stickCount += 1;
      if (correct) this.stickCorrectCount += 1
    } else {
      this.switchCount += 1;
      if (correct) this.switchCorrectCount += 1;
    }
  },

  get: function(hash) {
      if (!hash) hash = {};
      hash['stick'] = [this.stickCorrectCount, this.stickCount];
      hash['switch'] = [this.switchCorrectCount, this.switchCount];
      return hash;
  }
}

var stats = Object.create(aStats);

function removeElement(array, element) {
    var i = array.indexOf(element);
    if (i >= 0)
        array.splice(i, 1);
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

exports.stats = stats;
