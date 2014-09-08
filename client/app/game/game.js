// Contains controllers and router for gameification.
angular.module('catchem.game', ['catchem.services', 'game.profile']) // Load the service module as a dependancy
.controller('GameCtrl', ['$scope', 'Collection', function($scope, Collection) {

  /*****************
   * GAME LOGIC
   * Gameplay actions go here
   ****************/

  $scope.roundHandler = function(isWinner) {
    // for debugging
    if (isWinner) {
      console.log('You won!');
      console.log('$scope.aProfile=', $scope.aProfile);

      Collection.addProfile($scope.aProfile);
    } else {
      console.log('You lost :\'(');
    } // end if (isWinner)

    return $scope.aProfile.name; // send back name
  }; // end roundHandler()


  /*****************
   * GAMEPLAY FUNCTIONS
   ****************/
<<<<<<< HEAD
  var user1 = {
    name: 'Douglas Crockford',
    photo: './img/douglas_c.jpg',
    questions: [
      {question: 'Do I like JavaScript?', answer: true},
      {question: 'Did I invent the Javascripts?', answer: true},
      {question: 'Do I like incrementing numbers with "++"?', answer: false}
    ],
    pointValue: 1400
  };

  var user2 = {
    name: 'Charmander',
    photo: './img/char.png',
    questions: [{
      question: 'Do I like fire?',
      answer: true
    }, {
      question: 'Do I have issues with authority?',
      answer: true
    }],
    pointValue: 600
  };

  var user3 = {
    name: 'Squirtle',
    photo: './img/squirt.png',
    questions: [{
      question: 'Do I like water?',
      answer: true
    }, {
      question: 'Do I like sunglasses?',
      answer: true
    }],
    pointValue: 260
  };

  var user4 = {
    name: 'Bulbasaur',
    photo: './img/Bulb.jpg',
    questions: [{
      question: 'Do I like grass?',
      answer: true
    }, {
      question: 'Do I like fire?',
      answer: false
    }],
    pointValue: 30
  };



  var sampleUsers = {
    1234561: user1, // temporarily just testing with douglas 
    // 1234562: user2,
    // 1234563: user3,
    // 1234564: user4
  };
=======
>>>>>>> Refactor auth, login, game, svcs, user, and router to integrate modular User functions.

  $scope.getAProfile = function(options) {
    /*****************
     * TEMPORARY user profiles
     * replace sampleUsers with users in DB in query
     ****************/
    var user1 = {
      name: 'Douglas Crockford',
      photo: './img/douglas_c.png',
      questions: [
        {question: 'Do I like JavaScript?', answer: true},
        {question: 'Did I invent the Javascripts?', answer: true},
        {question: 'Do I like incrementing numbers with "++"?', answer: false}
      ],
      pointValue: 1400,
      id: 1234566
    };

    var user2 = {
      name: 'Charmander',
      photo: './img/char.png',
      questions: [{
        question: 'Do I like fire?',
        answer: true
      }, {
        question: 'Do I have issues with authority?',
        answer: true
      }],
      pointValue: 600,
      id: 1234567
    };

    var user3 = {
      name: 'Squirtle',
      photo: './img/squirt.png',
      questions: [{
        question: 'Do I like water?',
        answer: true
      }, {
        question: 'Do I like sunglasses?',
        answer: true
      }],
      pointValue: 260,
      id: 1234568
    };

    var user4 = {
      name: 'Bulbasaur',
      photo: './img/Bulb.jpg',
      questions: [{
        question: 'Do I like grass?',
        answer: true
      }, {
        question: 'Do I like fire?',
        answer: false
      }],
      pointValue: 30,
      id: 1234569
    };



    var sampleUsers = {
      1234561: user1,
      1234562: user2,
      1234563: user3,
      1234564: user4
    };

    /*****************
     * Get random profile
     ****************/

    // TODO: access profiles from DB...
    var dbUsers = function() { // Get the profile from DB
      var tempStorage = Collection.getDBProfiles(30);
      console.log('tempStorage', tempStorage);
      return Collection.getDBProfiles(30);
    }; // end dbUsers()


    var usersKeys = Object.keys(sampleUsers); // an array of sampleUser's keys. TODO: Replace with DB query
    // var usersKeys = Object.keys( dbUsers() ); // an array of sampleUser's keys. TODO: Replace with DB query
    var randUserKey = usersKeys[(Math.random() * usersKeys.length << 0)];
    var result = sampleUsers[randUserKey]; // result is one of the profiles.
    return result; // return profile
  }; // end getAProfile


  // Player gets profile
  $scope.playerGetsNewProfile = function (profile) { // check history with this profile
    var tempProfile = $scope.getAProfile();

    // var thisPlayer = db.find(_id);
    // var listOfViewedProfiles = db.find(thisPlayer.viewedProfiles);
    // var thisPlayersStatusForServedProfile = listOfViewedProfiles.profile._id;

    // if (thisPlayersStatusForServedProfile === 'undefined') { // never visited
    //   return tempProfile;
    // } else if (thisPlayersStatusForServedProfile === 'REJECTED' || thisPlayersStatusForServedProfile === 'COLLECTED') { // previously rejected
    //   // SERVE NEW PROFILE

    // } else { // in progress
    //   // CONTINUE GAME

    // }

    return tempProfile;  
  }; // end playerGetsNewProfile(profile)

  $scope.profileCollected = function() {
  }; // end profileCollection



<<<<<<< HEAD
var profileCollected = function() {
}; // end profileCollection
=======
  $scope.aProfile = $scope.playerGetsNewProfile();
}]); // end .controller()
>>>>>>> Refactor auth, login, game, svcs, user, and router to integrate modular User functions.
