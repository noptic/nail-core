[NailApi].use
=============
The `use` function creates a new instance of NailApi with 
additional [modules][About.modules].

Definitions
-----------
Reuse the modules defined in [About.modules].

    should  = require 'should'
    nail    = require '../../coverage/instrument/lib/module.js'
    sampleModules = require '../About/modules'
    _       = require 'underscore'
    they    = it #more natural language for describing array properties

Structure
---------

    describe 'NailApi.use', ->
      it 'is a function', ->
        nail.use.should.be.a 'function'

Description
-----------

      it 'should not return the called object', ->
        nail.use().should.not.equal nail

      it 'should return a copy of nail-core', ->
        should.equal nail.use().prototype, nail.prototype

Any module passed to `use` is added to the new APIs modules, but the called APIs
modules remain unchanged.

Once a API is created it should not be edited. If you have to edit the API you
should do so *before* using or exporting it.

      it 'adds a module to the copy', ->
        newNail = nail.use sampleModules.simpleProperties
        newNail.modules.should.includeEql sampleModules.simpleProperties

      it 'adds multiple modules to the copy', ->
        newNail = nail.use(
          sampleModules.simpleProperties
          sampleModules.simpleMethods
        )
        newNail.modules.should.includeEql sampleModules.simpleProperties
        newNail.modules.should.includeEql sampleModules.simpleMethods
        
      it 'does not change the called API', ->
        newNail = nail.use sampleModules.simpleProperties
        nail.modules.length.should.equal 0

The new APIs `parent` property references the APIs which created the new API.

      it 'sets the copys "parent"', ->
        newNail = nail.use()
        newNail.parent.should.equal nail

###Inheritance
Every new API inherits it's parents modules.

      it 'adds the parents modules to the copy', ->
        parentNail  = nail.use sampleModules.simpleProperties
        childNail   = parentNail.use sampleModules.simpleMethods
        should.equal childNail.modules[0], sampleModules.simpleProperties
        should.equal childNail.modules[1], sampleModules.simpleMethods

###Exporting a Nail API
Nail APIs can be exported like all other objects:

    module.exports = nail.use(
        sampleModules.simpleProperties
        sampleModules.simpleMethods
      )
    
See
---

  - Howto create [modules][About.modules]
  - Create classes with [NailApi.to]