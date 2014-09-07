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
    return $timeout(angular.noop, 650);
  }; // end playRoundAnimation(isWinner, questionEl)

  var increaseProgressBar = function (element, percentage) {
    element.css({
      width: percentage
    });
  }; // end increaseProgressBar(element, percentage)

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
      // var questionEl = angular.element(element.children()[3]); // ORIGINAL CODE ==> fourth child of containing element = question wrapper (see template)
      var questionEl = angular.element(document.querySelector('.question-wrapper')); // fourth child of containing element = question wrapper (see template)
      // var progressEl = angular.element(element.children()[2].children[0]); // ORIGINAL CODE ==> third child of containing element, then the first child 
      var progressEl = angular.element(document.querySelector('.progress-bar')); // third child of containing element, then the first child 

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

            if (!(scope.currentQuestion = nextQuestion)) { // if nextQuestion can't be assigned
              var caughtName = scope.roundHandler({ winner: true }); // Player has won! // Why do we need to pass an object???
              scope.updateScreenContents(questionEl, true, caughtName)
              .then( function() {
                increaseProgressBar(progressEl, 0);
              }).then( function() { // missing a delay before this executes.
                location.reload(); // THE MAGIC!!!!!!!!!!!!!!!
              });
            } // end if (player has won)
          } else { // not correct
            // save progressPercent for next time
            var escapedName = scope.roundHandler({ winner: false }); // Why do we need to pass an object???
            scope.updateScreenContents(questionEl, false, escapedName)
            .then( function() {
              increaseProgressBar(progressEl, 0);
            }).then( function() { // missing a delay before this executes.
              location.reload(); // THE MAGIC!!!!!!!!!!!!!!!
            });
          } // end else (not correct)

        }); // end playRoundAnimation().then()
      }; // end scope.submitAnswer(answer)


      scope.updateScreenContents = function(screenElement, didPlayerWin, name) {
        // var screenNotificationEl = angular.element(document.querySelector('.question-wrapper'));
        questionEl.empty();
        if (didPlayerWin) {
          questionEl.append('<h1>You caught ' + name + '!</h1>'); // data???
        } else { // player lost
          questionEl.append('<h1>' + name + ' got away!</h1>'); // data???
        }
        return $timeout(angular.noop, 1300);
      }; // end updateScreenContents(screenElement)

    } // end link(scope, element, attrs)
  }; // end return




}]); // end module().directive()
