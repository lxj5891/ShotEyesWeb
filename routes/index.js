
var log       = smart.framework.log
  , apis      = require("./apis.js")
  , user      = require("../apis/user.js")
  , status      = require("../apis/status.js")
  , website      = require("./website.js")

/*
 * GET home page.
 */

exports.guiding = function (app) {
  apis.guiding(app);
  website.guiding(app);

  // site status
  app.get('/status.json', status.status);

  app.get("/",function(req, res) {
    res.render("login", {"title": "login"});
  });

  app.get("/dashboard",function(req, res) {
    res.render("dashboard", {"title": "login"});
  });



  app.get('/simplelogin', function (req, res) {
    user.simpleLogin(req, res);
  });

  // 注销
  app.get("/simplelogout", function (req, res) {
    log.audit("logout");
    user.simpleLogout(req, res);
  });


};
