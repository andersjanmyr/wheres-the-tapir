var express = require('express');
var quiz = require('./quiz');

var app = express.createServer();
app.listen(4000);

app.configure(function() {
    //app.use(express.logger());
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function() {
    app.use(express.logger());
    app.use(express.errorHandler());
});

app.get('/', function(req, req) {
  res.redirect('/index.html');
});

app.post('/quiz', function(req, res) {
  res.send(quiz.create().id.toString());
});


app.put('/quiz/:quiz/select/:door', function(req, res) {
  var quiz = quiz.find[req.params.quiz];
  res.send(quiz.removeDoor(req.params.door).toString());
});

app.put('/quiz/*/*', function(req, req) {
  //quiz = Quiz.quizzes[req.params.quiz.to_i]
  //quiz.choose(rea.params.choice)
  //status = quiz.status
  //Stats.get(status)
  //status.to_json
});

app.get('/stats', function(req, req) {
  //Stats.get.to_json
});
