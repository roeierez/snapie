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
// BACKGROUNDS
//
// TODO: set this up properly
////////////////////////////////////////////////////////////////////////////////
var backgroundsConfig = JSON.parse('[{"tag":"All, Birthday, Party, Love, Shapes, Holidays, Social, Technology, Random","name":"Empty","preview":"/assets/default/empty.png"},{"tag":"All, Party","name":"Bday","preview":"/templates/bday.jpg"},{"tag":"All, Party","name":"Birthday","preview":"/templates/birthday.jpg"},{"tag":"All, Party","name":"HappyBirthday","preview":"/templates/happybday.jpg"},{"tag":"All, Social","name":"Prom","preview":"/templates/prom.jpg"},{"tag":"All, Love","name":"Wed","preview":"/templates/wed.jpg"},{"tag":"All, Love","name":"Wedding","preview":"/templates/wedding.jpg"},{"tag":"All, Social","name":"event3","preview":"/templates/event_3a.jpg"},{"tag":"All, Party","name":"happy3","preview":"/templates/happy_3.jpg"},{"tag":"All, Party","name":"happy2","preview":"/templates/happy_2.jpg"}]');
router.get('/backgrounds', (req, res) =>  res.json(backgroundsConfig));


////////////////////////////////////////////////////////////////////////////////
// TEMPLATES
//
// TODO: set this up properly
////////////////////////////////////////////////////////////////////////////////

// more routes for our API will happen here
// http://localhost:8080/api/template?id=4

var templatesGraphics = [],
    templateIDCounter = 0;

router.get('/templates', (req, res) => res.json(templatesGraphics));

router.post('/templates', (req, res) => {
  var tag = req.body.tags || [],
      preview = req.body.previewURL,
      dynamicContent = req.body.dynamicContent;

  templatesGraphics.push({
    id: templateIDCounter++,
    tag,
    preview,
    dynamicContent
  });
  res.send(200);
});

router.delete('/templates/:id', (req, res) => {
  templatesGraphics = templatesGraphics.filter( t => t.id != req.params.id);
  res.send(200);
});

////////////////////////////////////////////////////////////////////////////////
// FONTS
//
// TODO: set this up properly
////////////////////////////////////////////////////////////////////////////////

// more routes for our API will happen here
// http://localhost:8080/api/template?id=4
router.get('/fonts', function(req, res){
  // path to graphics
  var graphics = '[{"name":"Avebury Inline", "fontfamily":"avebury-inline"},{"name":"Bickham Script Pro 3", "fontfamily":"bickham-script-pro-3"},{"name":"Blenny", "fontfamily":"blenny"},{"name":"Discourse Middle", "fontfamily":"discourse-middle"},{"name":"Discourse Narrow Outline", "fontfamily":"discourse-narrow-outline"},{"name":"Fira Sans 2", "fontfamily":"fira-sans-2"}, {"name":"Factoria", "fontfamily":"factoria"}, {"name":"Freight Micro Pro", "fontfamily":"freight-micro-pro"},{"name":"Futura PT Condensed", "fontfamily":"futura-pt-condensed"},{"name":"Kepler Std Semicondense", "fontfamily":"kepler-std-semicondensed"},{"name":"Kinescope", "fontfamily":"kinescope"},{"name":"Monorcha", "fontfamily":"monorcha"},{"name":"Proxima Nova", "fontfamily":"proxima-nova"}]';

  var arr = JSON.parse(graphics);
  res.json(arr);
} );

module.exports = router;
