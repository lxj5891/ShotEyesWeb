
var response  = smart.framework.response
  , util      = smart.framework.util
  , errors    = smart.framework.errors
  , context   = smart.framework.context
  , log       = smart.framework.log



exports.nodeList = function(req,res){
  res.json([
    {
      "id": "1",
      "text": "报告管理",
      "iconCls": "icon-application",
      "checked": true,
      "attributes": {
        "markUrl": null,
        "code": null,
        "type": 0,
        "url": null
      },
      "children": [
        {
          "id": "42",
          "text": "报告瀑布流",
          "iconCls": "icon-group",
          "checked": false,
          "attributes": {
            "markUrl": "/base/role*",
            "code": null,
            "type": 0,
            "url": "/ui/report/pull"
          },
          "children": [],
          "state": "open"
        },
        {
          "id": "43",
          "text": "报告管理",
          "iconCls": "icon-group",
          "checked": false,
          "attributes": {
            "markUrl": "/base/organ*",
            "code": null,
            "type": 0,
            "url": "/ui/reportList"
          },
          "children": [],
          "state": "open"
        },
        {
          "id": "282",
          "text": "分类管理",
          "iconCls": "icon-folder",
          "checked": false,
          "attributes": {
            "markUrl": "/catalog",
            "code": null,
            "type": 0,
            "url": "/catalog"
          },
          "children": [],
          "state": "open"
        },
        {
          "id": "44",
          "text": "用户管理",
          "iconCls": "icon-user",
          "checked": false,
          "attributes": {
            "markUrl": "/base/user*",
            "code": null,
            "type": 0,
            "url": "/ui/user"
          },
          "children": [],
          "state": "open"
        }

      ],
      "state": "open"
    }
  ]);
}

