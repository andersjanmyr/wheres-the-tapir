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

  $.getJSON('/stats', function(data) {
    updateStats(data);
  });

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
      .attr('data-id');
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
    var value = $(this).attr('data-id');
    postStickOrSwitch(value);
  });

  function postStickOrSwitch(value) {
    var door = (value == 'stick')
      ? $('#doors li.selected').attr('data-id')
      : $('#doors li.enabled').attr('data-id');
    $.ajax({
      type: 'POST',
      dataType: 'json',
      url: '/stats/' + currentToken + '/' + value + '/' + door,
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
    if (data.stick_or_switch == 'stick' && data.correct
      || data.stick_or_switch == 'switch' && !data.correct)
      imageClass = 'tapir-selected';
    $('#door-' + data.answer)
      .removeClass('selected enabled removed')
      .addClass(imageClass);
  }
  function infoResult(data) {
    var right_or_wrong = data.correct ? ' right!' : ' wrong!';
    var message =
      (data.stick_or_switch == 'stick'
        ? 'You stick, and you are'
        : 'You switch and you are')
      + right_or_wrong;
    info(message);
  }

  function updateStats(data) {
    updateStat('stick', data);
    updateStat('switch', data);
  }

  function updateStat(kind, data) {
    var arr = data[kind];
    var percentage = 0;
    if (arr[1] > 0)
      percentage = parseInt(arr[0] / arr[1] * 100);
    $('#' + kind + '-count').text(arr[0] + '/' + arr[1] + ' = ' + percentage + '%');
  }

  function resetButtons() {
    $('#start').removeAttr('disabled');
    $('#stick-switch button').attr('disabled', 'disabled');
  }


});