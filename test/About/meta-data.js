var nail, should, _;

should = require('should');

nail = require('../../coverage/instrument/lib/module.js');

_ = require('underscore');

describe('meta data', function() {
  var classDefinition, instance, lib;
  lib = {};
  classDefinition = {};
  nail.to(lib, 'MyNamespace', {
    MyClass: classDefinition
  });
  instance = new lib.MyClass();
  it('contains the class name', function() {
    return instance.constructor.className.should.equal('MyClass');
  });
  it('contains the NailApi', function() {
    return instance.constructor.nail.should.equal(nail);
  });
  it('contains the class container', function() {
    return instance.constructor.container.should.equal(lib);
  });
  it('contains the namespace', function() {
    return instance.constructor.namespace.should.equal('MyNamespace');
  });
  it('contains the fully qualified class name', function() {
    return instance.constructor.fullyQualifiedName.should.equal('MyNamespace.MyClass');
  });
  it('contains the original class definition', function() {
    return instance.constructor.definition.should.equal(classDefinition);
  });
  return nail.lib = {};
});
