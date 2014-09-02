// Collection module
angular.module('collection.people', ['people.person'])
.directive('person', [function () {
  return {
    restrict: 'E',
    link: function (scope, element, attrs) {
      
    }
  };
}]);