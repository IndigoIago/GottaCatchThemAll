/*****************
 * Basic Server
 * Implemented with Express - http://expressjs.com/4x/api.html
 * Run with nodemon by running 'nodemon server.js' from this folder.
 ****************/
var app = require('./router');

var localPort = process.env.PORT || 3003; // hard-coded port

/*****************
 * Start Server
 ****************/
app.listen(localPort); // Start the serverconsole.log('Magic happens on port ' + port);
console.log('Listening on port ' + localPort); // Log to console on successful start
