"use strict";

var mongo       = smart.util.mongoose
  , conn        = smart.framework.connection
  , schema      = mongo.Schema;

/**
 * 公司schema
 * @type {schema}
 */
var Report = new schema({
    seq        : {type: String, description: "序号"}
  , comment     : {type: String, description: "介绍"}
  , status      : {type: Number, description: "状态 0:保密 1:公开", default: 0}
  , fileName    : {type: String, description: "文件名"}
  , attachment  : {type: String, description: "附件"}
  , tags        : [String]
  , attachmentThumb  : {
    small   : {type: String, description: "小图"},
    middle  : {type: String, description: "中图"},
    big     : {type: String, description: "大图"}
  }
  , valid       : {type: Number, description: "删除 0:无效 1:有效", default: 1}
  , createat    : {type: Date,   description: "创建时间"}
  , createby    : {type: String, description: "创建者"}
  , editat      : {type: Date,   description: "最终修改时间"}
  , editby      : {type: String, description: "最终修改者"}
});

/**
 * 使用定义好的Schema,通过Code生成Report的model
 * @param {string} code
 * @returns {model} item model
 */
function model(dbname) {

  return conn.model(dbname, "Report", Report);
}


/**
 * 获取报告一览
 * @param {string} code 公司code
 * @param {object} condition 条件
 * @param {number} start 数据开始位置
 * @param {number} limit 数据件数
 * @param {function} callback 返回一览
 */
exports.getList = function(code, condition, start, limit, callback) {

  var report = model(code);

  report.find(condition)
    .skip(start || 0)
    .limit(limit || 20)
    .sort({editat: -1})
    .exec(function(err, result) {
      callback(err, result);
    });
};

/**
 * 获取报告件数
 * @param {string} code 公司Code
 * @param {object} condition 条件
 * @param {function} callback 返回件数
 */
exports.total = function(code, condition, callback) {

  var report = model(code);

  report.count(condition).exec(function(err, count) {
    callback(err, count);
  });
};


/**
 * 添加新报告
 * @param {string} code 公司Code
 * @param {object} condition 条件
 * @param {function} callback 返回件数
 */
exports.add = function(code, newReport, callback) {

  var report = model(code);

  new report(newReport).save(function(err, result) {
    callback(err, result);
  });
};