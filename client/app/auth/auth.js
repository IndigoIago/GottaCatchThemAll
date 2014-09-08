// Authorization module for persistent user access
// Load the service module as a dependancy

angular.module('catchem.auth', ['catchem.services'])
.factory('AuthFactory', function($http, $state, $window, User) {
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

  var isAuth = function () {
    return $http({
      method: 'GET',
      url: '/loggedin'
    });
  };

  var FBlogout = function() {
    FB.logout(function(response) {
      // Remove web token
      $window.localStorage.removeItem('com.catchemall');

      // Person is now logged out
      // user = {};
      User.setPersonalProfile("loggedIn", false);

      // Without this, the $scope doesn't update in the view
      // $scope.$apply();

      // Redirect to logout screen
      $state.go('logout');

      // statusChangeCallback(response);
    });
  };

  var FBlogin = function() {
    FB.login(function(response) {
      // handle the response
      statusChangeCallback(response);
    }, {scope: 'public_profile, email, user_friends'});
  }

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


    var thisUser = {};

    User.setPersonalProfile("id", response.id); // populate player with id
    var retrievedPlayer = User.retreivePlayerProfileFromDB(); // get user profile from DB

    if (!retrievedPlayer) { // if player is not in DB
      thisUser.full_name  = response.full_name;
      thisUser.first_name = response.first_name;
      thisUser.last_name  = response.last_name;
      thisUser.email      = response.email || "none@non.com";
      thisUser.gender     = response.gender;
      thisUser.photo      = './img/user_icon.png';
      thisUser.about      = 'I\'m brand new here. But I\'m here, so I have great taste!';
      thisUser.pointValue = 1; // first one's free. :-D
      thisUser.collection = {};     // Not needed, empty object is fine.
      // thisUser.questions  =      // Not needed, empty object is fine.
      // thisUser.owners     =      // Not needed, empty object is fine.
      // thisUser.visitedProfiles = // Not needed, empty object is fine.
      thisUser.loggedIn = true;
    } else { // player is in DB
      thisUser = User.getPersonalProfile(); // get this profile
      thisUser.loggedIn = true;
    } // end if (player is in DB)


    User.setFullPlayerProfile(thisUser);
    // return thisUser; // return the conformant profile object



      // // console.log('Response data: ', response);
      // User.setPersonalProfile("full_name", response.name);
      // User.setPersonalProfile("first_name", response.first_name);
      // User.setPersonalProfile("last_name", response.last_name);
      // User.setPersonalProfile("facebook_id", response.id);
      // User.setPersonalProfile("gender", response.gender);
      // User.setPersonalProfile("loggedIn", true);
      
      // if (response.email) {
      //   User.setPersonalProfile("email", response.email);
      // }

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
        method: 'POST',
        // data: User.getPersonalProfile()
        data: thisUser
      })
      .then(function(response) {
        // Success
        // console.log("Got token: ", response.data.token);

        // Set web token
        $window.localStorage.setItem('com.catchemall', response.data.token);

        // Redirect to menu screen
        $state.go('menu');
      }, 
      function(response) { // optional
        // Error
      });
    });
  }

  return {
    user: User.getPersonalProfile(),
    isAuth: isAuth,
    FBlogin: FBlogin,
    FBlogout: FBlogout,
    statusChangeCallback: statusChangeCallback,
    testAPI: testAPI,
    // fbAsyncInit: fbAsyncInit
  }
})
.controller('AuthController', function(AuthFactory, $scope) {
  $scope.user = AuthFactory.user;
  $scope.FBlogout = AuthFactory.FBlogout;
  $scope.FBlogin = AuthFactory.FBlogin;
});
