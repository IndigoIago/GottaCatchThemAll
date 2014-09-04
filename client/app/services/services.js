// Services common across many modules
angular.module('catchem.services', [])

// Temp/placeholder User service.
.service('User', ['$rootScope', function ($rootScope) {
  var self = this;
  var profileCollection = [];

  self.addProfileToCollection = function (profile) {
    profileCollection.push(profile);
  };

  self.getProfileCollection = function () {
    return profileCollection;
  }
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
