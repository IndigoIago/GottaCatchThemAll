angular.module('catchem', [
  'catchem.auth',
  'catchem.game',
  'catchem.user',
  'catchem.services',
  'ui.router'
]) // this will remain barebones; it only loads modules.
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      // templateUrl: 'auth/login.html',
      // controller: 'AuthController'
    })
    .state('play', {
      url: '/play',
      templateUrl: 'app/game/game.html',
      controller: 'GameCtrl'
      // controller: 'GameController'
    });

  $urlRouterProvider.otherwise('/login');

});
