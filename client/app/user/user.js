angular.module('catchem.user', ['catchem.services'])
.factory("UserFactory", function(User){
  var myProfile = User.getPersonalProfile();
  var updateAbout = function(message) {
    User.setPersonalProfile("about", message);
    User.savePersonalProfileToDB();
    myProfile = User.getPersonalProfile();
  }; // end updateAbout(message)

  var addQuestion = function(question, answer) {
    if (!myProfile.questions) {
      myProfile.questions = [];
    }

    myProfile.questions.push({
      question: question,
      answer: answer
    });

    User.setPersonalProfile("questions", myProfile.questions);

    User.savePersonalProfileToDB();
  }; // end addQuestion(question, answer)

  return {
    updateAbout: updateAbout,
    myProfile: myProfile,
    addQuestion: addQuestion
  }
})
.controller('UserController', ['$scope', 'User', 'UserFactory', function($scope, User, UserFactory) {
  // Is the question and answer input empty?
  $scope.blank = false;

  $scope.myProfile = UserFactory.myProfile;

  $scope.updateAbout = function() {
    UserFactory.updateAbout($scope.about);
  }

  $scope.addQuestion = function() {
    if (!$scope.question || !$scope.answer) {
      $scope.blank = true;
    } else {
      $scope.blank = false;
      UserFactory.addQuestion($scope.question, $scope.answer);
    }
  }



  $scope.makeConformantProfileObject = function(user) {
    if (user.pointValue > 0) { // this is already conformant
      return user;
    } // end if (is already conformant)

    var thisUser = getNewUserTemplate(); // get an empty user/profile template object

    thisUser.id         = user.id;
    thisUser.full_name  = user.full_name
    thisUser.first_name = user.first_name
    thisUser.last_name  = user.last_name
    thisUser.email      = user.email
    thisUser.gender     = user.gender
    if (user.photo) {
      thisUser.photo    = user.photo; // use existing photo, which must have been granted by FB API?
    } else { // generate avatar for player
      thisUser.photo    = './img/user_icon' + thisUser.gender.charAt(0) + (id%5) + '.png'; // generate random avatar
    } // end if (photo)
    thisUser.about      = 'I\'m brand new here. But I\'m here, so I have great taste!';
    thisUser.pointValue = 1; // first one's free. :-D
    // thisUser.questions  =      // Not needed, empty object is fine.
    // thisUser.collection =      // Not needed, empty object is fine.
    // thisUser.owners     =      // Not needed, empty object is fine.
    // thisUser.visitedProfiles = // Not needed, empty object is fine.

    return thisUser; // return the conformant profile object
  }; // end makeConformantProfileObject(user)







}]); // end UserController controller
