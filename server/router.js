/*********************
 * Router for Express Server
 * HTTP verbs like 'GET', 'POST', etc. are defined here.
 * Implemented with Express - http://expressjs.com/4x/api.html#router
 * 
 ********************/
var defaultMessage = 'NOTE: Inside route.';

exports.index = function(req, res){
  console.log(defaultMessage + 'GET');
  res.json({ message: defaultMessage + 'GET' }); // NOTE: alt syntax ==> res.end(defaultMessage + 'GET');
}; // end index

exports.login = function(req, res){
  console.log(defaultMessage + 'POST Login');
  console.log('req:', req.body);

  /*
  Received from client:
  
  user = {
    fullname: full name,
    firstname: first name,
    lastname: last name,
    id: Facebook ID,
    email: email address,
    gender: gender
  }
  */

  res.end('got your data: ' + JSON.stringify(req.body));
};