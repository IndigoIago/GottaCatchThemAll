
/*****************
 * TEMPORARY sample users using Facebook formatting:
 ****************/

//   Received from client:
  
//   user = {
//     fullname: full name,
//     firstname: first name,
//     lastname: last name,
//     id: Facebook ID,
//     email: email address,
//     gender: gender
//   }

var user1 = {
  fullname: 'full name',
  firstname: 'first name',
  lastname: 'last name',
  id: 123456,
  email: 'email address',
  gender: 'gender'
};

var user2 = {
  fullname: 'user2',
  firstname: 'first name',
  lastname: 'last name',
  id: 234567,
  email: 'email address',
  gender: 'gender'
};

var user3 = {
  fullname: 'user3',
  firstname: 'first name',
  lastname: 'last name',
  id: 345678,
  email: 'email address',
  gender: 'gender'
};

var user4 = {
  fullname: 'user4',
  firstname: 'first name',
  lastname: 'last name',
  id: 456789,
  email: 'email address',
  gender: 'gender'
};




/*********************
 * Router for Express Server
 * HTTP verbs like 'GET', 'POST', etc. are defined here.
 * Implemented with Express - http://expressjs.com/4x/api.html#router
 * 
 ********************/
var express = require('express');
var app = express(); // the Express instance
var bodyParser = require('body-parser'); // to get data from POST:

var db = require('./utils'); // NOTE: might be require('/../data')

var defaultMessage = 'NOTE: Inside route.';
// var utils = require('./utils'); // all in one file for now...


/*****************
 * Headers
 ****************/
app.all('*', function(req, res, next) { // headers for server
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


/*****************
 * Express router configuration
 * app.use statements should go here.
 *   i.e.: partials, cookieParser, session, etc.
 ****************/
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client')); // serve static content from ../client directory


/*****************
 * Routes
 ****************/
app.get('/',function(req,res){
  // should be handled by express.static(__dirname...)
});

app.get('/listDBs',function(req,res){
  db.driver.admin.listDatabases(function(e,dbs){
    res.json(dbs);
  });
}); // end get(listDBs)

app.get('/collections',function(req,res){
  db.driver.collectionNames(function(e,names){
    res.json(names);
  })
}); // end get(collections)


/*****************
 * Test query
 * Anything passed in past 'query/' will be queried as a collection
 * i.e.: 'profiles', 'San Francisco', etc.
 * try going to 'http://localhost:3003/query/profiles'
 ****************/
app.get('/query/:dbCollectionToQuery',function(req,res){
  var dbCollectionToQuery = req.params.dbCollectionToQuery;
  var collection = db.get(dbCollectionToQuery);
  collection.find({},{limit:20},function(e,docs){
    res.json(docs);
  }); // end find()
}); // end get(query)


/*****************
 * Test POST
 * NOTE: This is NOT RESTful, and does not use POST.
 * TODO: refactor to use REST & POST requests.
 * Anything passed in past 'saveUser/' will be saved in the 'profiles' collection
 * i.e.: 'user2', 'user4', etc.
 * try going to 'http://localhost:3003/saveUser/user1'
 ****************/
app.get('/saveUser/:userToSaveToDB',function(req,res){
  var userToSaveToDB = req.params.dbCollectionToQuery;

  if (userToSaveToDB === 'user1') {
    userToSaveToDB = user1;
  } else if (userToSaveToDB === 'user2') {
    userToSaveToDB = user2;
  } else if (userToSaveToDB === 'user3') {
    userToSaveToDB = user3;
  } else if (userToSaveToDB === 'user4') {
    userToSaveToDB = user4;
  } else {
    userToSaveToDB = userToSaveToDB;
  }

  var profiles = db.get('profiles');
  profiles.insert(userToSaveToDB, function (err, profile) {
    if(err) throw err;
    res.json(profile);
  }); // end insert()
}); // end get(saveUser)

// app.get('usersetup', function (req, res, next) {
//   var httpString = "At usersetup";
//   res.json('Something here...');
// }; // end app.get(usersetup)

app.post('/login', function(req, res, next) {
  var fullname = req.body.fullname;
  var password = req.body.password;

  var profiles = db.get('profiles');

  // This returns the user.
  // TODO: query for user, then authenticate, then token?
  profiles.findOne({
    fullname: fullname
  }, function(e, docs){
    res.json(docs);
  }); // end findOne()
}); // end app.post(login)

//   res.end('got your data: ' + JSON.stringify(req.body));
// };

module.exports = app; // export app for router.js

