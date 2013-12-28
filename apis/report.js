var response  = smart.framework.response
  , errors    = smart.framework.errors
  , util      = smart.framework.util
  , context   = smart.framework.context
  , log       = smart.framework.log
  , _         = require('underscore')
  , report      = require("../controllers/ctrl_report");

exports.add = function (req, res) {
  var body = req.body;
  console.log(body);

  var handler = new context().bind(req, res);
  handler.addParams("newReport",req.body)
  report.add(handler,function(err,result){
    res.json({status: 200, data: {},msg:"添加成功"});
  });

}

exports.pullList = function(req,res){
  var handler = new context().bind(req, res);
  report.getList(handler, function(err, result) {
    res.render("ui/report_pull",{title:"图片瀑布流",reportList:result});
  });
}

exports.list = function (req, res) {

  var handler = new context().bind(req, res);
  log.operation("begin: get report list.", handler.uid);

  report.getList(handler, function(err, result) {
    log.operation("finish: get report list.", handler.uid);
//    response.send(res, err, result);
    res.json(result);
  });
}

exports.page = function (req, res) {
  res.render("report_list", {title: 123});
}