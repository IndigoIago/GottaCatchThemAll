// Services common across many modules
angular.module('catchem.services', [])

// Temp/placeholder User service.
.service('User', ['$rootScope', '$http', function ($rootScope, $http) {
  var self = this;
  var profileCollection = [];

  // Logged in user's profile
  var personalProfile = {};

  self.addProfileToCollection = function (profile) {
    profileCollection.push(profile);
  };

  self.getProfileCollection = function () {
    return profileCollection;
  };

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
