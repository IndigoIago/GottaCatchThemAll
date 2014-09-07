angular.module('catchem.user', ['catchem.services'])
.controller('UserController', ['$scope', function($scope) {

  $scope.aProfile = { // SAMPLE USER!
    // TODO: Can this be removed???
    name: 'Douglas Crockford',
    photo: './img/douglas_c.png',
    about: 'I invented JavaScript. Bow down to me.',
    questions: [
      { question: 'Do I like JavaScript?',
        answer: true
      },
      { question: 'I like incrementing numbers with "++"',
        answer: false
      }
    ],
    pointValue: 1400
  }; // end $scope.aProfile


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
 





  var getNewUserTemplate = function() {
    /*****************
     * This is the DATABASE-CONFORMANT USER/PROFILE OBJECT.
     * Generating an empty version is not necessary here,
     * but it's instructive during development.
     * Reference this, and if changes are made, watch out for
     * errors elsewhere!
     *
     * FYI: FB Client returns the following object:
     *    user = {
     *      full_name: 'full name',
     *      first_name: 'first name',
     *      last_name: 'last name',
     *      id: Facebook ID,
     *      email: 'email address',
     *      gender: 'gender'
     *    }
     ****************/
    var userTemplate = {
      id:         0,
      full_name:  '',
      first_name: '',
      last_name:  '',
      email:      '',
      gender:     '',
      photo:      '',
      about:      '',
      pointValue: 1,
      questions:  [], // format here is "{ question: 'q', answer: true},"
      collection: {}, // id: id
      owners:     {}, // id: id
      visitedProfiles: {} // store here with id as the key
    }; // end userTemplate

    return userTemplate;
  }; // end getNewUserTemplate()



  $scope.updateVisitedProfile = function(profile) {
    /*********************
     * visitedProfiles objects are stored as follows:
     *   result = {
     *     id: {
     *       lastVisited: [], // array of Date objects
     *       status: 0 // or ___ -1 for rejected ___ or ___ % complete ___ as a number.
     *     }
     *   } 
     ********************/
    var result = {};
    var profileID = profile.id;
    var today = new Date();

    // if (player.visitedProfiles.profileID) { // if this player has this ID in their visited profiles
    //   // var result.profileID = player.visitedProfiles.profileID; // update result with profile from DB
    //   result.profileID.lastVisited.push(today);
    // } else { // player has not visited this profile
    //   result.profileID = {}; // actual player profile
    //   result.profileID.lastVisited = []; // empty array
    //   result.profileID.lastVisited.push(today);
    //   result.profileID.profileStatus = 0;
    // } // end if (player has visited this profile)

    return result; // this is the updated profile object in play
  }; // end updateVisitedProfile(profile)




}]); // end UserController controller