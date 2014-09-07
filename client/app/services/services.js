// Services common across many modules
angular.module('catchem.services', [])

// Temp/placeholder User service.
.service('User', ['$rootScope', function ($rootScope) {
  var self = this;
  var profileCollection = [];

  // var player = self.getUserByID(/*FACEBOOK.ID*/); // using as a var keeps this private to 

  /***********
   * Watching User Object for changes to populate DB
   **********/
  // $rootScope.$watch(userObj, function (newVal, prevVal) {
  //   // POST req
  // });

  // $rootScope is accessible in any controller, service, factory, etc.
  // AVOID $rootScope.player = {}

  self.getUserByID = function(userID) { // TODO - refactor this so ID is optional?!?!?!?
    var urlString = '/query/profiles?' + userID;
    $http({
      method: 'GET',
      url: urlString
    }); // end http GET request passing JSON with id
    
  }; // end getUserByID(userID)

  self.addProfileToCollection = function (profile) {
    profileCollection.push(profile);
  };

  self.getProfileCollection = function () {
    return profileCollection;
  };



}])

// TODO: Refactor Collection service and remove altogether,
// replacing with User service.
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