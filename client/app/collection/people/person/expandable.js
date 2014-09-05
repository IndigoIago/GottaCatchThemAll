// Expandable directive. Elements will expand virtically to height: auto on click.
angular.module('person.expander', [])
// .controller('ExpanderCtrl', ['$scope', ])
.directive('expander', [function () {
  return {
    restrict: 'A',
    scope: {},
    controller: function ($scope) {
      var ctrl = this;
      var expandable;
      var expander;
      var expHeight;

      $scope.isExpanded = false;


      ctrl.expand = function () {
        // set expander height
        expander.css({
          height: expander[0].getBoundingClientRect().height + expHeight + 'px',
        });

        // set expandable opacity
        expandable.css({
          opacity: 1,
          'transition': 'opacity .25s .2s'
        });

        $scope.isExpanded = true;
      }

      ctrl.collapse = function () {

        expander.css({
          height: expander[0].getBoundingClientRect().height - expHeight + 'px',
        });

        expandable.css({
          height: 0,
          opacity: 0,
          transition: 'none'
        }).then();

        $scope.isExpanded = false;
      }

      ctrl.setExpandable = function (element) {
        expandable = element;
        expHeight = element[0].getBoundingClientRect().height;

        expandable.css({
          'height': 0,
          'opacity': 0,
        });
        // expandable.height = element[0].getBoundingRect().height;
      };

      ctrl.setExpander = function (element) {
        expander = element;
      }

    },
    link: function (scope, element, attrs, ExpanderCtrl) {
      ExpanderCtrl.setExpander(element);

      element.css({
        transition: 'height .3s .05s ease',
      });

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
    scope: {},
    require: '^expander',
    link: function (scope, element, attrs, ExpanderCtrl) {
      ExpanderCtrl.setExpandable(element);
    }
  };
}]);;