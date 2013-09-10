var nail, should, they, _;

should = require('should');

nail = require('../coverage/instrument/lib/module.js');

_ = require('underscore');

they = it;

describe('nail-core', function() {
  it('is an object', function() {
    return nail.should.be.a('object');
  });
  it('has a "parent" property', function() {
    return nail.should.have.property('parent');
  });
  it('has a "modules" property', function() {
    return nail.should.have.property('modules');
  });
  it('has a "lib" property', function() {
    return nail.should.have.property('lib');
  });
  it('has a "use" property', function() {
    return nail.should.have.property('use');
  });
  return it('has a "to" property', function() {
    return nail.should.have.property('to');
  });
});

describe('modules', function() {
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

var nail, should, they, _;

should = require('should');

nail = require('../coverage/instrument/lib/module.js');

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
  describe('using a namespace', function() {
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
    return it('requires a unique class name', function() {
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
  });
  return describe('adds meta data to the constructor, which', function() {
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
    return it('contains the original class definition', function() {
      return instance.constructor.definition.should.equal(classDefinition);
    });
  });
});

var nail, should, they, _;

should = require('should');

nail = require('../coverage/instrument/lib/module.js');

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
