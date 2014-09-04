// Services common across many modules
angular.module('catchem.services', [])
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
