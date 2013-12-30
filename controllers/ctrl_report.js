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
  , report = require('../modules/mod_report.js')


exports.add = function (handler, callback) {
  var code = handler.params.code
    , newReport = handler.params.newReport
  var now = new Date();
  newReport.createat = now;
  newReport.createby = handler.uid;
  newReport.editat   = now;
  newReport.editby   = handler.uid;

  report.add(code,newReport,function(err,result){
    callback(err,result);
  });
}
/**
 * 获取报告一览
 * @param start_
 * @param limit_
 * @param callback
 */
exports.getList = function (handler, callback_) {
  var code = handler.params.code
    , page = handler.params.page || 0
    , limit = handler.params.rows || 20
    , start = (page - 1) * limit

    , keyword = handler.params.keyword
    , tags = handler.params.tags

    , condition = {
      valid: 1
    };

  if (keyword) {
    keyword = util.quoteRegExp(keyword);
    condition.itemName = new RegExp(keyword.toLowerCase(), "i");
  }

  if (tags) {

    var or = [];
    _.each(tags.split(","), function (item) {
      or.push({tags: item});
    });
    condition.$or = or;
  }


  report.total(code, condition, function (err, count) {

    report.getList(code, condition, start, limit, function (err, result) {
      if (err) {
        return callback_(new error.InternalServer(err));
      }

      return callback_(undefined, {rows: result, total: count});

    });
  });


};