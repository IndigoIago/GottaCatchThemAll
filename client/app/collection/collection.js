// Collection module - contains related modules for displaying the collection view
angular.module('catchem.collection', ['catchem.services', 'collection.people'])
.controller('CollectionCtrl', ['$scope', function ($scope) {
  $scope.peopleCollected = [
    {
      name: 'Tom',
      bio: 'asdasdasdasdasd'
    },
    {
      name: 'Jerry',
      bio: 'asdasdasdasd'
    }
  ];
}]);
