
var testapi     = require('../apis/testapi')
  , log         = smart.framework.log
  , action      = require('./action');

var dispatchMap = {};

/**
 * 注册Action
 */
exports.register = function() {
  // 转发消息Action,仅仅把数据转发到客户端
  dispatchMap["forward"] = function(data, callback) {
    callback(null, data);
  };

  // 测试用的Action

  // 广播消息
  {
    // 刷新一个桌的信息
  }
}

/**
 * 追加Action
 * @type {Function}
 */
function add(key, action) {
  dispatchMap[key] = action;
}
exports.add = add;

/**
 * 取得Action
 * @type {Function}
 */
function get(key) {
  return dispatchMap[key];
}
exports.get = get;

/**
 * 生成广播消息数据
 * @param action
 * @param data
 * @param room
 * @returns {{}}
 */
exports.dataBroadcast = function(action, data, room) {
  var res = {};
  res.action = action;

  res.room = room;
  res.data = data || {};
  res.data.action = action;
  return res;
}
/**
 * 生成转发的广播消息数据
 * @param action
 * @param data
 * @param room
 * @returns {{}}
 */
exports.dataForwardBroadcast = function(action, data, room) {
  var res = {};
  res.action = "forward";

  res.room = room;
  res.data = data || {};
  res.data.action = action;
  return res;
}