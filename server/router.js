/*********************
 * Router for Express Server
 * HTTP verbs like 'GET', 'POST', 'PUT', 'DELETE', etc. are defined here.
 * Implemented with Express - http://expressjs.com/4x/api.html#router
 * 
 ********************/
var db = require('./db'); // access db.js file
var defaultMessage = 'NOTE: Inside route.';


/*****************
 * DataBase
 ****************/
/*****************
 * NOTE: This code block kept in case we need to use Express middleware for greater db access in the future.
 * Not implementing now because it adds the database object to every request. Very inefficient, and may cause other problems.
 * app.use(function(req,res,next){ // Express middleware to connect .db as an object on every req
 *     req.db = db.getDB();
 *     next();
 * });
 ****************/


/*****************
 * Routes
 ****************/
exports.index = function(req, res){
  console.log(defaultMessage + 'GET index');
  res.json({ message: defaultMessage + 'GET' }); // NOTE: alt syntax ==> res.end(defaultMessage + 'GET');
}; // end index

exports.getDB = function(req, res){
  var mC = db.getMongoClient();
  var httpString = 'mongo client was stored in a local variable, with databaseName: ' + mC._db.databaseName;
  res.json(httpString); // send JSON result
}; // end getDB

exports.saveUser = function(req, res){
  var sampleUser = db.generateSampleUser(); // Temporary sample user
  var resultString = db.saveNewProfile(sampleUser);
  res.json(resultString); // send JSON result
}; // end saveUser

exports.getProfiles = function(req, res){
  var allProfiles = db.getProfiles(); // query db for all stored profiles
  res.json(allProfiles); // send JSON result
}; // end saveUser