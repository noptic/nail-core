# nail-core
#
#
# Copyright (c) 2013 Oliver Anan
# Licensed under the MIT license.
_ = require('underscore')

class NailApi
  modules: []
  parent: null

  use: () ->
    newInstance = _.clone(this)
    _.extend newInstance,
      parent: this
      modules = @modules.slice 0

    for module in arguments
      newInstance.modules.push module

    return newInstance

  to: (container, namespace, classes) ->
    for name,definition of classes
      newClass = () ->
        @init.apply(this, arguments)

      for metaKey, metaValue of {
        className:          name
        nail:               this
        container:          container
        namespace:          namespace
        fullyQualifiedName: "#{namespace}.#{name}"
        definition:         definition
      }
        newClass[metaKey] = metaValue

      newClass::init = () ->

      for module in @modules
        module.augment newClass

      container[name] = newClass

    return this

module.exports = new NailApi()
