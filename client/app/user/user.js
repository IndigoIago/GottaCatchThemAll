angular.module('catchem.user', ['catchem.services'])
.factory("UserFactory", function(User){
  var myProfile = User.getPersonalProfile();

  var updateAbout = function(message) {
    User.setPersonalProfile("about", message);
    User.savePersonalProfileToDB();
    myProfile = User.getPersonalProfile();
  };

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
  }

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
    UserFactory.updateAbout($scope.myProfile.about);
  }

  $scope.addQuestion = function() {
    if (!$scope.question || !$scope.answer) {
      $scope.blank = true;
    } else {
      $scope.blank = false;
      UserFactory.addQuestion($scope.question, $scope.answer);
    }
  }
}]);



/*          MOSTLY-OFFICIAL USER TEMPLATE
  id = {
    facebook_id: 1234561,
    full_name:    'Douglas Crockford',
    first_name:   'Douglas',
    last_name:    'Crockford',
    email:        'd@g.com',
    gender:       'Male'
    photo:        './img/douglas_c.png',
    about:        'I invented JavaScript. Bow down to me.',
    questions: [
      { question: 'Do I like JavaScript?', answer: true},
      { question: 'I like incrementing numbers with "++"', answer: false},
      { question: 'Do I like incrementing numbers with "++"?', answer: false}
    ],
    pointValue:   0,
    visitedProfiles: {
      lastVisited: 1/1/14, // can make array
      status: 'collected', // or 'rejected' or 25%
    },
    collection: {
      // id: id
    },
    owners: {
      // id: id
    }
  };
*/
