// Services common across many modules
angular.module('catchem.services', [])

// Temp/placeholder User service.
.service('User', ['$rootScope', '$http', function ($rootScope, $http) {

  /***********
   * TODO: We should watch the User object...
   * Watching User Object for changes to populate DB
   * $rootScope.$watch(userObj, function (newVal, prevVal) {
   *   // POST req
   * });
   **********/


  /***********
   * Player properties accessible across many scopes
   **********/

  var self = this;
  var profileCollection = [];

  var player = {}; // logged in player's profile, PRIVATE in this scope


  /***************
   * Player Methods below
   * These should be invokable on any scope
   **************/
  self.retreivePlayerProfileFromDB = function() { // Get the profile from DB
    $http({
      url: '/playerProfile',
      method: 'GET'
    }) // end http()
    .then(function(response) { // Success
      console.log("Got profile!", response.data);
      player = response.data;
      // TODO: fix this elsewhere!
      if (!(player.collection)) { // if player has no collection object...
        player.collection = {}; // add blank object
      }
    }, // end (success)
    function(response) { // optional error handling
      console.log("Error retrieving player profile", response.data);
    }); // end then()
  }; // end retreivePlayerProfileFromDB()
  console.log('   !!! About to define player from db outside a specific function...');
  self.retreivePlayerProfileFromDB(); // define player by querying the db

  self.savePlayerProfileToDB = function() { // Save the profile to DB
    $http({
      url: '/playerProfile',
      method: 'POST',
      data: player
    }) // end http()
    .then(function(response) { // Success
      console.log("Saved player profile.");
      return true; // not really needed except for possible error handling
    },  // end (success)
    function(response) { // optional error handling
      console.log("Error saving player profile.", response.data);
      return false; // not really needed except for possible error handling
    }); // end then()
  }; // end savePlayerProfileToDB()

  self.getPersonalProfile = function() { // Getter for logged in player's profile
    return player;
  }; // end getPersonalProfile()

  // // Logged in user's profile
  // var personalProfile = {};
  self.setPersonalProfile = function(key, val) { // Setter for logged in player's profile
    player[key] = val;
    self.savePlayerProfileToDB(); // UPDATE db
  }; // end setPersonalProfile(key, val)


  // self.addProfileToCollection = function (profile) {
  //   profileCollection.push(profile);
  // };
  self.getProfileCollection = function () { // Getter for logged in player's collection
  console.log('player = ', player);
    return player.collection;
  }; // end getProfileCollection()

+  self.addProfileToCollection = function (capturedProfile) { // Setter to add to logged in player's collection
+    var capID = capturedProfile.id;
+    player.collection.capID = capID; // add this ID to the collection object
+    self.savePlayerProfileToDB(); // UPDATE db
+  }; // end addProfileToCollection(capturedProfile)











  // Getter and Setter for Logged in user's profile
  self.getPersonalProfile = function() {
    return personalProfile;
  };
  self.setPersonalProfile = function(key, val) {
    personalProfile[key] = val;
  };

  // Get the profile from DB
  self.retreivePersonalProfileFromDB = function() {
    $http({
      url: '/userprofile',
      method: 'GET'
    })
    .then(function(response) {
      // Success
      personalProfile = response.data;
      console.log("Got profile!", response.data);
    }, 
    function(response) { // optional
      // Error
      console.log("Error retrieving user profile");
    });
  };
  self.retreivePersonalProfileFromDB();

  // Save the profile to DB
  self.savePersonalProfileToDB = function() {
    $http({
      url: '/userprofile',
      method: 'POST',
      data: self.getPersonalProfile()
    })
    .then(function(response) {
      // Success
      console.log("Saved user profile.");
    }, 
    function(response) { // optional
      // Error
      console.log("Error saving user profile.");
    });
  };
}])

// Collection service for adding / retrieving a users' collection
.service('Collection', ['$rootScope', 'User', function ($rootScope, User) {
  var self = this;
  var profileCollection = User.getProfileCollection();

  self.addProfile = function (profile) {
    User.addProfileToCollection(profile);
  };

  self.getCollection = function () {
    return profileCollection;
  };
}]);
