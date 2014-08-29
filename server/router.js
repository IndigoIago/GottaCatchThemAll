/*********************
 * Router for Express Server
 * HTTP verbs like 'GET', 'POST', etc. are defined here.
 * Implemented with Express - http://expressjs.com/4x/api.html#router
 ********************/
// var express = require('express'); NECESSARY?!?!?!?

var router = express.Router(); // Express router

var defaultMessage = 'NOTE: Inside app.route.';

/* ///   TEST   ///
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});
*/




app.route('/') // route to handle all HTTP verbs at '/'
  .get(function(req, res){ // listen for 'GET' request, and send data
    console.log(defaultMessage + 'GET');
    res.send(defaultMessage + 'GET');
  // ALT: res.json({ message: defaultMessage });	
});

// app.route('/') //  TEMP! Keeping this until verifying route() works
//    .get('/', function(req, res){ // listen for this get ( '/' ) request, and send data
//   console.log(defaultMessage);
//   res.send(defaultMessage);
// });