
var app = require('../server.js');
var request = require('supertest')(app);
var assert = require('assert');

app.get('/', function(req, res){
  res.status(200).json({ name: 'snapie' });
});

describe('verify presets', function() {
    it('returns a list of presets', function(done) {
        request
          .get('/presets')
          .expect({message: "hooray! You\'ve selected presets'"}, done);
    });
});

describe('verify templates', function() {
    it('returns a template based on template id', function(done) {
        request
          .get('/template?id=4')
          .expect({message: "hooray! You\'ve selected template: 4'"}, done);
    });
});

describe('verify graphics', function() {
    it('returns a list of graphics', function(done) {
        request
          .get('/graphics')
          .expect({message: "hooray! You\'ve selected graphics'"}, done);
    });
});