// Person module - contains Person directives for displaying single-person views
angular.module('people.person', [])
.directive('person', [function () {
  return {
    restrict: 'E',
    link: function (scope, element, attrs) {
      
    }
  };
}]);