(function() {
  var NailApi, _;

  _ = require('underscore');

  NailApi = (function() {

    function NailApi() {}

    NailApi.prototype.use = function() {
      var module, newInstance, _i, _len;
      newInstance = _.clone(this);
      newInstance.parent = this;
      newInstance.modules = this.modules.slice(0);
      for (_i = 0, _len = arguments.length; _i < _len; _i++) {
        module = arguments[_i];
        newInstance.modules.push(module);
      }
      return newInstance;
    };

    NailApi.prototype.modules = [];

    NailApi.prototype.parent = null;

    NailApi.prototype.to = function(container, classes) {
      var definition, module, name, newClass, _i, _len, _ref, _results,
        _this = this;
      _results = [];
      for (name in classes) {
        definition = classes[name];
        newClass = function() {
          this.constructor();
          return this.x = 12;
        };
        _ref = this.modules;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          module = _ref[_i];
          module.augment(newClass, definition, this);
        }
        if (_.isUndefined(newClass.prototype.constructor)) {
          newClass.prototype.constructor = function() {};
        }
        _results.push(container[name] = newClass);
      }
      return _results;
    };

    return NailApi;

  })();

  module.exports = new NailApi();

}).call(this);
