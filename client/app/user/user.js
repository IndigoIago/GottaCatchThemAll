angular.module('catchem.user', ['catchem.services'])
.controller('UserController', ['$scope', function($scope) {
  $scope.aProfile = {
    name: 'Douglas Crockford',
    photo: './img/douglas_c.png',
    about: 'I invented JavaScript. Bow down to me.',
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
}]);
