// Contains profile module with profile directive and controller logic
angular.module('catchem.profile', ['catchem.services']) // Load the service module as a dependancy
.directive('profile', ['$timeout', function ($timeout) {

  var questionHandler = function (questions) {
    return questions[0];
  };

  var playRoundAnimation = function (isWinner, questionEl) {
    var bgColor;
    var indicatorImg;

    if ( isWinner ) {
      bgColor = '#d6e9c6';
      indicatorImg = '../img/winner.svg';
    } else {
      bgColor = '#ebccd1';
      indicatorImg = '../img/looser.svg';
    }

    questionEl.css({
      'background': bgColor,
      'opacity': '0.5'
    });

    setTimeout( function () {
      questionEl.css({
        'transition': 'all 1.6s',
        'background': 'transparent',
        'opacity': '1'
      });
    }, 200);

    return $timeout(angular.noop, 1600); // 1.6 second delay
  };

  return {
    restrict: 'E',
    scope: {
      data: '=',
      roundHandler: '&'
    },
    templateUrl: 'app/profile/profile.html',
    replace: true,
    link: function (scope, element, attrs) {
      var questionEl = angular.element(element.children()[3]); // fourth child of containing element = question wrapper (see template)

      scope.currentQuestion = questionHandler(scope.data.questions);

      scope.submitAnswer = function (answer) {        
        var isWinner = (answer === scope.currentQuestion.answer);

        // notify game controller of round result
        scope.roundHandler({ winner: isWinner });

        playRoundAnimation(isWinner, questionEl).then( function () {
          // set next question
          scope.currentQuestion = questionHandler(scope.data.questions.splice(1));          
        });
      };
    }
  };
}]);