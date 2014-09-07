
/*****************
 * TEMPORARY sample users using Facebook formatting:
 ****************/

//   Received from client:
  
//   user = {
//     full_name: full name,
//     first_name: first name,
//     last_name: last name,
//     id: Facebook ID,
//     email: email address,
//     gender: gender
//   }

var user1 = {
  full_name: 'full name',
  first_name: 'first name',
  last_name: 'last name',
  facebook_id: 123456,
  email: 'email address',
  gender: 'gender'
};

var user2 = {
  full_name: 'user2',
  first_name: 'first name',
  last_name: 'last name',
  facebook_id: 234567,
  email: 'email address',
  gender: 'gender'
};

var user3 = {
  full_name: 'user3',
  first_name: 'first name',
  last_name: 'last name',
  facebook_id: 345678,
  email: 'email address',
  gender: 'gender'
};

var user4 = {
  full_name: 'user4',
  first_name: 'first name',
  last_name: 'last name',
  facebook_id: 456789,
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
var jwt = require('jwt-simple');
var Q = require('q');
var db = require('./utils');

var defaultMessage = 'NOTE: Inside route.';


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

// app.get('/listDBs',function(req,res){
//   db.driver.admin.listDatabases(function(e,dbs){
//     res.json(dbs);
//   });
// }); // end get(listDBs)

app.get('/collections',function(req,res){ // all the database collections in our database
  db.driver.collectionNames(function(e,names){
    res.json(names);
  });
}); // end get(collections)


/*****************
 * Master Database Query
 * Anything passed in past 'query/' will be queried in the 'profiles' collection
 * i.e.: 'id', 'zip', etc.
 * PLEASE NOTE that, at the moment, we're probably only optimized for searching by id!!!
 * We will need a different document store (not 'profiles') for other optimized searches.
 *
 * EXAMPLES:
 *
 *   go to 'http://localhost:3003/query/id'
 *   req._parsedUrl.pathname = /query/id
 *   req.params.dbFieldToQuery = 'id'
 *   req._parsedUrl.query = null
 *
 *   go to 'http://localhost:3003/query/id?123456'
 *   req._parsedUrl.pathname = /query/id
 *   req.params.dbFieldToQuery = 'id'
 *   req._parsedUrl.query = 123456
 *
 *   go to 'http://localhost:3003/query/id?{id:123456}'
 *   req._parsedUrl.pathname = /query/id
 *   req.params.dbFieldToQuery = 'id'
 *   req._parsedUrl.query = {id:123456}
 ****************/
app.get('/query/:dbFieldToQuery',function(req,res){
  var dbCollectionToQuery = 'profiles'; // we only have a profiles collection for now
  var thisPathname = req._parsedUrl.pathname;
  var dbFieldToQuery; // empty container for field (like 'id'). Will be populated by parsing
  var queryData; // empty container for data (like an id number). Will be populated by parsing

  try { // try to parse dbFieldToQuery
    dbFieldToQuery = JSON.parse(req.params.dbFieldToQuery);
  } catch (er) { // can't be parsed - reassign back to req...
    console.error('caught dbFieldToQuery error: ', er);
    dbFieldToQuery = req.params.dbFieldToQuery;
  }

  try { // try to parse queryData
    queryData = JSON.parse(req._parsedUrl.query);
  } catch (er) { // can't be parsed - reassign back to req...
    console.error('caught queryData error: ', er);
    queryData = req._parsedUrl.query;
  }

  // console.log('typeof queryData=', typeof queryData);
  // console.log('req._parsedUrl=', req._parsedUrl);
  // console.log('typeof queryData=', typeof queryData);
  // console.log('queryData=', queryData);
  // console.log('typeof rawQuery=', typeof rawQuery);
  // console.log('rawQuery=', rawQuery);

  if (dbFieldToQuery === 'id') { // find a user by id
    //d
  }
  

  var collection = db.get(dbFieldToQuery);
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
  var userToSaveToDB = req.params.userToSaveToDB;
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
  var fbid = req.body.facebook_id;
  var profiles = db.get('profiles');
  var findOne = Q.nbind(profiles.findOne, profiles);

  findOne({facebook_id: fbid})
    .then(function(user) {
      if (user) {
        // User exists, log in.
        return user;
      } else {
        // User does not exist, insert into DB
        insert = Q.nbind(profiles.insert, profiles);
        return insert(req.body);
      }
    })
    .then(function (user) {
      // create token to send back for auth
      var token = jwt.encode(user, 'secret');
      res.json({token: token});
    })
    .fail(function (error) {
      next(error);
    });
}); // end app.post(login)

app.get('/loggedin', function(req, res, next) {
  // checking to see if the user is authenticated
  // grab the token in the header is any
  // then decode the token, which we end up being the user object
  // check to see if that user exists in the database
  var token = req.headers['x-access-token'];
  if (!token) {
    // next(new Error('No token'));
    console.log('No token!');
    res.status(403).end();
  } else {
    console.log('Token found!:', token);

    var user = jwt.decode(token, 'secret');
    var profiles = db.get('profiles');
    var findUser = Q.nbind(profiles.findOne, profiles);
    findUser({facebook_id: user.facebook_id})
      .then(function (foundUser) {
        if (foundUser) {
          console.log('User found!:', foundUser.full_name);
          res.status(200).end();
        } else {
          res.status(401).end();
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
});

module.exports = app; // export app for router.js