var app = require('../../app.js');
var request = require('supertest')(app);
var should = require("should");


describe('/apis/menu.js', function () {
  var cookie = undefined;

  it('should login ok', function (done){
    request.get('/simplelogin?name=admin&password=admin')
      .expect(200, function (err, res) {
        cookie = res.headers['set-cookie']; //关键在这里，需要将res.headers['set-cookie']保持一下，然后在下面赋值req.session方法是基于cookie 的
        done();
      });
  });

  it('should /menu/nodes.json 200', function (done) {
    request.get('/menu/nodes.json').set('cookie', cookie)
      .expect(200, function (err, res) {
        done();
      });
  });




});