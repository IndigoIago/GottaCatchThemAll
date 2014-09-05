// Contains controllers and router for gameification.
angular.module('catchem.game', ['catchem.services', 'game.profile']) // Load the service module as a dependancy
.controller('GameCtrl', ['$scope', 'Collection', function($scope, Collection) {

    /*****************
     * GAME LOGIC
     * Gameplay actions go here
     ****************/
    $scope.aProfile = getAProfile();

    $scope.roundHandler = function(isWinner) {
      // for debugging
      isWinner ? console.log('You won!') : console.log('You lost :(');

      if (isWinner) {
        Collection.addProfile($scope.aProfile)
      }
    }; // end roundHandler()
  } // end controller callback()
]); // end .controller()



/*****************
 * GAMEPLAY FUNCTIONS
 ****************/
var getAProfile = function(options) {
  /*****************
   * TEMPORARY user profiles
   * replace sampleUsers with users in DB in query
   ****************/
  var user1 = {
    name: 'Douglas Crockford',
    photo: './img/douglas_c.png',
    questions: [
      {question: 'Do I like JavaScript?', answer: true},
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
    1234561: user1,
    1234562: user2,
    1234563: user3,
    1234564: user4
  };

  /*****************
   * Get random profile
   ****************/

  // TODO: access profiles from DB...
  var usersKeys = Object.keys(sampleUsers); // an array of sampleUser's keys. TODO: Replace with DB query
  console.log('usersKeys =', usersKeys);

  var randUserKey = usersKeys[(Math.random() * usersKeys.length << 0)];
  console.log('randUserKey =', randUserKey);

  var result = sampleUsers[randUserKey]; // result is one of the profiles.
  console.log('result =', result);
  return result; // return profile
}; // end getAProfile


/*         Next step...
  // Player gets profile
  $scope.playerGetsNewProfile = function (profile) { // check history with this profile
    var thisPlayer = db.find(_id);
    var listOfViewedProfiles = db.find(thisPlayer.viewedProfiles);
    var thisPlayersStatusForServedProfile = listOfViewedProfiles.profile._id;

    if (thisPlayersStatusForServedProfile === 'undefined') { // never visited
      // PLAY GAME!
    } else if (thisPlayersStatusForServedProfile === 'REJECTED' || thisPlayersStatusForServedProfile === 'COLLECTED') { // previously rejected
      // SERVE NEW PROFILE

    } else { // in progress
      // CONTINUE GAME

    }

    // 
  }; // end playerGetsNewProfile(profile)
*/
