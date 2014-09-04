/*****************
 * Basic Server
 * Implemented with Express - http://expressjs.com/4x/api.html
 * Run with nodemon by running 'nodemon server.js' from this folder.
 ****************/
var app = require('./server/router');

var localPort = process.env.PORT || 3003; // hard-coded port

/*****************
 * Start Server
 ****************/
app.listen(localPort); // Start the serverconsole.log('Magic happens on port ' + port);
console.log('Listening on port ' + localPort); // Log to console on successful start



/*****************
   TODO: GRUNT task will look something like this:
// This uses Gulp, but the commands are very similar
gulp.task('serve', function() {
  nodemon({script: 'server/server.js', ignore: 'node_modules/** /*.js'})
    .on('restart', function () {
      refresh(client);
    });
});
 ****************/