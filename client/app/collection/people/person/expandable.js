// Expandable directive. Elements will expand virtically to height: auto on click.
angular.module('person.expander', [])
// .controller('ExpanderCtrl', ['$scope', ])
.directive('expander', [function () {
  return {
    restrict: 'A',
    controller: function ($scope) {
      var ctrl = this;
      var expandable;
      console.log('init')
      $scope.isExpanded = false;


      $scope.expand = function () {
        expandable.css({
          height: 'auto',
          'opacity': 1
        });
      }

      $scope.collapse = function () {
        expandable.css({
          height: 0
        });
      }

      $scope.setExpandable = function (element) {
        expandable = element;
        expandable.css({
          'height': 0,
          'opacity': 0
        });
        // expandable.height = element[0].getBoundingRect().height;
      };
    },
    link: function (scope, element, attrs, ExpanderCtrl) {

      element.on('click', function () {
        console.log(click, scope.isExpanded);
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
    require: '^expander',
    link: function (scope, element, attrs, ExpanderCtrl) {
      ExpanderCtrl.setExpandable(element);
    }
  };
}]);;