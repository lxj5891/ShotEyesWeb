var app = require('../app');
var should = require("should");

describe('controllers/status.js', function () {
  before(function (done) {
    app.listen(3000, done);
  });
  after(function () {
    app.close();
  });

  it('should /status 200', function (done) {
        done();
  });


});