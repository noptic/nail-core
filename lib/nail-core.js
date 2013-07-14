(function() {
  var NailApi, _;

  _ = require('underscore');

  NailApi = (function() {
    function NailApi() {}

    NailApi.prototype.modules = [];

    NailApi.prototype.parent = null;

    NailApi.prototype.lib = {};

    NailApi.prototype.use = function() {
      var lib, module, modules, newInstance, _i, _len;
      newInstance = _.clone(this);
      _.extend(newInstance, {
        parent: this
      }, modules = this.modules.slice(0), lib = this.lib);
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        module = arguments[_i];
        newInstance.modules.push(module);
      }
      return newInstance;
    };

    NailApi.prototype.to = function(arg1, arg2, arg3) {
      var classes, container, definition, fullyQualifiedName, metaKey, metaValue, module, name, namespace, newClass, _i, _len, _ref, _ref1;
      if (arguments.length >= 3) {
        container = arg1;
        namespace = arg2;
        classes = arg3;
      } else if (arguments.length === 2) {
        if (_.isString(arg1)) {
          container = {};
          namespace = arg1;
          classes = arg2;
        } else if (_.isObject(arg1)) {
          container = arg1;
          namespace = null;
          classes = arg2;
        }
      } else if (arguments.length === 1) {
        container = {};
        namespace = null;
        classes = arg1;
      } else {
        return {};
      }
      for (name in classes) {
        definition = classes[name];
        newClass = function() {
          return this.init.apply(this, arguments);
        };
        fullyQualifiedName = null;
        if (namespace) {
          fullyQualifiedName = "" + namespace + "." + name;
          if (this.lib[fullyQualifiedName]) {
            throw new Error("can not redifine " + fullyQualifiedName);
          }
          this.lib[fullyQualifiedName] = newClass;
        }
        _ref = {
          className: name,
          nail: this,
          container: container,
          namespace: namespace,
          fullyQualifiedName: fullyQualifiedName,
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
      return container;
    };

    return NailApi;

  })();

  module.exports = new NailApi();

}).call(this);
