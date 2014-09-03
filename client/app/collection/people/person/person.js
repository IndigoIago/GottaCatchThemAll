// Person module - contains Person directives for displaying single-person views
angular.module('people.person', [])
.directive('person', [function () {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    templateUrl: 'app/collection/people/person/person.html',
    link: function (scope, element, attrs) {
    }
  };
}]);