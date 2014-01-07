var app = require('../app');
var request = require('supertest')(app);
var should = require("should");

describe('/apis/status.js', function () {
  before(function (done) {
    app.listen(3000, done);
  });


  it('should /status.json 200', function (done) {
    request.get('/status.json')
      .expect(200, function (err, res) {
        done();
      });

  });


});