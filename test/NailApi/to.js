var modules, nail, should, they, _;

should = require('should');

modules = require('../About/modules');

nail = require('./use');

_ = require('underscore');

they = it;

describe('NailApi.to', function() {
  it('is a function', function() {
    return nail.to.should.be.a('function');
  });
  it('returns an empty object if called with no arguments', function() {
    return nail.to().should.eql({});
  });
  it('returns a object containing constructors', function() {
    var instance, lib;
    lib = nail.to({
      MyClass: {}
    });
    instance = new lib.MyClass();
    return (instance instanceof lib.MyClass).should.be.ok;
  });
  describe('using a container', function() {
    it('adds classes to a existing container', function() {
      var instance, lib;
      lib = {};
      nail.to(lib, {
        MyClass: {}
      });
      instance = new lib.MyClass();
      return (instance instanceof lib.MyClass).should.be.ok;
    });
    return it('keeps the containers properties', function() {
      var lib;
      lib = {
        foo: 'bar'
      };
      nail.to(lib, {
        MyClass: {}
      });
      return lib.foo.should.equal('bar');
    });
  });
  return describe('using a namespace', function() {
    beforeEach(function() {
      return nail.lib = {};
    });
    it('adds classes to nail.lib', function() {
      var lib;
      lib = nail.to('MyNamespace', {
        MyClass: {}
      });
      return nail.lib['MyNamespace.MyClass'].should.equal(lib.MyClass);
    });
    it('adds classes to nail.lib and a container', function() {
      var lib;
      lib = {};
      nail.to(lib, 'MyNamespace', {
        MyClass: {}
      });
      return lib.MyClass.should.equal(nail.lib['MyNamespace.MyClass']);
    });
    it('adds classes to nail.classes and a container', function() {
      var lib;
      lib = {};
      nail.to(lib, 'MyNamespace', {
        MyClass: {}
      });
      return lib.MyClass.should.equal(nail.classes.MyNamespace.MyClass);
    });
    it('shares one class libary on all APIs', function() {
      var className, newNail;
      newNail = nail.use();
      nail.to('MyNamespace', {
        MyClass: {}
      });
      className = 'MyNamespace.MyClass';
      return nail.lib[className].should.equal(newNail.lib[className]);
    });
    it('can use a seperate class libary', function() {
      var className, newNail;
      newNail = nail.use();
      newNail.lib = {};
      nail.to('MyNamespace', {
        MyClass: {}
      });
      className = 'MyNamespace.MyClass';
      return newNail.lib.should.not.have.property(className);
    });
    it('requires a unique class name', function() {
      var lib;
      lib = nail.to('MyNamespace', {
        MyClass: {}
      });
      return (function() {
        var _i, _results;
        _results = [];
        for (_i = 1; _i <= 2; _i++) {
          _results.push(nail.to('MyNamespace', {
            MyClass: {}
          })());
        }
        return _results;
      }).should["throw"]();
    });
    return nail.lib = {};
  });
});
