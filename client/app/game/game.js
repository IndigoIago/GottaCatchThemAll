// Contains controllers and router for gameification.

//TODO: Determine if game logic goes here

angular.module('catchem.game', ['catchem.services', 'catchem.profile'])// Load the service module as a dependancy
.controller('GameCtrl', ['$scope', function ($scope) {
  $scope.aProfile = {
    name: 'Douglas Crockford',
    photo: './img/douglas_c.png',
    questions: [
      { q: 'Do I like JavaScript?',
        a: true
      },
      { q: 'I like incrementing numbers with "++"',
        a: false
      }
    ]
  };

  $scope.$on('roundFinished', function (result) {
    console.log(result);
  });

}]); 