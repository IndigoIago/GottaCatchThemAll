// Services common across many modules
angular.module('catchem.menu', ['ui.router'])
.controller('MenuCtrl', ['$scope', '$injector', function ($scope, $injector) {

  // morph config
  $scope.morph = {};

  $scope.morph.setup = {
    closeEl: '.close',
    overlay: {
      templateUrl: 'app/user/profilesetup.html'
    }
  };

  $scope.morph.play = {
    closeEl: '.close',
    overlay: {
      templateUrl: 'app/game/game.html'
    } 
  };

  $scope.morph.collection = {
    closeEl: '.close',
    overlay: {
      templateUrl: 'app/collection/collection.html'
    }
  };

}]);