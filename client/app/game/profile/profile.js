// Contains profile module with profile directive and controller logic
angular.module('game.profile', []) // Load the service module as a dependancy
.directive('profile', ['$timeout', function ($timeout) {

  // helper to set progress bar percentage
  var increaseProgressBar = function (element, questionCount, questionsRemaining) {
    var percentage = ((questionCount - questionsRemaining) / questionCount) * 100 + '%';
    
    element.css({
      width: percentage
    });
  };

  // helper to blur photos
  var setPhotoBlur = function (photo, amount) {
    photo.css({
      '-webkit-filter': 'blur(' + amount + 'px)',
    });
  };

  return {
    restrict: 'E',
    scope: {
      data: '=',
      roundHandler: '&'
    },
    templateUrl: 'app/game/profile/profile.html',
    replace: true,
    link: function (scope, element, attrs) {
      var questionCount = scope.data.questions.length;
      var questions = scope.data.questions;
      var questionEl = angular.element(document.querySelector('.question'));
      var progressEl = angular.element(document.querySelector('.progress-bar'));
      var photo = angular.element(document.querySelector('.photo')).find('img');

      // get first question from questions list
      scope.currentQuestion = questions.shift();

      // set initial photo blur
      // Formula = 4 (arbitrary base blur amount) multiplied by the amount of questions
      setPhotoBlur(photo, (4 * questionCount));

      scope.submitAnswer = function (answer) {
        var isCorrect = (answer === scope.currentQuestion.answer);

        if ( isCorrect ) {
          if ( !questions.length ) {
            // set winning text
            questionEl.text('You captured ' + scope.data.name + '!');

            // invoke round handler with result
            scope.roundHandler({ winner: true });
          }

          // increase progress bar
          increaseProgressBar(progressEl, questionCount, questions.length);

          // update photo blur
          setPhotoBlur(photo, (4 * questions.length));

          // set next question
          scope.currentQuestion = questions.shift();

        } else {  
          // make progress bar red
          progressEl.css({
            transition: 'none',
            width: '100%',
            background: '#d9534f'
          });

          // set loosing text
          questionEl.text(scope.data.name + ' has escaped :(');

          // invoke round handler with result
          scope.roundHandler({ winner: false} ); 
        }
      }; 

    }
  };

}]);
