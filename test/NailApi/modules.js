var nail, should, they, _;

should = require('should');

nail = require('../../coverage/instrument/lib/module.js');

_ = require('underscore');

they = it;

describe('NailApi.modules', function() {
  it('is an array', function() {
    return _.isArray(nail.modules).should.be.ok;
  });
  it('is empty by default', function() {
    return nail.modules.length.should.equal(0);
  });
  they('augment the created class', function() {
    var flagsModule, instance, lib, myNail;
    flagsModule = {
      augment: function(newClass) {
        var flags, name, value, _ref, _results;
        flags = (_ref = newClass.definition.flags) != null ? _ref : {};
        _results = [];
        for (name in flags) {
          value = flags[name];
          _results.push(newClass.prototype[name] = !!value);
        }
        return _results;
      }
    };
    myNail = nail.use(flagsModule);
    lib = myNail.to({
      MyClass: {
        flags: {
          empty: false,
          useable: 0,
          positive: true,
          even: 'yes'
        }
      }
    });
    instance = new lib.MyClass();
    instance.empty.should.equal(false);
    instance.useable.should.equal(false);
    instance.positive.should.equal(true);
    return instance.even.should.equal(true);
  });
  return they('are called in the same order as in the array', function() {
    var calls, module1, module2, myNail;
    calls = [];
    module1 = {
      augment: function() {
        return calls.push('module1 calling');
      }
    };
    module2 = {
      augment: function() {
        return calls.push('module2 calling');
      }
    };
    myNail = nail.use();
    myNail.modules = [module1, module2];
    myNail.to({
      myclass: {}
    });
    calls[0].should.equal('module1 calling');
    return calls[1].should.equal('module2 calling');
  });
});
