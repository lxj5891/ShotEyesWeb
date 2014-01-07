var user = require("../apis/user")
  , report = require("../apis/report")
  , menu = require("../apis/menu")
  , catalog = require("../apis/catalog");

exports.guiding = function (app) {
  // APIs
  app.get('/menu/nodes.json', function(req, res){
    menu.nodeList(req, res);
  });

  app.get("/report" , report.page);

  app.get("/catalog" , catalog.page);

  app.all("/ui/report/pull" , function(req,res){
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