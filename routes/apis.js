

var report = require("../apis/report");
var menu = require("../apis/menu");

exports.guiding = function(app){


  app.get('/api/report/list.json', function(req, res){
    report.list(req, res);
  });

  app.post('/api/report/save.json', function(req, res){
    report.add(req, res);
  });

  app.get('/api/menu/list.json', function(req, res){
    menu.appList(req, res);
  });

}


