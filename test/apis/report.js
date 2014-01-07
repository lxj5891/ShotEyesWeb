var app = require('../../app.js');
var request = require('supertest')(app);
var should = require("should");

describe('/apis/report.js', function () {
  before(function (done) {
    app.listen(0, done);
  });

  var cookie = undefined;

  it('should login ok', function (done){
    request.get('/simplelogin?name=admin&password=admin')
      .expect(200, function (err, res) {
        cookie = res.headers['set-cookie']; //关键在这里，需要将res.headers['set-cookie']保持一下，然后在下面赋值req.session方法是基于cookie 的
        done();
      });
  });

  it('should /report 200', function (done) {
    request.get('/report').set('cookie', cookie)
      .expect(200, function (err, res) {
        done();
      });
  });

  it('should /ui/report/pull 200', function (done) {
    request.get('/ui/report/pull').set('cookie', cookie)
      .expect(200, function (err, res) {
        done();
      });
  });


  it('should /catalog 200', function (done) {
    request.get('/catalog').set('cookie', cookie)
      .expect(200, function (err, res) {
        done();
      });
  });

  it('should /api/report/list.json 200', function (done) {
    request.get('/api/report/list.json').set('cookie', cookie)
      .expect(200, function (err, res) {
        done();
      });
  });



});