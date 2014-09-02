// Contains profile module with profile directive and controller logic
angular.module('catchem.profile', ['catchem.services']) // Load the service module as a dependancy
.directive('profile', [function () {
  return {
    restrict: 'E',
    scope: {
      data: '=',
      roundHandler: '&'
    },
    templateUrl: 'app/profile/profile.html',
    replace: true,
    link: function (scope, iElement, iAttrs) {
      scope.currentQuestion = scope.data.questions[0];

      scope.submitAnswer = function (answer) {
        var result = answer === scope.currentQuestion.a;

        scope.roundHandler(result);
        // next round stuff goes here
      };
    }
  };
}]);