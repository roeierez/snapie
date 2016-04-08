
var express = require('express');

// get an instance of the express Router
var router = express.Router()

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    // this will return our APP
    //res.sendFile(path.join(__dirname + '/index.html'));
});

// more routes for our API will happen here

// http://localhost:8080/api/template?id=4
router.get('/template', function(req, res){
      var template_id = req.param('id');
      res.json({ message: 'hooray! You\'ve selected template:'+template_id });   
} );

router.get('/presets', function(req, res){
      res.json({ message: 'hooray! You\'ve selected presets' });   
} );

router.get('/graphics', function(req, res){
      res.json({ message: 'hooray! You\'ve selected graphics' });   
} );

module.exports = router;