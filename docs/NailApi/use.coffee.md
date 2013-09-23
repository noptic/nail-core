[glob]: https://npmjs.org/package/glob
[grunt-contrib-coffee]: https://github.com/gruntjs/grunt-contrib-coffee
[grunt-istanbul-coverage]: https://github.com/daniellmb/grunt-istanbul-coverage
[grunt-istanbul]: https://github.com/taichi/grunt-istanbul
[grunt-simple-mocha]: https://github.com/yaymukund/grunt-simple-mocha
[grunt]: http://gruntjs.com/
[mocha]: https://npmjs.org/package/mocha
[should]: https://github.com/visionmedia/should.js
[underscore]: http://underscorejs.org

[About]: ../About.coffee.md
[About.meta-data]: ../About/meta-data.coffee.md
[About.modules]: ../About/modules.coffee.md
[About.namespaces]: ../About/namespaces.coffee.md
[NailApi]: ../NailApi.coffee.md
[NailApi.lib]: lib.coffee.md
[NailApi.modules]: modules.coffee.md
[NailApi.parent]: parent.coffee.md
[NailApi.to]: to.coffee.md
[NailApi.use]: use.coffee.md

[nail]: https://github.com/noptic/nail
[npm]: https://github.com/noptic/nail

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