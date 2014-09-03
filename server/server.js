/*****************
 * Basic Server
 * Implemented with Express - http://expressjs.com/4x/api.html
 * Run with nodemon by running 'nodemon server.js' from this folder.
 ****************/
var router = require('./router'); // access router.js file

var express = require('express');
var bodyParser = require('body-parser'); // to get data from POST: https://github.com/expressjs/body-parser

var app = express();

host = 'localhost';
localPort = process.env.PORT || 3003; // hard-coded port.   NOTE: MAY ALSO need ' || Connection.DEFAULT_PORT ' for deploy


/*****************
 * Headers
 ****************/
app.all('*', function(req, res, next) { // headers for server
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


/*****************
 * NOTE: This code block included for review. I recommend we review it before
 * we deploy, then remove or un-comment as necessary.
       app.set('title', 'CatchEm'); // set site title in server.
       app.get('title');
 ****************/


/*****************
 * NOTE: This code block included for later implementation.
 * Use bodyParser to parse application/json as follows:
       app.use(bodyParser.urlencoded({ extended: true }));
       app.use(bodyParser.json()) 
 ****************/


/*****************
 * Routes
 ****************/
app.get('/', router.index); // call router.index on GET '/'
app.get('/db', router.getDB); // return mongoClient DB info
app.get('/profiles', router.getProfiles); // return DB profiles
app.get('/save', router.saveUser); // TODO: SHOULD BE POST


/*****************
 * Start Server
 ****************/
app.listen(localPort); // Start the server
console.log('Listening on port ' + localPort); // Log to console on successful start