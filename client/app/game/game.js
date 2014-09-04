// Contains controllers and router for gameification.

//TODO: Determine if game logic goes here


angular.module('catchem.game', ['catchem.services', 'game.profile'])// Load the service module as a dependancy
.controller('GameCtrl', ['$scope', function ($scope) {
  $scope.aProfile = {
    name: 'Douglas Crockford',
    photo: './img/douglas_c.png',
    questions: [
      { question: 'Do I like JavaScript?',
        answer: true
      },
      { question: 'I like incrementing numbers with "++"',
        answer: false
      }
    ],
    pointValue: 1400
  };

  $scope.roundHandler = function (isWinner) {
    // for debugging
    isWinner ? console.log('You won!') : console.log('You lost :(');

    if ( isWinner ) {
      Collection.addProfile($scope.aProfile)
    }
  };

}]); 
