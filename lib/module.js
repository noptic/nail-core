var to, _;

_ = require('underscore');

to = function(arg1, arg2, arg3) {
  var classes, container, definition, fullyQualifiedName, metaKey, metaValue, module, name, namespace, newClass, node, part, _i, _j, _len, _len1, _ref, _ref1, _ref2;
  if (arguments.length === 0) {
    return {};
  } else if (arguments.length >= 3) {
    container = arg1;
    namespace = arg2;
    classes = arg3;
  } else if (arguments.length === 2) {
    if (_.isObject(arg1)) {
      container = arg1;
      namespace = null;
      classes = arg2;
    } else {
      container = {};
      namespace = arg1;
      classes = arg2;
    }
  } else {
    container = {};
    namespace = null;
    classes = arg1;
  }
  for (name in classes) {
    definition = classes[name];
    newClass = function() {
      if (!_.isUndefined(this['GEN:constructor'])) {
        return this['GEN:constructor'].apply(this, arguments);
      }
    };
    fullyQualifiedName = null;
    if (namespace) {
      fullyQualifiedName = "" + namespace + "." + name;
      if (this.lib[fullyQualifiedName]) {
        throw new Error("can not redifine " + fullyQualifiedName);
      }
      this.lib[fullyQualifiedName] = newClass;
      node = this.classes;
      _ref = namespace.split('.');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        part = _ref[_i];
        if (_.isUndefined(node[part])) {
          node[part] = {};
        }
        node = node[part];
      }
      node[name] = newClass;
    }
    _ref1 = {
      className: name,
      nail: this,
      container: container,
      namespace: namespace,
      fullyQualifiedName: fullyQualifiedName,
      definition: definition
    };
    for (metaKey in _ref1) {
      metaValue = _ref1[metaKey];
      newClass[metaKey] = metaValue;
    }
    _ref2 = this.modules;
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      module = _ref2[_j];
      module.augment(newClass);
    }
    container[name] = newClass;
  }
  return container;
};

var use;

use = function() {
  var module, newInstance, _i, _j, _len, _len1, _ref;
  newInstance = new NailApi;
  newInstance.parent = this;
  newInstance.modules = [];
  newInstance.lib = this.lib;
  _ref = this.modules;
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    module = _ref[_i];
    newInstance.modules.push(module);
  }
  for (_j = 0, _len1 = arguments.length; _j < _len1; _j++) {
    module = arguments[_j];
    newInstance.modules.push(module);
  }
  return newInstance;
};

var NailApi;

NailApi = (function() {
  function NailApi() {}

  NailApi.prototype.modules = [];

  NailApi.prototype.parent = null;

  NailApi.prototype.lib = {};

  NailApi.prototype.classes = {};

  NailApi.prototype.use = use;

  NailApi.prototype.to = to;

  return NailApi;

})();

module.exports = new NailApi();
