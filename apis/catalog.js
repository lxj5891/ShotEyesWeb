var response  = smart.framework.response
  , errors    = smart.framework.errors
  , util      = smart.framework.util
  , context   = smart.framework.context
  , log       = smart.framework.log
  , _         = smart.util.underscore
  , catalog      = require("../controllers/ctrl_catalog");

exports.page = function (req, res) {
  res.render("ui/catalog_list", {title: "catalog"});
}

exports.list = function (req, res) {

  var handler = new context().bind(req, res);
  log.operation("begin: get catalog list.", handler.uid);

  catalog.getList(handler, function(err, result) {
    log.operation("finish: get catalog list.", handler.uid);


    response.send(res, err, result);
  });
};

exports.add = function (req, res) {

  var handler = new context().bind(req, res);
  console.log(req.body);
  handler.addParams("newCatalog",req.body);

  catalog.add(handler,function(err,result){
    if (err) {
      return res.send({status: 300, data: err , msg:"添加失败"});
    }
    res.setHeader("Content-type","text/html; charset=UTF-8");
    res.send({status: 200, data: result , msg:"添加成功"});
  });

}

exports.remove = function (req, res) {
  var handler = new context().bind(req, res);
  catalog.remove(handler,function(err,result){
    res.setHeader("Content-type","text/html; charset=UTF-8");
    if (err) {
      return res.send({status: 300, data: {} , msg:"删除失败"});
    }
    res.send({status: 200, data: {} , msg:"删除成功"});
  });
};