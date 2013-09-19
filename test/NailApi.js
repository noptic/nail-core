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
