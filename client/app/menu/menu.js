// Services common across many modules
angular.module('catchem.menu', ['ui.router', 'catchem.auth'])
.controller('MenuCtrl', ['$scope', '$injector', 'AuthFactory', function ($scope, $injector, AuthFactory) {

  // morph config
  $scope.morph = {};

  $scope.morph.setup = {
    closeEl: '.back',
    overlay: {
      templateUrl: 'app/user/profilesetup.html'
    }
  };

  $scope.morph.play = {
    closeEl: '.back',
    overlay: {
      templateUrl: 'app/game/game.html'
    } 
  };

  $scope.morph.collection = {
    closeEl: '.back',
    overlay: {
      templateUrl: 'app/collection/collection.html'
    }
  };

  $scope.FBlogout = AuthFactory.FBlogout;
}]);