// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var pg = require('pg');
var populateDB = require('./util/populate_db.js');
var api_router = require('./src/server/api/api.js');

// serve static files
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'content')));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;        // set our port
app.set('port', port);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', api_router);

module.exports = app;

if (process.env.NODE_ENV != 'dev'){
	// INITIALLY POPULATE THE DB WITH ALL FILES
	content_path = './content/icons';
	var files = populateDB.getFiles(content_path);
	console.log(files);
	populateDB.populateDB(files);
}

// START THE SERVER
// =============================================================================
app.listen(app.get('port'), function(){ console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);});


