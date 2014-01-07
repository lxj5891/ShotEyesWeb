"use strict";

var fs = smart.lang.fs
  , async = smart.util.async
  , _ = smart.util.underscore
  , gridfs = smart.ctrl.file
  , error = smart.framework.errors
  , user = smart.ctrl.user
  , auth = smart.framework.auth
  , log = smart.framework.log
  , file = smart.ctrl.file
  , util = smart.framework.util
  , catalog = require('../modules/mod_catalog.js')

/**
 * 删除分类
 * @param start_
 * @param limit_
 * @param callback
 */
exports.remove = function(handler,callback){
  var code = handler.params.code
    , id = handler.params.id;
  console.log(id);
  catalog.remove(code,id,function(err,result){
    callback(err,result);
  });
}
/**
 * 追加 更新 分类
 * @param start_
 * @param limit_
 * @param callback
 */
exports.add = function (handler, callback) {
  var code = handler.params.code
    , newCatalog = handler.params.newCatalog
  var now = new Date();
  newCatalog.createat = now;
  newCatalog.createby = handler.uid;
  newCatalog.editat   = now;
  newCatalog.editby   = handler.uid;

  catalog.add(code,newCatalog,function(err,result){
    callback(err,result);
  });
}
/**
 * 获取类型一览
 * @param start_
 * @param limit_
 * @param callback
 */
exports.getList = function (handler, callback) {
  var code = handler.params.code
    , page = handler.params.page || 1
    , limit = handler.params.rows || 20;

  var start = (page - 1) * limit
    , condition = {
      valid: 1
    };

  catalog.total(code, condition, function (err, count) {

    catalog.getList(code, condition, start, limit, function (err, result) {
      if (err) {
        return callback(new error.InternalServer(err));
      }
      return callback(null, {rows: result, total: count});

    });
  });


};
