
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
  var graphics = [{"id": 0212, "source":"/icons/alarm.svg"},{"id": 0213, "source":"/icons/apartment.svg"},{"id": 0214, "source":"/icons/arrow-down-circle.svg"}];
  //var arr = JSON.parse(graphics);
  res.json(graphics);   
} );

module.exports = router;