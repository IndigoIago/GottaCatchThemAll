// Services common across many modules
angular.module('catchem.menu', ['ui.router', 'catchem.auth'])
.controller('MenuCtrl', ['$scope', '$injector', 'AuthFactory', function ($scope, $injector, AuthFactory) {

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

  $scope.FBlogout = AuthFactory.FBlogout;
}]);