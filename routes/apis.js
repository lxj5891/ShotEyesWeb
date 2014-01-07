

var report = require("../apis/report");
var menu = require("../apis/menu");
var catalog = require("../apis/catalog");

exports.guiding = function(app){

  /* catalog */



  app.get('/api/catalog/list.json', function(req, res){
    catalog.list(req, res);
  });

  app.post('/api/catalog/save.json', function(req, res){
    catalog.add(req, res);
  });

  app.post('/api/catalog/remove.json', function(req, res){
    catalog.remove(req, res);
  });

  /* report */

  app.get('/api/report/list.json', function(req, res){
    report.list(req, res);
  });

  app.post('/api/report/save.json', function(req, res){
    report.add(req, res);
  });



}


