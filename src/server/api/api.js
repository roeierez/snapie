// require express
var express = require('express');

// require postgres
var pg = require('pg');

// get an instance of the express Router
var router = express.Router()

/*
if (process.env.NODE_ENV==='dev'){
  var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/pepper';
}
*/

////////////////////////////////////////////////////////////////////////////////
// ELEMENTS
////////////////////////////////////////////////////////////////////////////////
//if (process.env.NODE_ENV==='dev'){
  router.get('/elements', function (req, res){
    // path to graphics
    var graphics = '[{"tag":"All, Birthday, Party","name":"bdaybaloon","preview":"/elements/bdaybaloon.svg","source":"/elements/bdaybaloon.svg"}, {"tag":"All, Birthday, Party","name":"bdaybaloons","preview":"/elements/bdaybaloons.svg","source":"/elements/bdaybaloons.svg"}, {"tag":"All, Birthday, Party","name":"bdaycake","preview":"/elements/bdaycake.svg","source":"/elements/bdaycake.svg"}, {"tag":"All, Birthday, Party","name":"bdaygal","preview":"/elements/bdaygal.svg","source":"/elements/bdaygal.svg"}, {"tag":"All, Birthday, Party, Holidays, Social","name":"bdayglasses","preview":"/elements/bdayglasses.svg","source":"/elements/bdayglasses.svg"}, {"tag":"All, Birthday, Party","name":"bdayguy","preview":"/elements/bdayguy.svg","source":"/elements/bdayguy.svg"},{"tag":"All, Birthday, Party","name":"bdayhat","preview":"/elements/bdayhat.svg","source":"/elements/bdayhat.svg"}, {"tag":"All, Birthday, Party","name":"bdayribbon","preview":"/elements/bdayribbon.svg","source":"/elements/bdayribbon.svg"}, {"tag":"All, Random","name":"bg1","preview":"/elements/bg1.svg","source":"/elements/bg1.svg"}, {"tag":"All, Random","name":"bg2","preview":"/elements/bg2.svg","source":"/elements/bg2.svg"}, {"tag":"All, Random","name":"bg3","preview":"/elements/bg3.svg","source":"/elements/bg3.svg"}, {"tag":"All, Random","name":"bg4","preview":"/elements/bg4.svg","source":"/elements/bg4.svg"}, {"tag":"All, Random","name":"bg5","preview":"/elements/bg5.svg","source":"/elements/bg5.svg"}, {"tag":"All, Shapes","name":"circle","preview":"/elements/circle.svg","source":"/elements/circle.svg"}, {"tag":"All, Random","name":"crown","preview":"/elements/crown.svg","source":"/elements/crown.svg"}, {"tag":"All, Social, Party","name, Party":"cup","preview":"/elements/cup.svg","source":"/elements/cup.svg"}, {"tag":"All, Birthday","name":"cupcake","preview":"/elements/cupcake.svg","source":"/elements/cupcake.svg"}, {"tag":"All, Random","name":"film","preview":"/elements/film.svg","source":"/elements/film.svg"}, {"tag":"All, Random","name":"fire","preview":"/elements/fire.svg","source":"/elements/fire.svg"}, {"tag":"All, Love","name":"flower","preview":"/elements/flower.svg","source":"/elements/flower.svg"}, {"tag":"All, Love","name":"flowers2","preview":"/elements/flowers2.svg","source":"/elements/flowers2.svg"}, {"tag":"All, Random","name":"free","preview":"/elements/free.svg","source":"/elements/free.svg"}, {"tag":"All, Technology","name":"gamecontroller","preview":"/elements/gamecontroller.svg","source":"/elements/gamecontroller.svg"},{"tag":"All, Love","name":"heart","preview":"/elements/heart.svg","source":"/elements/heart.svg"}, {"tag":"All, Social","name":"itslit","preview":"/elements/itslit.svg","source":"/elements/itslit.svg"}, {"tag":"All, Random","name":"lightning","preview":"/elements/lightning.svg","source":"/elements/lightning.svg"}, {"tag":"All, Technology","name":"mac","preview":"/elements/mac.svg","source":"/elements/mac.svg"}, {"tag":"All, Random","name":"shocker","preview":"/elements/shocker.svg","source":"/elements/shocker.svg"}, {"tag":"All, Random","name":"spinningrecord","preview":"/elements/spinningrecord.svg","source":"/elements/spinningrecord.svg"}, {"tag":"All, Random","name":"stars","preview":"/elements/stars.svg","source":"/elements/stars.svg"}, {"tag":"All, Random","name":"stick","preview":"/elements/stick.svg","source":"/elements/stick.svg"}, {"tag":"All, Random","name":"thunder","preview":"/elements/thunder.svg","source":"/elements/thunder.svg"}]';

    var arr = JSON.parse(graphics);
    res.json(arr);
  })
//}
/*
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
   var graphics = '[{"tag":"All, Party","name":"bachelor","preview":"/templates/bachelor_t.svg","source":"/templates/bachelor.svg"}, {"tag":"All, Party","name":"bachelorcrew","preview":"/templates/bachelorcrew.svg","source":"/templates/bachelorcrew.svg"}, {"tag":"All, Party","name":"bachelorette","preview":"/templates/bachelorette_t.svg","source":"/templates/bachelorette.svg"}, {"tag":"All, Party","name":"bachelorettecrew","preview":"/templates/bachelorettecrew.svg","source":"/templates/bachelorettecrew.svg"}, {"tag":"All, Birthday, Party","name":"bday1","preview":"/templates/bday1_t.svg","source":"/templates/bday1.svg"},{"tag":"All, Birthday, Party","name":"bday2","preview":"/templates/bday2_t.svg","source":"/templates/bday2.svg"}, {"tag":"All, Birthday, Party","name":"bday3","preview":"/templates/bday3_t.svg","source":"/templates/bday3.svg"}, {"tag":"All, Birthday, Party","name":"bday4","preview":"/templates/bday4_t.svg","source":"/templates/bday4.svg"}, {"tag":"All, Birthday, Party","name":"bday8","preview":"/templates/bday8_t.svg","source":"/templates/bday8.svg"}, {"tag":"All, Birthday, Party","name":"bday9","preview":"/templates/bday9_t.svg","source":"/templates/bday9.svg"}, {"tag":"All, Party","name":"brianbachelor","preview":"/templates/brianbachelor_1.svg","source":"/templates/brianbachelor.svg"}, {"tag":"All, Random","name":"dynamite","preview":"/templates/dynamite_t.svg","source":"/templates/dynamite.svg"}, {"tag":"All, Random","name":"gucci","preview":"/templates/gucci_t.svg","source":"/templates/gucci.svg"}, {"tag":"All, Holidays","name":"holiday","preview":"/templates/holiday_t.svg","source":"/templates/holiday.svg"}, {"tag":"All, Party","name":"houseparty","preview":"/templates/houseparty_t.svg","source":"/templates/houseparty.svg"}, {"tag":"All, Social, Random","name":"itslit","preview":"/templates/itslit_t.svg","source":"/templates/itslit.svg"}, {"tag":"All, Social","name":"prom","preview":"/templates/prom_t.svg","source":"/templates/prom.svg"}, {"tag":"All, Party","name":"sbachelorette","preview":"/templates/sbachelorette_t.svg","source":"/templates/sbachelorette.svg"}, {"tag":"All, Random","name":"sexcity","preview":"/templates/sexcity_t.svg","source":"/templates/sexcity.svg"}, {"tag":"All, Party","name":"teambachelor","preview":"/templates/teambachelor_t.svg","source":"/templates/teambachelor.svg"}, {"tag":"All, Party","name":"teambachelorette","preview":"/templates/teambachelorette_t.svg","source":"/templates/teambachelorette.svg"}, {"tag":"All, Love","name":"wed1","preview":"/templates/wed1.svg","source":"/templates/wed1_t.svg"}, {"tag":"All, Love","name":"wed2","preview":"/templates/wed2_t.svg","source":"/templates/wed2.svg"}, {"tag":"All, Love","name":"wed3","preview":"/templates/wed3_t.svg","source":"/templates/wed3.svg"}, {"tag":"All, Love","name":"wed4","preview":"/templates/wed4_t.svg","source":"/templates/wed4.svg"}, {"tag":"All, Love","name":"wed5","preview":"/templates/wed5.svg","source":"/templates/wed5.svg"}, {"tag":"All, Love","name":"wed6","preview":"/templates/wed6_t.svg","source":"/templates/wed6.svg"}, {"tag":"All, Love","name":"wed7","preview":"/templates/wed7_t.svg","source":"/templates/wed7.svg"}, {"tag":"All, Love","name":"wed8","preview":"/templates/wed8_t.svg","source":"/templates/wed8.svg"}]';

  var arr = JSON.parse(graphics);
  res.json(arr);
} );

////////////////////////////////////////////////////////////////////////////////
// FONTS
//
// TODO: set this up properly
////////////////////////////////////////////////////////////////////////////////

// more routes for our API will happen here
// http://localhost:8080/api/template?id=4
router.get('/fonts', function(req, res){
  // path to graphics
  var graphics = '[{"tag":"All","name":"Kinescope","preview":"/fonts/Kinescope.png","source":"/fonts/Kinescope.png"}, {"tag":"All","name":"Blenny","preview":"/fonts/Blenny.png","source":"/fonts/Blenny.png"}, {"tag":"All","name":"Kepler Std Semicondense ","preview":"/fonts/KeplerStdSemicondense.png","source":"/fonts/KeplerStdSemicondense.png"}, {"tag":"All","name":"Bickham Script Pro 3 Regular","preview":"/fonts/BickhamScriptPro3.png","source":"/fonts/BickhamScriptPro3.png"}]';

  var arr = JSON.parse(graphics);
  res.json(arr);
} );

module.exports = router;
