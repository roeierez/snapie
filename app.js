// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path')
var pg = require('pg');

// serve static files
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'content')))

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;        // set our port
app.set('port', port)

var api_router = require('./src/server/api/api.js');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', api_router);

module.exports = app;

// START THE SERVER
// =============================================================================
app.listen(app.get('port'), function(){ console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);});

// testing database
app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM elements', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('src/client/db', {results: result.rows} ); }
    });
  });
})


