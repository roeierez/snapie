// require express
var express = require('express');

// require postgres
var pg = require('pg');

// get an instance of the express Router
var router = express.Router()
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pepper';

////////////////////////////////////////////////////////////////////////////////
// ELEMENTS
////////////////////////////////////////////////////////////////////////////////

/*
REMOVE THIS SINCE IT WILL BE DONE BY GOING THROUGH THE CONTENTS FOLDER
// curl --data "source=/icons/alarms.svg" http://127.0.0.1:5000/api/elements
router.post('/elements', function(req, res) {
  var results = [];

  // Grab data from http request
  var data = {source: req.body.source};

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }

      // SQL Query > Insert Data
      client.query("INSERT INTO elements(source) values($1)", [data.source]);

      // SQL Query > Select Data
      var query = client.query("SELECT * FROM elements ORDER BY id ASC");

      // Stream results back one row at a time
      query.on('row', function(row) {
          results.push(row);
      });

      // After all data is returned, close connection and return results
      query.on('end', function() {
          done();
          return res.json(results);
      });
    });
});
*/

router.get('/elements', function(req, res){
  // example expected output: [{"id":1,"source":"'/icons/alarms.svg'"},{"id":2,"source":"/icons/apartment.svg"}]

  // store database results from query
  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
      // Handle connection errors
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }

      // SQL Query > Select Data
      var query = client.query("SELECT * FROM elements ORDER BY id ASC;");

      // Stream results back one row at a time
      query.on('row', function(row) {
          results.push(row);
      });

      // After all data is returned, close connection and return results
      query.on('end', function() {
          done();
          return res.json(results);
      });

  });  
} );

/*
MIGHT NOT WANT TO PUT THIS FOR SECURITY PURPOSES
// curl -X DELETE http://127.0.0.1:5000/api/elements/1
router.delete('/elements/:graphics_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.graphics_id;

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM elements WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM elements ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});
*/

////////////////////////////////////////////////////////////////////////////////
// TEMPLATES
//
// TODO: set this up properly
////////////////////////////////////////////////////////////////////////////////

// more routes for our API will happen here
// http://localhost:8080/api/template?id=4
router.get('/templates', function(req, res){
  // path to graphics
  var graphics = '[{"source":"/icons/alarms.svg"},{"source":"/icons/apartment.svg"},{"source":"/icons/arrow-down-circle.svg"}]';
  var arr = JSON.parse(graphics);
  res.json(arr);
} );

module.exports = router;
