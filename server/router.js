/*********************
 * Router for Express Server
 * HTTP verbs like 'GET', 'POST', etc. are defined here.
 * Implemented with Express - http://expressjs.com/4x/api.html#router
 * 
 ********************/
var express = require('express');
var app = express(); // the Express instance

var bodyParser = require('body-parser'); // to get data from POST:

var defaultMessage = 'NOTE: Inside route.';
// var utils = require('./utils'); // all in one file for now...


///////////////////////////////////////////
///////////////////////////////////////////
/////////       START MONGO      //////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

/*****************
 * MongoDB Database
 * Implemented with Monk - https://github.com/LearnBoost/monk
 * Run with nodemon by running 'nodemon server.js' from this folder.
 ****************/
// var app = require('./server');

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/catchem'); // TODO: update host and database name

/*****************
 * TEMPORARY sample user
 ****************/
var sampleUser = {
  fullname: 'sampleUser',
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
  id: 123456,
  email: 'email address',
  gender: 'gender'
};

var user3 = {
  fullname: 'user3',
  firstname: 'first name',
  lastname: 'last name',
  id: 123456,
  email: 'email address',
  gender: 'gender'
};

var user4 = {
  fullname: 'user4',
  firstname: 'first name',
  lastname: 'last name',
  id: 123456,
  email: 'email address',
  gender: 'gender'
};



var users = db.get('users');

users.index('name last'); // get users collection ==> users.insert(), users.update(), etc.
users.insert({ name: 'Tobi', bigdata: {} });
  users.find({ name: 'Loki' }, '-bigdata', function () {
  // exclude bigdata field
});

// db.close();


///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
/////////       END MONGO        //////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

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
// app.get('/', router.index); // call router.index on get '/'
// app.post('/login', router.login); // call router.index on get '/'

app.get('/',function(req,res){
  db.driver.admin.listDatabases(function(e,dbs){
      res.json(dbs);
  });
});

app.get('/collections',function(req,res){
  db.driver.collectionNames(function(e,names){
    res.json(names);
  })
});

app.get('/collections/:name',function(req,res){
  var collection = db.get(req.params.name);
  collection.find({},{limit:20},function(e,docs){
    res.json(docs);
  })
});

app.get('/profiles',function(req,res){
  var profiles = db.get('profiles');
  profiles.find({},{limit:20},function(e,docs){
    res.json(docs);
  })
});

app.get('/sample',function(req,res) {
  var profiles = db.get('profiles');
  profiles.insert(sampleUser, function (err, profile) {
    if(err) throw err;
    res.json(profile);
  }); // end insert()
}); // end app.post

app.post('/POSTsample/:user',function(req,res) {
  var profiles = db.get('profiles');
  var thisUser = db.get(req.params.user);
  console.log('thisUser = ' + thisUser);
  profiles.insert(thisUser, function (err, profile) {
    if(err) throw err;
    res.json(profile);
  }); // end insert()
}); // end app.post

// exports.index = function(req, res){
//   db.driver.admin.listDatabases(function(e,dbs) {
//     res.json(dbs);
//   }); // end listDatabases
// }; // end index

// exports.login = function(req, res){
//   console.log(defaultMessage + 'POST Login');
//   console.log('req:', req.body);




//   Received from client:
  
//   user = {
//     fullname: full name,
//     firstname: first name,
//     lastname: last name,
//     id: Facebook ID,
//     email: email address,
//     gender: gender
//   }
  

//   res.end('got your data: ' + JSON.stringify(req.body));
// };




module.exports = app; // export app for router.js