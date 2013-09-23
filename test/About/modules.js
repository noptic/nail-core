var nail, _;

nail = require('../../coverage/instrument/lib/module.js');

_ = require('underscore');

module.exports.simpleProperties = {
  augment: function(newClass) {
    if (!(_.isUndefined(newClass.definition.properties))) {
      return _.extend(newClass.prototype, newClass.definition.properties);
    }
  }
};

module.exports.simpleMethods = {
  augment: function(newClass) {
    var name, value, _ref, _results;
    if (!(_.isUndefined(newClass.definition.methods))) {
      _ref = newClass.definition.methods;
      _results = [];
      for (name in _ref) {
        value = _ref[name];
        if (_.isFunction(value)) {
          _results.push(newClass.prototype[name] = value);
        } else {
          _results.push(newClass.prototype[name] = function() {
            return value;
          });
        }
      }
      return _results;
    }
  }
};
