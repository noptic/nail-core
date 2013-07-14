# nail-core
#
#
# Copyright (c) 2013 Oliver Anan
# Licensed under the MIT license.
_ = require('underscore')

class NailApi
  modules: []
  parent: null
  lib: {}
  use: () ->
    newInstance = _.clone(this)
    _.extend newInstance,
      parent: this
      modules = @modules.slice 0
      lib = @lib
    for module in arguments
      newInstance.modules.push module

    return newInstance

  to: (arg1, arg2, arg3) ->
    if arguments.length >=3
      container = arg1
      namespace = arg2
      classes   = arg3
    else if arguments.length == 2
      if _.isString arg1
        container = {}
        namespace = arg1
        classes = arg2
      else if _.isObject arg1
        container = arg1
        namespace = null
        classes = arg2
    else if arguments.length == 1
      container = {}
      namespace = null
      classes = arg1
    else return {}
    for name,definition of classes
      newClass = () ->
        @init.apply(this, arguments)
      fullyQualifiedName = null
      if namespace
        fullyQualifiedName = "#{namespace}.#{name}"
        if @lib[fullyQualifiedName]
          throw new Error("can not redifine #{fullyQualifiedName}")
        @lib[fullyQualifiedName] = newClass
      for metaKey, metaValue of {
        className:          name
        nail:               this
        container:          container
        namespace:          namespace
        fullyQualifiedName: fullyQualifiedName
        definition:         definition
      }
        newClass[metaKey] = metaValue

      newClass::init = () ->

      for module in @modules
        module.augment newClass

      container[name] = newClass

    return container

module.exports = new NailApi()
