// Expandable directive. Elements will expand virtically to height: auto on click.
angular.module('person.expander', [])
.controller('ExpanderCtrl', ['$scope', function ($scope) {
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
    // set expander height back to normal
    expander.css({
      height: expander[0].getBoundingClientRect().height - expHeight + 'px',
    });

    // hide expandable content
    expandable.css({
      height: 0,
      opacity: 0,
      transition: 'none'
    });

    $scope.isExpanded = false;
  }

  ctrl.setExpandable = function (element) {
    expandable = element;

    // store the height for expanding later
    expHeight = element[0].getBoundingClientRect().height;

    // hide expandable content
    expandable.css({
      'height': 0,
      'opacity': 0,
    });
  };

  ctrl.setExpander = function (element) {
    // add a transition to the expander element
    element.css({
      transition: 'height .3s .05s',
      '-webkit-transition': 'height .3s .05s'
    });

    expander = element;
  }

}])
.directive('expander', [function () {
  return {
    restrict: 'A',
    scope: {},
    controller: 'ExpanderCtrl',
    link: function (scope, element, attrs, ExpanderCtrl) {
      ExpanderCtrl.setExpander(element);

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
}]);