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


/**
 * 获取报告一览
 * @param start_
 * @param limit_
 * @param callback
 */
exports.getList = function (handler, callback_) {
  var code = handler.params.code
    , start = handler.params.start || 0
    , limit = handler.params.count || 20
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