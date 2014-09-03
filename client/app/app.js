angular.module('catchem', [
  'catchem.auth',
  'catchem.game',
  'catchem.user',
  'catchem.collection',
  'catchem.services',
  'ui.router'
]) // this will remain barebones; it only loads modules.
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .state('usersetup', {
      url: '/usersetup',
      templateUrl: 'app/user/profilesetup.html',
      controller: 'UserController'
    })
    .state('play', {
      url: '/play',
      templateUrl: 'app/game/game.html',
      controller: 'GameCtrl'
    })
    .state('collection', {
      url: '/collection',
      templateUrl: 'app/collection/collection.html',
      controller: 'CollectionCtrl'
    });

  $urlRouterProvider.otherwise('/login');

});
