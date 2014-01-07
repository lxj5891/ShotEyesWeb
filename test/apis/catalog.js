var app = require('../../app.js');
var request = require('supertest')(app);
var should = require("should");


describe('/apis/catalog.js', function () {
  var cookie = undefined;
  var _csrf;
  var testData = { id: '', name: '123123123', description: '123123' };
  var testId = "";
  it('should login ok', function (done){
    request.get('/simplelogin?name=admin&password=admin')
      .expect(200, function (err, res) {
        cookie = res.headers['set-cookie']; //关键在这里，需要将res.headers['set-cookie']保持一下，然后在下面赋值req.session方法是基于cookie 的
        _csrf = res.headers['csrftoken'];
        res.should.status(200);

        done();
      });
  });

  it('should /catalog 200', function (done) {
    request.get('/catalog').set('cookie', cookie)
      .expect(200, function (err, res) {
        res.should.status(200);
        done();
      });
  });

  it('should /api/catalog/save.json 200', function (done) {
    console.log(_csrf);
    request.post('/api/catalog/save.json?_csrf=' + _csrf).set('cookie', cookie).send(testData)
      .expect(200, function (err, res) {
        res.should.status(200);
        should.exist(res);
        var json = eval("(" + res.text + ")");
        res.should.status(200);
        json.should.have.property('data');
        testId = json.data._id;
        done();
      });
  });

  it('should /api/catalog/save.json error', function (done) {
    console.log(_csrf);
    testData._id = "1232132";
    request.post('/api/catalog/save.json?_csrf=' + _csrf).set('cookie', cookie).send(testData)
      .expect(200, function (err, res) {
        res.should.status(200);
        done();
      });
  });

  it('should /api/catalog/remove.json 200', function (done) {

    request.post('/api/catalog/remove.json?_csrf=' + _csrf).set('cookie', cookie).send({id:testId})
      .expect(200, function (err, res) {
        res.should.status(200);
        done();
      });
  });


  it('should /api/catalog/list.json 200', function (done) {
    request.get('/api/catalog/list.json').set('cookie', cookie)
      .expect(200, function (err, res) {
        res.should.status(200);
        done();
      });
  });







});