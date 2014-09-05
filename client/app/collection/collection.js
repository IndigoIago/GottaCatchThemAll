// Collection module - contains related modules for displaying the collection view
angular.module('catchem.collection', ['catchem.services', 'collection.people'])
.controller('CollectionCtrl', ['$scope', 'Collection', function ($scope, Collection) {
  // $scope.peopleCollected = Collection.getCollection();
  $scope.peopleCollected = [{
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
    }]
}]);