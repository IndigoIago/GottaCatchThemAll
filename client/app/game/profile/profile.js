// Contains profile module with profile directive and controller logic
angular.module('game.profile', []) // Load the service module as a dependancy
.directive('profile', ['$timeout', function ($timeout) {
  // return the first question in the list
  var questionHandler = function (questions) {
    return questions[0];
  };
  // simple animation for correct/incorrect answer
  var playRoundAnimation = function (isWinner, questionEl) {
    var bgColor;
    var indicatorImg;

    if ( isWinner ) {
      bgColor = '#d6e9c6';
      indicatorImg = '';
    } else {
      bgColor = '#ebccd1';
      indicatorImg = '';
    }

    questionEl.css({
      'background': bgColor,
      'opacity': '0.5'
    });

    // fade out the background shortly after it's applied (200ms)
    setTimeout( function () {
      questionEl.css({
        'transition': 'all .65s',
        'background': 'transparent',
        'opacity': '1'
      });
    }, 200);

    // return a $timeout promise to delay the next question from appearing
    return $timeout(angular.noop, 650); // 
  };

  var increaseProgressBar = function (element, percentage) {
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
      var questionEl = angular.element(element.children()[3]); // fourth child of containing element = question wrapper (see template)
      var progressEl = angular.element(element.children()[2].children[0]); // third child of containing element, then the first child 

      scope.currentQuestion = questionHandler(scope.data.questions);

      scope.submitAnswer = function (answer) {        
        var isCorrect = (answer === scope.currentQuestion.answer);

        playRoundAnimation(isCorrect, questionEl).then( function () {
          var nextQuestion;
          var progressPercent;

          if ( isCorrect ) {
            scope.data.questions = scope.data.questions.splice(1);
            nextQuestion = questionHandler(scope.data.questions);
            progressPercent = ((questionCount - scope.data.questions.length) / questionCount) * 100 + '%';

            increaseProgressBar(progressEl, progressPercent);
          } else {
            // notify game controller of round result
            scope.roundHandler({ winner: false });
          }

          if ( nextQuestion ) {
            scope.currentQuestion = nextQuestion;
          } else {
            // notify game controller of round result
            scope.roundHandler({ winner: true });
          }

        });
      };
    }
  };
}]);