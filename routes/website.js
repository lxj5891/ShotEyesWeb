
var menu = require("../apis/menu");
var user = require("../apis/user");
var report = require("../apis/report");

exports.guiding = function (app) {
  // APIs
  app.post('/menu/nodes.json', function(req, res){
    menu.nodeList(req, res);
  });

  app.get("/user" , function(req,res){
    user.userIndex(req,res);
  });

  app.get("/report" , report.page);

  app.post("/user/list.json" , function(req,res){
    user.userList(req,res);
  });

  app.all("/ui/portal",function(req,res){
    res.render("portal",{title:"1"});
  })



}