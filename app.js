
/**
 * Module dependencies.
 */

"use strict";

GLOBAL.smart = require("smartcore");

var http        = smart.lang.http
  , express     = smart.util.express
  , middleware  = smart.framework.middleware
  , loader      = smart.framework.loader
  , log         = smart.framework.log
  , routes      = require("./routes")
  , websocket   = require("./ws/websocket");


var app = express();

/**
 * 初始化smartcore模块
 */
loader.initialize();

/**
 * 初始化express模块
 */
loader.express(app);

app.use(middleware.lang);         // 设定语言
//app.use(middleware.loadCompany);  // 加载用户的公司信息
app.use(middleware.authenticate); // 认证
app.use(middleware.csrftoken);    // 生成CsrfToken
app.use(middleware.timeout);      // 设定超时

routes.guiding( app );

/**
 * 启动服务
 */

if (process.env.NODE_ENV !== 'test') {

  app.listen(app.get("port"));
  console.log("SmartCore server listening on port " + app.get("port"));
  console.log("SmartCore listening on port %d in %s mode", app.get("port"), app.settings.env);

}


module.exports = app;
//exports.app = app;

