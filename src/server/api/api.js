// require express
var express = require('express');

// require postgres
var pg = require('pg');

// get an instance of the express Router
var router = express.Router()
if (process.env.NODE_ENV==='dev'){
  var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pepper';
}

////////////////////////////////////////////////////////////////////////////////
// ELEMENTS
////////////////////////////////////////////////////////////////////////////////
if (process.env.NODE_ENV==='dev'){
  router.get('/elements', function (req, res){
    // path to graphics
    var graphics = '[{"name":"bdaybaloon","preview":"/elements/bdaybaloon.svg","source":"/elements/bdaybaloon.svg"}, {"name":"bdaybaloons","preview":"/elements/bdaybaloons.svg","source":"/elements/bdaybaloons.svg"}, {"name":"bdaycake","preview":"/elements/bdaycake.svg","source":"/elements/bdaycake.svg"}, {"name":"bdaygal","preview":"/elements/bdaygal.svg","source":"/elements/bdaygal.svg"}, {"name":"bdayglasses","preview":"/elements/bdayglasses.svg","source":"/elements/bdayglasses.svg"}, {"name":"bdayguy","preview":"/elements/bdayguy.svg","source":"/elements/bdayguy.svg"}, {"name":"bdayhat","preview":"/elements/bdayhat.svg","source":"/elements/bdayhat.svg"}, {"name":"bdayribbon","preview":"/elements/bdayribbon.svg","source":"/elements/bdayribbon.svg"}, {"name":"bg1","preview":"/elements/bg1.svg","source":"/elements/bg1.svg"}, {"name":"bg2","preview":"/elements/bg2.svg","source":"/elements/bg2.svg"}, {"name":"bg3","preview":"/elements/bg3.svg","source":"/elements/bg3.svg"}, {"name":"bg4","preview":"/elements/bg4.svg","source":"/elements/bg4.svg"}, {"name":"bg5","preview":"/elements/bg5.svg","source":"/elements/bg5.svg"}, {"name":"circle","preview":"/elements/circle.svg","source":"/elements/circle.svg"}, {"name":"crown","preview":"/elements/crown.svg","source":"/elements/crown.svg"}, {"name":"cup","preview":"/elements/cup.svg","source":"/elements/cup.svg"}, {"name":"cupcake","preview":"/elements/cupcake.svg","source":"/elements/cupcake.svg"}, {"name":"film","preview":"/elements/film.svg","source":"/elements/film.svg"}, {"name":"fire","preview":"/elements/fire.svg","source":"/elements/fire.svg"}, {"name":"flower","preview":"/elements/flower.svg","source":"/elements/flower.svg"}, {"name":"flowers2","preview":"/elements/flowers2.svg","source":"/elements/flowers2.svg"}, {"name":"free","preview":"/elements/free.svg","source":"/elements/free.svg"}, {"name":"gamecontroller","preview":"/elements/gamecontroller.svg","source":"/elements/gamecontroller.svg"}, {"name":"heart","preview":"/elements/heart.svg","source":"/elements/heart.svg"}, {"name":"itslit","preview":"/elements/itslit.svg","source":"/elements/itslit.svg"}, {"name":"lightning","preview":"/elements/lightning.svg","source":"/elements/lightning.svg"}, {"name":"mac","preview":"/elements/mac.svg","source":"/elements/mac.svg"}, {"name":"shocker","preview":"/elements/shocker.svg","source":"/elements/shocker.svg"}, {"name":"spinningrecord","preview":"/elements/spinningrecord.svg","source":"/elements/spinningrecord.svg"}, {"name":"stars","preview":"/elements/stars.svg","source":"/elements/stars.svg"}, {"name":"stick","preview":"/elements/stick.svg","source":"/elements/stick.svg"}, {"name":"thunder","preview":"/elements/thunder.svg","source":"/elements/thunder.svg"}]';

    var arr = JSON.parse(graphics);
    res.json(arr);
  })
}
else {
  router.get('/elements', function(req, res){
    // example expected output: [{"id":1,"previewSource":"'/elements/alarms.svg'"},{"id":2,"source":"/elements/apartment.svg"}]

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
  var graphics = '[{"name":"bachelor","preview":"/templates/bachelor.svg","source":"/templates/bachelor.svg"}, {"name":"bachelorcrew","preview":"/templates/bachelorcrew.svg","source":"/templates/bachelorcrew.svg"}, {"name":"bachelorette","preview":"/templates/bachelorette.svg","source":"/templates/bachelorette.svg"}, {"name":"bachelorettecrew","preview":"/templates/bachelorettecrew.svg","source":"/templates/bachelorettecrew.svg"}, {"name":"bday1","preview":"/templates/bday1.svg","source":"/templates/bday1.svg"},{"name":"bday2","preview":"/templates/bday2.svg","source":"/templates/bday2.svg"}, {"name":"bday2_t","preview":"/templates/bday2_t.svg","source":"/templates/bday2_t.svg"}, {"name":"bday3","preview":"/templates/bday3.svg","source":"/templates/bday3.svg"}, {"name":"bday3_t","preview":"/templates/bday3_t.svg","source":"/templates/bday3_t.svg"}, {"name":"bday4","preview":"/templates/bday4.svg","source":"/templates/bday4.svg"}, {"name":"bday4_t","preview":"/templates/bday4_t.svg","source":"/templates/bday4_t.svg"}, {"name":"bday8","preview":"/templates/bday8.svg","source":"/templates/bday8.svg"}, {"name":"bday8_t","preview":"/templates/bday8_t.svg","source":"/templates/bday8_t.svg"}, {"name":"bday9","preview":"/templates/bday9.svg","source":"/templates/bday9.svg"}, {"name":"bday9_t","preview":"/templates/bday9_t.svg","source":"/templates/bday9_t.svg"}, {"name":"brianbachelor","preview":"/templates/brianbachelor.svg","source":"/templates/brianbachelor.svg"}, {"name":"brianbachelor_1","preview":"/templates/brianbachelor_1.svg","source":"/templates/brianbachelor_1.svg"}, {"name":"dynamite","preview":"/templates/dynamite.svg","source":"/templates/dynamite.svg"}, {"name":"dynamite_t","preview":"/templates/dynamite_t.svg","source":"/templates/dynamite_t.svg"}, {"name":"gucci","preview":"/templates/gucci.svg","source":"/templates/gucci.svg"}, {"name":"gucci_t","preview":"/templates/gucci_t.svg","source":"/templates/gucci_t.svg"}, {"name":"holiday","preview":"/templates/holiday.svg","source":"/templates/holiday.svg"}, {"name":"holiday_t","preview":"/templates/holiday_t.svg","source":"/templates/holiday_t.svg"}, {"name":"houseparty","preview":"/templates/houseparty.svg","source":"/templates/houseparty.svg"}, {"name":"houseparty_t","preview":"/templates/houseparty_t.svg","source":"/templates/houseparty_t.svg"}, {"name":"itslit","preview":"/templates/itslit.svg","source":"/templates/itslit.svg"}, {"name":"itslit_t","preview":"/templates/itslit_t.svg","source":"/templates/itslit_t.svg"}, {"name":"prom","preview":"/templates/prom.svg","source":"/templates/prom.svg"}, {"name":"prom_t","preview":"/templates/prom_t.svg","source":"/templates/prom_t.svg"}, {"name":"sbachelorette","preview":"/templates/sbachelorette.svg","source":"/templates/sbachelorette.svg"}, {"name":"sbachelorette_t","preview":"/templates/sbachelorette_t.svg","source":"/templates/sbachelorette_t.svg"}, {"name":"sexcity","preview":"/templates/sexcity.svg","source":"/templates/sexcity.svg"}, {"name":"sexcity_t","preview":"/templates/sexcity_t.svg","source":"/templates/sexcity_t.svg"}, {"name":"teambachelor","preview":"/templates/teambachelor.svg","source":"/templates/teambachelor.svg"}, {"name":"teambachelor_t","preview":"/templates/teambachelor_t.svg","source":"/templates/teambachelor_t.svg"}, {"name":"teambachelorette","preview":"/templates/teambachelorette.svg","source":"/templates/teambachelorette.svg"}, {"name":"teambachelorette_t","preview":"/templates/teambachelorette_t.svg","source":"/templates/teambachelorette_t.svg"}, {"name":"wed1","preview":"/templates/wed1.svg","source":"/templates/wed1.svg"}, {"name":"wed1_t","preview":"/templates/wed1_t.svg","source":"/templates/wed1_t.svg"}, {"name":"wed2","preview":"/templates/wed2.svg","source":"/templates/wed2.svg"}, {"name":"wed2_t","preview":"/templates/wed2_t.svg","source":"/templates/wed2_t.svg"}, {"name":"wed3","preview":"/templates/wed3.svg","source":"/templates/wed3.svg"}, {"name":"wed3_t","preview":"/templates/wed3_t.svg","source":"/templates/wed3_t.svg"}, {"name":"wed4","preview":"/templates/wed4.svg","source":"/templates/wed4.svg"}, {"name":"wed4_t","preview":"/templates/wed4_t.svg","source":"/templates/wed4_t.svg"}, {"name":"wed5","preview":"/templates/wed5.svg","source":"/templates/wed5.svg"}, {"name":"wed6","preview":"/templates/wed6.svg","source":"/templates/wed6.svg"}, {"name":"wed6_t","preview":"/templates/wed6_t.svg","source":"/templates/wed6_t.svg"}, {"name":"wed7","preview":"/templates/wed7.svg","source":"/templates/wed7.svg"}, {"name":"wed7_t","preview":"/templates/wed7_t.svg","source":"/templates/wed7_t.svg"}, {"name":"wed8","preview":"/templates/wed8.svg","source":"/templates/wed8.svg"}, {"name":"wed8_t","preview":"/templates/wed8_t.svg","source":"/templates/wed8_t.svg"}]';

  var arr = JSON.parse(graphics);
  res.json(arr);
} );

module.exports = router;
