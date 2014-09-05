// Expandable directive. Elements will expand virtically to height: auto on click.
angular.module('people.person', [])
.controller('ExpanderCtrl', ['$scope', function ($scope) {
  scope.isExpanded = false;

}])
.directive('expander', [function () {
  return {
    restrict: 'A',
    controller: ExpanderCtrl,
    link: function (scope, element, attrs) {

      element.on('click', function () {
        if ( scope.isExpanded ) {
          ExpanderCtrl.collapse();
        } else {
          ExpanderCtrl.expand();
        }
      });
    }
  };
}])
.directive('expandable', [function () {
  return {
    restrict: 'A',
    scope: true,
    require: 'expander',
    link: function (scope, element, attrs) {

    }
  };
}]);