// Authorization module for persistent user access
// Load the service module as a dependancy
angular.module('catchem.auth', ['catchem.services'])
.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      // templateUrl: 'app/auth/login.html',
      // controller: 'AuthController'
    });

  $urlRouterProvider.otherwise('/login');

});
