var util = require('util');
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
  var theQuiz = quiz.find(parseInt(req.params.quiz));
  res.send(theQuiz.removeDoor(parseInt(req.params.door)).toString());
});

app.put('/quiz/:quiz/:choice', function(req, res) {
  var theQuiz = quiz.find(parseInt(req.params.quiz));
  theQuiz.choose(req.params.choice);
  var status = theQuiz.status();
  quiz.stats.get(status);
  util.debug(util.inspect(status));
  return res.send(status);
});

app.get('/stats', function(req, res) {
  return res.send(quiz.stats.get());
});
