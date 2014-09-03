// People module - contains People directive for listing collected people
angular.module('collection.people', ['people.person'])
.directive('peopleList', [function () {
  return {
    restrict: 'E',
    scope: {
      people: '='
    },
    templateUrl: 'app/collection/people/people.html',
    link: function (scope, element, attrs) {
    
    }
  };
}]);