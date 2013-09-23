var nail, sampleModules, should, they, _;

should = require('should');

nail = require('../../coverage/instrument/lib/module.js');

sampleModules = require('../About/modules');

_ = require('underscore');

they = it;

describe('NailApi.use', function() {
  it('is a function', function() {
    return nail.use.should.be.a('function');
  });
  it('should not return the called object', function() {
    return nail.use().should.not.equal(nail);
  });
  it('should return a copy of nail-core', function() {
    return should.equal(nail.use().prototype, nail.prototype);
  });
  it('adds a module to the copy', function() {
    var newNail;
    newNail = nail.use(sampleModules.simpleProperties);
    return newNail.modules.should.includeEql(sampleModules.simpleProperties);
  });
  it('adds multiple modules to the copy', function() {
    var newNail;
    newNail = nail.use(sampleModules.simpleProperties, sampleModules.simpleMethods);
    newNail.modules.should.includeEql(sampleModules.simpleProperties);
    return newNail.modules.should.includeEql(sampleModules.simpleMethods);
  });
  it('does not change the called API', function() {
    var newNail;
    newNail = nail.use(sampleModules.simpleProperties);
    return nail.modules.length.should.equal(0);
  });
  it('sets the copys "parent"', function() {
    var newNail;
    newNail = nail.use();
    return newNail.parent.should.equal(nail);
  });
  return it('adds the parents modules to the copy', function() {
    var childNail, parentNail;
    parentNail = nail.use(sampleModules.simpleProperties);
    childNail = parentNail.use(sampleModules.simpleMethods);
    should.equal(childNail.modules[0], sampleModules.simpleProperties);
    return should.equal(childNail.modules[1], sampleModules.simpleMethods);
  });
});

module.exports = nail.use(sampleModules.simpleProperties, sampleModules.simpleMethods);
