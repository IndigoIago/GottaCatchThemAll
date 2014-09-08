angular.module('catchem', [
  'catchem.auth',
  'catchem.game',
  'catchem.user',
  'catchem.menu',
  'catchem.collection',
  'catchem.services',
  'ui.router',
  'ngMorph'
]) // this will remain barebones; it only loads modules.
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'app/auth/login.html',
      controller: 'AuthController'
    })
    .state('logout', {
      url: '/logout',
      templateUrl: 'app/auth/logout.html',
      controller: 'AuthController'
    })
    .state('usersetup', {
      url: '/usersetup',
      templateUrl: 'app/user/profilesetup.html',
      controller: 'UserController'
    })
    .state('collection', {
      url: '/collection',
      templateUrl: 'app/collection/collection.html',
      controller: 'CollectionCtrl'
    })
    .state('menu', {
      url: '/menu',
      templateUrl: 'app/menu/menu.html',
      controller: 'MenuCtrl',
    });

  $urlRouterProvider.otherwise('/login');
  // We add our $httpInterceptor into the array
  // of interceptors. Think of it like middleware for your ajax calls
  // [interceptors](https://github.com/angular/angular.js/blob/master/src/ng/http.js#L337)
  $httpProvider.interceptors.push('AttatchTokens')
}])
//////////////////////////////////////////////
// Code below from Shortly-Angular-Solution //
//////////////////////////////////////////////

// We use ng's `$window` to maintain testability - we can easilly mock $window
.factory('AttatchTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (config) {
      // [localStorage](http://mdn.io/Storage#localStorage)
      var jwt = $window.localStorage.getItem('com.catchemall');
      if (jwt) {
        config.headers['x-access-token'] = jwt;
      }
      config.headers['Allow-Control-Allow-Origin'] = '*';
      return config;
    }
  };
  return attach;
})
.run(function ($rootScope, $state, AuthFactory) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$stateChangeStart', function (evt, next, current) {
    if (next.controller && next.controller !== 'AuthController') {
      AuthFactory.isAuth()
        .catch(function () {
          $state.go('login');
        });
    }
  });
});