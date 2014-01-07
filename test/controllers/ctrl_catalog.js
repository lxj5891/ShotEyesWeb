var should = require('should');
var context   = smart.framework.context
var Catalog      = require("../../controllers/ctrl_catalog.js");

describe('../../controllers/ctrl_catalog.js', function () {
  var handler = new context().create("52946dc7dc0ac8bb12000001",null,"ja");
  var newCatalog = {
    name : "name" ,
    description : "description"
  };
  var newId;
  it('should add ok', function (done) {

    handler.addParams("newCatalog",newCatalog);

    Catalog.add(handler,function(err,catalog){
      should.not.exist(err);
      catalog.should.have.property('name', 'name');
      catalog.should.have.property('description', 'description');
      newId = catalog._id;

      done();
    });

  });

  it('should getList ok', function (done) {
    Catalog.getList(handler,function(err,result){
      should.not.exist(err);
      result.rows.length.should.be.above(0);
      done();
    });
  });

  it('should update ok', function (done) {
    newCatalog._id = newId;
    newCatalog.name = "update";
    handler.addParams("newCatalog",newCatalog);
    Catalog.add(handler,function(err,catalog){
      should.not.exist(err);
      catalog.should.have.property('name', 'update');
      catalog.should.have.property('description', 'description');
      done();
    });
  });

  it('should update ok', function (done) {
    handler.addParams("id",newId);
    Catalog.remove(handler,function(err,ok){
      should.not.exist(err);
      should.exist(ok);
      done();
    });
  });


});