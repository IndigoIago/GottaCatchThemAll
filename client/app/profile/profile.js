// Contains profile module with profile directive and controller logic
angular.module('catchem.profile', ['catchem.services']) // Load the service module as a dependancy
.directive('profile', [function () {
  return {
    restrict: 'E',
    scope: {
      data: '='
    },
    templateUrl: 'app/profile/profile.html',
    replace: true,
    link: function (scope, iElement, iAttrs) {
      
    }
  };
}]);