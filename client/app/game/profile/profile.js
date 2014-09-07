// Contains profile module with profile directive and controller logic
angular.module('game.profile', []) // Load the service module as a dependancy
.directive('profile', ['$timeout', function ($timeout) {

  var increaseProgressBar = function (element, questionCount, questionsRemaining) {
    var percentage = ((questionCount - questionsRemaining) / questionCount) * 100 + '%';
    
    element.css({
      width: percentage
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
      var questionEl = angular.element(document.querySelector('.question')); // fourth child of containing element = question wrapper (see template)
      var progressEl = angular.element(document.querySelector('.progress-bar')); // third child of containing element, then the first child 

      scope.currentQuestion = questions.shift();

      scope.submitAnswer = function (answer) {
        var isCorrect = (answer === scope.currentQuestion.answer);

        if ( isCorrect ) {
          if ( !questions.length ) {
            questionEl.text('You captured ' + scope.data.name + '!');
            scope.roundHandler({ winner: true });
          }
          increaseProgressBar(progressEl, questionCount, questions.length);
          scope.currentQuestion = questions.shift();

        } else {
          progressEl.css({
            transition: 'none',
            width: '100%',
            background: '#d9534f'
          });
          questionEl.text(scope.data.name + ' has escaped :(');
          scope.roundHandler({ winner: false} ); 
        }
      }; 

    }
  };




}]);
