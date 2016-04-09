
var express = require('express');

// get an instance of the express Router
var router = express.Router()

// more routes for our API will happen here

// http://localhost:8080/api/template?id=4
router.get('/template', function(req, res){
  // path to graphics
  var graphics = '[{"source":"/icons/alarms.svg"},{"source":"/icons/apartment.svg"},{"source":"/icons/arrow-down-circle.svg"}]';
  var arr = JSON.parse(graphics);
  res.json(arr);
} );

router.get('/graphics', function(req, res){
  // path to graphics
  var graphics = '[{"source":"/icons/alarms.svg"},{"source":"/icons/apartment.svg"},{"source":"/icons/arrow-down-circle.svg"}]';
  var arr = JSON.parse(graphics);
  res.json(arr);   
} );

module.exports = router;