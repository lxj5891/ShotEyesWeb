var response  = smart.framework.response
  , errors    = smart.framework.errors
  , util      = smart.framework.util
  , context   = smart.framework.context
  , log       = smart.framework.log
  , _         = require('underscore')
  , report      = require("../controllers/ctrl_report");

exports.add = function (req, res) {
  res.json({status: 200, data: {},msg:"添加成功"});
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