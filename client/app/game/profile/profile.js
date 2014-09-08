// Contains profile module with profile directive and controller logic
angular.module('game.profile', []) // Load the service module as a dependancy
.directive('profile', ['$timeout', function ($timeout) {
  var questionCount;
  var questions;
  var questionEl;
  var progressEl;
  var photo;

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
      questionCount = scope.data.questions.length;
      questions = scope.data.questions;
      questionEl = angular.element(document.querySelector('.question'));
      progressEl = angular.element(document.querySelector('.progress-bar'));
      photo = angular.element(document.querySelector('.photo')).find('img');

      var initializeDisplay = function () {
        scope.currentQuestion = questions.shift();
        // Formula = 4 (arbitrary base blur amount) multiplied by the amount of questions
        setPhotoBlur(photo, (4 * questionCount)); 
      };

      initializeDisplay();

      scope.submitAnswer = function (answer) {
        var isCorrect = (answer === scope.currentQuestion.answer);

        if ( isCorrect ) {
          if ( !questions.length ) {
            // set winning text
            questionEl.text('You captured ' + scope.data.name + '!');

            // invoke round handler with result
            setTimeout( function () {
              questionEl.text('')
              progressEl.css({
                transition: 'none',
                width: 0
              });
              scope.roundHandler({ winner: true });
              initializeDisplay()
            }, 1300)

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
