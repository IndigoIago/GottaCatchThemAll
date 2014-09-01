// Contains controllers and router for gameification.

//TODO: Determine if game logic goes here

angular.module('catchem.game', ['catchem.services'])// Load the service module as a dependancy
.controller('GameCtrl', ['$scope', function ($scope) {
  $scope.aProfile = {
    name: {
      first: 'Douglas',
      last: 'Crockford'
    }
  };
  
}]); 