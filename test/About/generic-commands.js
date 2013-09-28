var nailCore, parentNail, should, _;

should = require('should');

parentNail = require('../NailApi/use');

nailCore = require('../../coverage/instrument/lib/module');

_ = require('underscore');

describe('gerneric-commands', function() {
  describe('GEN:constructor', function() {
    it('can be bound to a method', function() {
      var dave, initMod, lib, nail;
      initMod = {
        augment: function(newClass) {
          return newClass.prototype['GEN:constructor'] = this.callInit;
        },
        callInit: function() {
          var _ref;
          if ((_ref = this.init) != null) {
            _ref.apply(this, arguments);
          }
          return this;
        }
      };
      nail = parentNail.use(initMod);
      lib = nail.to({
        Person: {
          properties: {
            name: 'anon'
          },
          methods: {
            init: function(name) {
              if (name) {
                return this.name = name;
              }
            }
          }
        }
      });
      dave = new lib.Person('Dave');
      return dave.name.should.equal('Dave');
    });
    return it('can use a fixed constructor', function() {
      var injectMod, lib, mike, nail;
      injectMod = {
        augment: function(newClass) {
          return newClass.prototype['GEN:constructor'] = this.inject;
        },
        inject: function(properties) {
          var name, value;
          for (name in properties) {
            value = properties[name];
            this[name] = value;
          }
          return this;
        }
      };
      nail = parentNail.use(injectMod);
      lib = nail.to({
        Person: {
          properties: {
            name: 'anon'
          }
        }
      });
      mike = new lib.Person({
        name: 'Mike'
      });
      return mike.name.should.equal('Mike');
    });
  });
  return describe('GEN:set and GEN:get', function() {
    var injectMod;
    injectMod = {
      augment: function(newClass) {
        return newClass.prototype['GEN:constructor'] = this.inject;
      },
      inject: function(properties) {
        var name, value;
        for (name in properties) {
          value = properties[name];
          this['GEN:set'](name, value);
        }
        return this;
      }
    };
    it('works with simple assignemnets', function() {
      var anon, lib, nail, sam, simplePropertiesMod;
      simplePropertiesMod = {
        augment: function(newClass) {
          var name, value, _ref;
          newClass.prototype['GEN:set'] = this.genSet;
          if (!_.isUndefined(newClass.definition.properties)) {
            _ref = newClass.definition.properties;
            for (name in _ref) {
              value = _ref[name];
              newClass.prototype[name] = value;
            }
          }
          return this;
        },
        genSet: function(name, value) {
          this[name] = value;
          return this;
        }
      };
      nail = nailCore.use(simplePropertiesMod, injectMod);
      lib = nail.to({
        Person: {
          properties: {
            name: 'anon'
          }
        }
      });
      sam = new lib.Person({
        name: 'Sam'
      });
      anon = new lib.Person;
      sam.name.should.equal('Sam');
      return anon.name.should.equal('anon');
    });
    return it('works with a accessor', function() {
      var accessorPropertiesMod, anon, lib, nail, sam;
      accessorPropertiesMod = {
        augment: function(newClass) {
          var name, value, _ref;
          newClass.prototype['GEN:set'] = function(property, value) {
            return this[property](value);
          };
          newClass.prototype['GEN:get'] = function(property) {
            return this[property]();
          };
          if (!_.isUndefined(newClass.definition.properties)) {
            _ref = newClass.definition.properties;
            for (name in _ref) {
              value = _ref[name];
              newClass.prototype["_" + name] = value;
              newClass.prototype[name] = function(newValue) {
                if (arguments.length === 0) {
                  return this["_" + name];
                } else {
                  return this["_" + name] = newValue;
                }
              };
            }
          }
          return this;
        }
      };
      nail = nailCore.use(accessorPropertiesMod, injectMod);
      lib = nail.to({
        Person: {
          properties: {
            name: 'anon'
          }
        }
      });
      sam = new lib.Person({
        name: 'Sam'
      });
      anon = new lib.Person;
      sam.name().should.equal('Sam');
      return anon.name().should.equal('anon');
    });
  });
});
