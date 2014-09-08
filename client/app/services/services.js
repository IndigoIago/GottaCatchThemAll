// Services common across many modules
angular.module('catchem.services', [])

// User service for manipulating the current player's data
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

  self.setPersonalProfile = function(key, val) { // Setter for logged in player's profile
    player[key] = val;
    self.savePlayerProfileToDB(); // UPDATE db
  }; // end setPersonalProfile(key, val)

  self.getProfileCollection = function () { // Getter for logged in player's collection
  console.log('player = ', player);
    return player.collection;
  }; // end getProfileCollection()

  self.addProfileToCollection = function (capturedProfile) { // Setter to add to logged in player's collection
    var capID = capturedProfile.id;
    player.collection.capID = capID; // add this ID to the collection object
    self.savePlayerProfileToDB(); // UPDATE db
  }; // end addProfileToCollection(capturedProfile)

  self.getProfilesFromDB = function (numOfProfilesToGet) { // Getter for a bunch of profiles from DB
    var urlString = '/query/profiles?';
    if (numOfProfilesToGet) urlString += numOfProfilesToGet;
    $http({
      url: urlString, // '/query/profiles?20',
      method: 'GET'
    }) // end http()
    .then(function(response) { // Success
      console.log("Got profiles:", response.data);
      return response.data;
    }, // end (success)
    function(response) { // optional error handling
      console.log("Error retrieving profiles", response.data);
    }); // end then()
  }; // end getProfilesFromDB()

  /*************     NOTE: Not yet functional!     ****************
  self.getUserByID = function(userID) { // TODO - refactor this so ID is optional?!?!?!?
    var urlString = '/query/id?' + userID;
    $http({
      url: urlString,
      method: 'GET'
    }) // end http GET request passing JSON with id
    .then(function(response) { // Success
      console.log("Got profile!", response.data);
      return response.data; // return the user with this id
    }, // end (success)
    function(response) { // optional error handling
      console.log("Error retrieving player profile", response.data);
    }); // end then()
  }; // end getUserByID(userID)

  self.updateUserByID = function(userID, jsonObjToUpdate) { // TODO - refactor this so ID is optional?!?!?!?
    var urlString = '/query/id?' + userID;
    $http({
      url: urlString,
      method: 'POST',
      data: jsonObjToUpdate
    }) // end http POST request passing JSON with id
    .then(function(response) { // Success
      console.log("Got profile!", response.data);
      return true; // not really needed except for possible error handling
    }, // end (success)
    function(response) { // optional error handling
      console.log("Error saving player profile.", response.data);
      return false; // not really needed except for possible error handling
    }); // end then()
  }; // end getUserByID(userID)
  *****************************************************/
}]) // end .service(User)

// TODO: REMOVE this block as per discussion with Jim and refactor elsewhere --- Aaron
// Collection service for adding / retrieving a players' collection
.service('Collection', ['$rootScope', 'User', function ($rootScope, User) {
  var self = this;
  var profileCollection = User.getProfileCollection();

  self.addProfile = function (capturedProfile) {
    User.addProfileToCollection(capturedProfile);
  }; // end addProfile(profile)

  self.getCollection = function (playerProfile) {
    
    return User.getProfileCollection(profile);
  }; // end getCollection()

  self.getDBProfiles = function(numOfProfiles) {
    return User.getProfilesFromDB(numOfProfiles);
  }
}]); // end .service(Collection)