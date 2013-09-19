var nail, should, they, _;

should = require('should');

nail = require('../../coverage/instrument/lib/module.js');

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
    var module, newNail;
    module = {
      augment: 'single module'
    };
    newNail = nail.use(module);
    return newNail.modules.should.includeEql(module);
  });
  it('adds multiple modules to the copy', function() {
    var module1, module2, newNail;
    module1 = {
      augment: 'module1'
    };
    module2 = {
      augment: 'module2'
    };
    newNail = nail.use(module1, module2);
    newNail.modules.should.includeEql(module1);
    return newNail.modules.should.includeEql(module2);
  });
  it('does not change the called API', function() {
    var module, newNail;
    module = {
      augment: 'single module'
    };
    newNail = nail.use(module);
    return nail.modules.length.should.equal(0);
  });
  it('sets the copys "parent"', function() {
    var module, newNail;
    module = {
      augment: 'single module'
    };
    newNail = nail.use(module);
    return newNail.parent.should.equal(nail);
  });
  return it('adds the parents modules to the copy', function() {
    var childNail, module1, module2, parentNail;
    module1 = {
      augment: 'module1'
    };
    module2 = {
      augment: 'module2'
    };
    parentNail = nail.use(module1);
    childNail = parentNail.use(module2);
    should.equal(childNail.modules[0], module1);
    return should.equal(childNail.modules[1], module2);
  });
});
