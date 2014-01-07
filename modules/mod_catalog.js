"use strict";

var mongo       = smart.util.mongoose
  , conn        = smart.framework.connection
  , schema      = mongo.Schema
  , ObjectId    = schema.ObjectId;


/**
 * 分类 的  schema
 * @type {schema}
 */
var Catalog = new schema({
    name        : {type: String, description: "名称"}
  , description : {type: String, description: "描述"}
  , valid       : {type: Number, description: "删除 0:无效 1:有效", default: 1}
  , createat    : {type: Date,   description: "创建时间"}
  , createby    : {type: String, description: "创建者"}
  , editat      : {type: Date,   description: "最终修改时间"}
  , editby      : {type: String, description: "最终修改者"}
});

/**
 * 使用定义好的Schema,通过Code生成Catalog的model
 * @param {string} code
 * @returns {model} item model
 */
function model(dbname) {

  return conn.model(dbname, "Catalog", Catalog);
}


/**
 * 获取分类的  一览
 * @param {string} code 公司code
 * @param {object} condition 条件
 * @param {number} start 数据开始位置
 * @param {number} limit 数据件数
 * @param {function} callback 返回一览
 */
exports.getList = function(code, condition, start, limit, callback) {

  var catalog = model(code);

  catalog.find(condition)
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

  var catalog = model(code);

  catalog.count(condition).exec(function(err, count) {
    callback(err, count);
  });
};


/**
 * 添加新报告
 * @param {string} code 公司Code
 * @param {object} condition 条件
 * @param {function} callback 返回件数
 */
exports.add = function(code, newCatalog, callback) {

  var catalog = model(code);

  var query = new catalog(newCatalog);

  query.save(function(err, result) {
    console.log(err);
    callback(err, result);
  });
};



/**
 * 修改分类
 * @param {string} code 公司Code
 * @param {object} condition 条件
 * @param {function} callback 返回件数
 */
exports.update = function(code, id , newCatalog, callback) {

  var catalog = model(code);
  delete newCatalog._id;
  catalog.findByIdAndUpdate(id,newCatalog,function(err, result){
    console.log(err);
    callback(err, result);
  });

};

/**
 * 删除分类
 * @param {string} code 公司Code
 * @param {object} id 条件
 * @param {function} callback 返回件数
 */
exports.remove = function(code, id, callback) {

  var catalog = model(code);

  catalog.remove({_id:id+""},function(err, result) {
    console.log(err);

    callback(err, result);
  });
};

