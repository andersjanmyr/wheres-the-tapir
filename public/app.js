$(function() {

  $.ajaxSetup({
    dataType: 'text',
    error: function(xhr, status, error) {
      info('Error! ' +  ( error ? error : xhr.status ));
    }
  });

  function info(text) {
    $('#info-text').text(text);
  }

  $('#start').click(function(e) {
    e.preventDefault();
    info("New quiz started");
    $('#start').attr('disabled', 'disabled');
    postQuiz();
  });

  function postQuiz() {
    $.ajax({
      type: 'POST',
      url: '/quiz',
      success: function(token) {
        saveToken(token);
        enableDoors();
      }
    });
  }

  var currentToken;
  function saveToken(token) {
    currentToken = token;
  }

  function enableDoors() {
    info("Select a door!");
    $('#doors li')
      .addClass('enabled')
      .removeClass('selected removed tapir tapir-selected')
      .hover(
        function() {$(this).addClass('hover')},
        function() {$(this).removeClass('hover')})
      .click(doorSelected);
  }

  function doorSelected(e) {
    e.preventDefault();
    var door = $(this)
      .removeClass('enabled')
      .addClass('selected')
      .data('id');
    $('#doors li')
      .unbind('click mouseenter mouseleave')
    putSelected(door);
  }

  function putSelected(door) {
    $.ajax({
      type: 'PUT',
      url: '/quiz/' + currentToken + '/select/' + door,
      success: function(data) {
        info("Stick or Switch!");
        $('#door-' + data)
          .removeClass('enabled')
          .addClass('removed');
        $('#stick-switch button').removeAttr('disabled');
      }
    });
  }

  $('#stick-switch button').click(function(e) {
    e.preventDefault();
    var value = $(this).data('id');
    putChoice(value);
  });

  function putChoice(value) {
    $.ajax({
      type: 'PUT',
      dataType: 'json',
      url: '/quiz/' + currentToken + '/' + value ,
      success: function(data) {
        updateImage(data);
        infoResult(data);
        updateStats(data);
        resetButtons();
      }
    });
  }

  function updateImage(data) {
    var imageClass = 'tapir';
    if ((data.choice == 'stick') == data.is_correct)
      imageClass = 'tapir-selected';
    $('#door-' + data.correct_door)
      .removeClass('selected enabled removed')
      .addClass(imageClass);
  }
  function infoResult(data) {
    var right_or_wrong = data.is_correct ? ' right!' : ' wrong!';
    var message =
      (data.choice == 'stick'
        ? 'You stick, and you are'
        : 'You switch and you are')
      + right_or_wrong;
    info(message);
  }

  function updateStats(data) {
    updateStat(data, 'stick');
    updateStat(data, 'switch');
  }

  function updateStat(data, kind) {
    var arr = data[kind];
    var correct = arr[0], guesses = arr[1];
    var percentage = 0;
    if (guesses > 0) {
      percentage = parseInt(correct / guesses * 100);
    }
    var text = correct + '/' + guesses  + ' = ' + percentage + '%'
    $('#' + kind + '-count').text(text);
  }

  function resetButtons() {
    $('#start').removeAttr('disabled');
    $('#stick-switch button').attr('disabled', 'disabled');
  }

  $.getJSON('/stats', function(data) {
    updateStats(data);
    resetButtons();
  });



});