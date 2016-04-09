// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path')

// serve static files
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.static(path.join(__dirname, 'content')))

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var api_router = require('./src/server/api/api.js');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', api_router);

module.exports = app;

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Starting App on ' + port);
