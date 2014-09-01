// Contains controllers and router for gameification.

//TODO: Determine if game logic goes here

angular.module('catchem.game', ['catchem.services']); // Load the service module as a dependancy
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('play', {
      url: '/play',
      // templateUrl: 'app/game/game.html',
      // controller: 'GameController'
    });

  $urlRouterProvider.otherwise('/signin');

});
