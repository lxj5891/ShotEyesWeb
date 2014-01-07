

var user = require("../apis/user");
var report = require("../apis/report");
var menu = require("../apis/menu");

exports.guiding = function (app) {
  // APIs
  app.post('/menu/nodes.json', function(req, res){
    menu.nodeList(req, res);
  });

  app.get("/report" , report.page);

  app.all("/ui/reportPull" , function(req,res){

    report.pullList(req,res);
  });

  app.all("/ui/portal",function(req,res){
    res.render("portal",{title:"1"});
  });

  app.all("/ui/reportList",function(req,res){
    res.render("ui/report_list",{title:"1"});
  });

  app.all("/ui/reportInput",function(req,res){
    res.render("ui/report_input",{title:"新建报告"});
  })




}