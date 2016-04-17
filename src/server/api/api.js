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
if (process.env.NODE_ENV==='dev'){
  router.get('/elements', function (req, res){
    // path to graphics
    var graphics = '[{"source":"/elements/bdaybaloon.svg"},{"source":"/elements/bdaybaloons.svg"},{"source":"/elements/bdaygal.svg"},{"source":"/elements/bdayglasses.svg"},{"source":"/elements/bdayguy.svg"},{"source":"/elements/bdayhat.svg"},{"source":"/elements/bdayribbon.svg"},{"source":"/elements/bg1.svg"},{"source":"/elements/bg2.svg"},{"source":"/elements/bg3.svg"},{"source":"/elements/bg4.svg"},{"source":"/elements/bg5.svg"},{"source":"/elements/circle.svg"},{"source":"/elements/crown.svg"},{"source":"/elements/cupcake.svg"},{"source":"/elements/heart.svg"}]';
    var arr = JSON.parse(graphics);
    res.json(arr);
  })
}
else {
  router.get('/elements', function(req, res){
    // example expected output: [{"id":1,"source":"'/elements/alarms.svg'"},{"id":2,"source":"/elements/apartment.svg"}]

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
}
////////////////////////////////////////////////////////////////////////////////
// TEMPLATES
//
// TODO: set this up properly
////////////////////////////////////////////////////////////////////////////////

// more routes for our API will happen here
// http://localhost:8080/api/template?id=4
router.get('/templates', function(req, res){
  // path to graphics
  var graphics = '[{"source":"/templates/Birthday.png"}]';
  var arr = JSON.parse(graphics);
  res.json(arr);
} );

module.exports = router;
