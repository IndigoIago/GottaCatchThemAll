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



/*          MOSTLY-OFFICIAL USER TEMPLATE
  id = {
    id: 1234561,
    full_name:    'Douglas Crockford',
    first_name:   'Douglas',
    last_name:    'Crockford',
    email:        'd@g.com',
    gender:       'Male'
    photo:        './img/douglas_c.png',
    about:        'I invented JavaScript. Bow down to me.',
    questions: [
      { question: 'Do I like JavaScript?', answer: true},
      { question: 'I like incrementing numbers with "++"', answer: false},
      { question: 'Do I like incrementing numbers with "++"?', answer: false}
    ],
    pointValue:   0,
    visitedProfiles: {
      lastVisited: 1/1/14, // can make array
      status: 'collected', // or 'rejected' or 25%
    },
    collection: {
      // id: id
    },
    owners: {
      // id: id
    }
  };
*/
