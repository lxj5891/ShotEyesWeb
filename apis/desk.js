var response  = smart.framework.response
  , util      = smart.framework.util
  , errors    = smart.framework.errors
  , desk      = require('../controllers/ctrl_desk')
  , service   = require('../modules/mod_service.js');


// 获取App  的台位 一览
exports.appDeskList = function(req_, res_) {

  var code = "diandian"
    , start = req_.query.start || 0
    , limit = req_.query.count || 20
    , condition = {
      valid: 1

    };



  desk.appList(code, condition, start, limit , function(err, result) {
    response.send(res_, err, result);
  });
};


// 获取指定桌台
exports.findOne = function(req_, res_) {

  var code = req_.session.user.companycode
    , uid = req_.session.user._id
    , deskId = req_.query.deskId;

  desk.get(code, uid, deskId, function(err, result) {
    response.send(res_, err, result);
  });
};

// 获取一览
exports.list = function(req_, res_) {

  var code = req_.session.user.companycode
    , start = req_.query.start || 0
    , limit = req_.query.count || 20
    , keyword = req_.query.keyword
    , condition = {
      valid: 1
    };

  if (keyword) {
    keyword = util.quoteRegExp(keyword);
    condition.name = new RegExp(keyword.toLowerCase(), "i");
  }

  desk.list(code, condition, start, limit , function(err, result) {
    response.send(res_, err, result);
  });
};

// 添加
exports.add = function(req_, res_) {

  var code = req_.session.user.companycode
    , uid = req_.session.user._id;

  desk.add(code, uid, req_.body, function(err, result) {
    response.send(res_, err, result);
  });
};

// 更新
exports.update = function(req_, res_) {

  var code = req_.session.user.companycode
    , uid = req_.session.user._id;

  desk.add(code, uid, req_.body, function(err, result) {
    response.send(res_, err, result);
  });
};

// 删除·
exports.remove = function(req_, res_) {

  var code = req_.session.user.companycode
    , uid = req_.session.user._id;

  desk.remove(code, uid, req_.body.id, function(err, result) {
    response.send(res_, err, result);
  });
};

exports.wsRefresh = function(data, callback) {
  var code = "diandian"
    , uid = ""
    , deskId = data.deskId;

  desk.get(code, uid, deskId, function(err, result) {
    if(err)
      return callback(err, result);

    service.findStatus(code, deskId, function(err,serviceDocs){
      if(err)
        return callback(err, result);

      if(serviceDocs && serviceDocs.length > 0)
        result._doc.service = serviceDocs[0];

      callback(err, result);
    });
  });
}

