/*********************
 * Database-Server Code
 * Database insert, update, remove, and query operations are defined here.
 * Implemented with MongoDB - http://mongodb.github.io/node-mongodb-native/genindex.html
 * CRUD reference - http://docs.mongodb.org/manual/reference/crud/
 ********************/

var app = require('./server'); // access server.js file
// var mongo = require('mongodb'); // can include this and use 'var MongoClient = new mongodb.MongoClient', but we won't unless we need more datatypes / functions from mongodb.
var MongoClient = require('mongodb').MongoClient; // MongoClient has .close(), .connect(), .db(), .open()
var Server = require('mongodb').Server;

var Db          = require('mongodb').Db;
var Binary      = require('mongodb').Binary;
var BSON        = require('mongodb').pure().BSON;
var Code        = require('mongodb').Code;
var Grid        = require('mongodb').Grid;
var GridStore   = require('mongodb').GridStore;
var ObjectID    = require('mongodb').ObjectID;


var host = 'localhost'; // TODO: This should probably be refactored so it's set in a function called from router.js and defined there...
var mongoPort = 27017;  // TODO: This should probably be refactored so it's set in a function called from router.js and defined there...
var dbName = 'catchem'; // TODO: This should probably be refactored so it's set in a function called from router.js and defined there...
var connectURI = 'mongodb://' + host + ':' + mongoPort + '/' + dbName; // Compiled string to pass in to .connect() function


/*********************
 * MongoClient - http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html
 * Use the MongoClient connection class to manage connections:
 * MongoClient = function(server, options);
 * MongoClient.prototype.open
 * MongoClient.prototype.close
 * MongoClient.prototype.db
 * MongoClient.connect
 * NOTE: AVOID using mongoClient.open as it will open and close connections to the DB constantly.
 * We implement MongoClient.connect() and save a reference to that db as 'dbCatchem'.
 ********************/
var mongoClient = new MongoClient(new Server(host, mongoPort), {native_parser: true}); // Set up the connection to the local db

mongoClient.connect(connectURI, function(err, dbCatchem) { // Initialize connection once
  if(err) throw err;
}); // end .connect()
var dbCatchem = mongoClient.db(dbName); // local cache of catchem db

/*********************
 * Collection - http://mongodb.github.io/node-mongodb-native/api-generated/collection.html
 * Collections are where we save, update, find, etc. our data.
 * We have one collection item "collections" with keys for each collection, i.e.:
 *   collections.profiles
 *   collections.siteStats
 * etc.
 ********************/
var collections = {}; // our collections object
collections.profiles = dbCatchem.collection('profiles'); // create profiles collection. TODO: This is NOT a safe operation yet...


/*****************
 * Local functions
 * For convenience.
 ****************/

var isArray = function(keyValuePair) {
  for (var key in keyValuePair) {
    if (key === 'lastOn' || key === 'capturedPeople' ||
        key === 'capturedBy' || key === 'peopleVisited') {
      return true;
    } // end if (key references an array)
    return false;
}}; // end isArray(keyValuePair)

var errorCallback = function(err, parm2) {
  if (err) {
    console.log('Error: ', err);
    return false;
  } else {
    return true;
  }
}; // end errorCallback()

exports.generateSampleUser = function() { // generate a sample user
  return {
    _id: "STERLINGVIX",
    fbLink: "https://www.facebook.com/amelocik",
    name: "Aaron Melocik",
    age: 32,
    zip: 94591,
    city: "Vallejo",
    state: "CA",
    lastOn: new Date(2014, 09, 01),
    pic: "https://scontent-a-sea.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/247328_899637472441_447472250_n.jpg?oh=5d578aa637316648f5cf0f32924b1b08&oe=5478464E",
    reputation: 0,
    capturedPeople: [],
    capturedBy: [],
    peopleVisited: [],
    username: "SterlingVix",
    pass: "1234"
  };
}; // end generateSampleUser()


/*****************
 * DB Operations
 * can be referenced via 'db.functionName()' in router.js
 ****************/
exports.getMongoClient = function() { // return this instance of the MongoClient for debugging
  // console.log('\n\nMongoClient = ', mongoClient); // UNCOMMENT for instance info in console
  return mongoClient;
}; // end getMongoClient()


exports.saveNewProfile = function(user) { // save a new user profile
  var userID = user._id;

  // collections.profiles.save({userID : user}, {w: 0});//, function(err, result) { // NOTE: this code is what we want, but it doesn't work ATM.
  dbCatchem.collection('profiles').save({userID : user}, {w: 0}, function(err, result) { // TODO: NOT SAFE! {w:0} has no write concern. Refactor.
    if (err) {
      throw err;
    }
  }); // end .save();

return ('At end of saveNewProfile operation on user ' + userID + ' with no error thrown.');
}; // end saveNewProfile(user)


exports.getProfiles = function(limit) {
  console.log('inside db.getProfiles, at top');
  var allProfiles = {};

  if (limit) {
    allProfiles = dbCatchem.collection('profiles').find().limit(limit);
  } else { // no limit supplied
    // return collections.profiles.find(); // NOTE: this code doesn't work, but it's what we want in the long run.
    allProfiles = dbCatchem.collection('profiles').find().toArray(function(err, docs) {
      console.log('inside getProfiles, docs = ', docs); // not working...
      if (err) {
        throw err;
      }
  }); // end toArray()

  if (allProfiles === undefined) {allProfiles = 'undefined'; /*for logging*/}
  var returnString = 'allProfiles should be populated; allProfiles = ' + allProfiles;
  return returnString;  
}}; // end getProfiles(limit)




/*****************
 * TODO: features we'll probably want in the near future
 ****************/
 /*
exports.makeNewCollection = function(collectionName) {
  collections.collectionName = dbCatchem.collection(collectionName);
  return true;
};


exports.getUser = function(userID) {
  return collections.profiles.find(userID);
}; // end getAllProfiles(userID)


exports.updateProfile = function(user, updateInfoAsJSON) { // update a user with JSON object
}; // end updateProfile(user, updateInfoAsJSON)


exports.updateUser = function(userID, JSONData) { // accepts the userID and a JSON object with 1-to-n updates.
  // TODO: NEEDS REFACTORING!!!
  for(var key in JSONData) {
    if (isArray(key)) {
      collections.profiles.update(
        { _id: userID },
        // { $push: {key : JSONData[key]} }
      ); // end update
    } else { // data is not in an array
      collections.profiles.update(
        { _id: userID },
        // { $set: {key : JSONData[key]} }
      ); // end update
    } // end else
  } // end for (var key in JSONData)
}; // end updateUser(userID, JSONData)


exports.removeUser = function(userID) {
  collections.profiles.remove({_id: userID}, {w:1}, function(err, result) { // SYNCHRONOUS removal of user
    if(err) {
      throw err;
    } // end if (error connecting to db)
  }); // end .remove()
  return true; // successfully removed
}; // end removeUser(userID)


exports.closeConnection = function() {
  mongoClient.close(errorCallback(err)); // Close the connection
} // end closeConnection()

*/