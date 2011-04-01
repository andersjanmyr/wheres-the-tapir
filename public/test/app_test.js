$(function() {

    module("Sanity");
    test('A sanity test, should be green!', function() {
        same('sane', "sane", 'Setup is sane');
    });

    module('App');
    test('infoResult with correct data, should set the message!', function() {
        infoResult({is_correct: true, choice: 'stick'});
        equal($('#info-message').text, 'You stick and you are wrong!');
    });

});


