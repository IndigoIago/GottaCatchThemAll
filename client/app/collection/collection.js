// Collection module - contains related modules for displaying the collection view
angular.module('catchem.collection', ['catchem.services', 'collection.people'])
.controller('CollectionCtrl', ['$scope', 'Collection', function ($scope, Collection) {
  $scope.peopleCollected = Collection.getCollection();
}]);