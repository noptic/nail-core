(function() {
  var NailApi, _;

  _ = require('underscore');

  NailApi = (function() {

    function NailApi() {}

    NailApi.prototype.modules = [];

    NailApi.prototype.parent = null;

    NailApi.prototype.use = function() {
      var module, modules, newInstance, _i, _len;
      newInstance = _.clone(this);
      _.extend(newInstance, {
        parent: this
      }, modules = this.modules.slice(0));
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        module = arguments[_i];
        newInstance.modules.push(module);
      }
      return newInstance;
    };

    NailApi.prototype.to = function(container, namespace, classes) {
      var definition, metaKey, metaValue, module, name, newClass, _i, _len, _ref, _ref1;
      for (name in classes) {
        definition = classes[name];
        newClass = function() {
          return this.init.apply(this, arguments);
        };
        _ref = {
          className: name,
          nail: this,
          container: container,
          namespace: namespace,
          fullyQualifiedName: "" + namespace + "." + name,
          definition: definition
        };
        for (metaKey in _ref) {
          metaValue = _ref[metaKey];
          newClass[metaKey] = metaValue;
        }
        newClass.prototype.init = function() {};
        _ref1 = this.modules;
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          module = _ref1[_i];
          module.augment(newClass);
        }
        container[name] = newClass;
      }
      return this;
    };

    return NailApi;

  })();

  module.exports = new NailApi();

}).call(this);
