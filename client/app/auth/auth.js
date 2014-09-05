// Authorization module for persistent user access
// Load the service module as a dependancy

angular.module('catchem.auth', ['catchem.services'])
.factory('AuthFactory', function($http) {
  var user = {
    loggedIn: false
  };

  var isAuth = function () {
    return $http({
      method: 'GET',
      url: '/loggedin'
    });
  };

  return {
    user: user,
    isAuth: isAuth
  }
})
.controller('AuthController', function(AuthFactory, $scope, $window, $state, $http) {
  $scope.user = AuthFactory.user;

  $scope.FBlogout = function() {
    FB.logout(function(response) {
      // Remove web token
      $window.localStorage.removeItem('com.catchemall');

      // Person is now logged out
      AuthFactory.user.loggedIn = false;

      // Without this, the $scope doesn't update in the view
      $scope.$apply();

      statusChangeCallback(response);
    });
  }

  $scope.FBlogin = function() {
    FB.login(function(response) {
      // handle the response
      statusChangeCallback(response);
    }, {scope: 'public_profile, email, user_friends'});
  }

  $window.fbAsyncInit = function() {
    FB.init({
      appId      : '596181923827041',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.1' // use version 2.1
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  };
  
  // This is called with the results from FB.getLoginStatus().
  var statusChangeCallback = function(response) {
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      console.log('Please log into this app.');
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log('Please log into Facebook.');
    }
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  var testAPI = function() {
    // console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      // console.log('Response data: ', response);
      AuthFactory.user.full_name = response.name;
      AuthFactory.user.first_name = response.first_name;
      AuthFactory.user.last_name = response.last_name;
      AuthFactory.user.facebook_id = response.id;
      AuthFactory.user.gender = response.gender;
      AuthFactory.user.loggedIn = true;
      
      if (response.email) {
        AuthFactory.user.email = response.email;
      }

      /*
      Send to server:

      user = {
        full_name: full name,
        first_name: first name,
        last_name: last name,
        facebook_id: Facebook ID,
        email: email address,
        gender: gender
      }
      */

      $http({
        url: '/login',
        method: "POST",
        data: AuthFactory.user
      })
      .then(function(response) {
        // Success
        // console.log("Got token: ", response.data.token);
        $window.localStorage.setItem('com.catchemall', response.data.token);
      }, 
      function(response) { // optional
        // Error
      });

      // Without this, the $scope doesn't update in the view
      $scope.$apply();
    });
  }
});
