// 用于网络监控
exports.status = function (req, res) {
  res.json({status: 'success', now: new Date()});
};
