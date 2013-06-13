# nail-core
#
#
# Copyright (c) 2013 Oliver Anan
# Licensed under the MIT license.
_ = require('underscore')

class NailApi
  use: () ->
    newInstance = _.clone(this)
    newInstance.parent = this
    newInstance.modules =  @modules.slice 0
    for module in arguments
      newInstance.modules.push module
    return newInstance
  modules: []
  parent: null
  to: (container, classes) ->
    for name,definition of classes
      newClass = () ->
      for module in @modules
        module.augment newClass, definition, this
      container[name] = newClass

module.exports = new NailApi()
