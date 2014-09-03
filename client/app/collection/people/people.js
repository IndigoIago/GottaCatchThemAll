// People module - contains People directive for listing collected people
angular.module('collection.people', ['people.person'])
.directive('people', [function () {
  return {
    restrict: 'E',
    link: function (scope, element, attrs) {
      
    }
  };
}]);