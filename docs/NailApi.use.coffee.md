
[nail]: https://github.com/noptic/nail
[npm]: https://github.com/noptic/nail
[grunt]: http://gruntjs.com/
[grunt-coffeelint]: https://github.com/vojtajina/grunt-coffeelint
[grunt-contrib-coffee]: https://github.com/gruntjs/grunt-contrib-coffee
[grunt-contrib-concat]: https://github.com/gruntjs/grunt-contrib-concat
[grunt-contrib-nodeunit]: https://github.com/gruntjs/grunt-contrib-nodeunit
[grunt-istanbul]: https://github.com/taichi/grunt-istanbul
[grunt-istanbul-coverage]: https://github.com/daniellmb/grunt-istanbul-coverage
[grunt-jscoverage]: https://github.com/andrewkeig/grunt-jscoverage
[grunt-mocha-cov]: https://github.com/mmoulton/grunt-mocha-cov
[grunt-simple-mocha]: https://github.com/yaymukund/grunt-simple-mocha
[js-yaml]: https://github.com/nodeca/js-yaml
[mocha]: https://npmjs.org/package/mocha
[should]: https://github.com/visionmedia/should.js
[underscore]: http://underscorejs.org


[NailApi.modules]: ./NailApi.modules.coffe.md
[NailApi.to]: ./NailApi.to.coffe.md
[NailApi.use]: ./NailApi.use.coffe.md
[NailApi]: ./NailApi.coffe.md

[NailApi].use
=============
The `use` function creates a new instance of NailApi with additional modules.

Definitions
-----------

    should  = require 'should'
    nail    = require '../coverage/instrument/lib/module.js'
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
should do so *before* using it.

      it 'adds a module to the copy', ->
        module  = augment: 'single module'
        newNail = nail.use module
        newNail.modules.should.includeEql module

      it 'adds multiple modules to the copy', ->
        module1 = augment: 'module1'
        module2 = augment: 'module2'
        newNail = nail.use module1, module2
        newNail.modules.should.includeEql module1
        newNail.modules.should.includeEql module2

      it 'does not change the called API', ->
        module  = augment: 'single module'
        newNail = nail.use module
        nail.modules.length.should.equal 0

The new APIs `parent` property references the APIs which created the new API.

      it 'sets the copys "parent"', ->
        module  = augment: 'single module'
        newNail = nail.use module
        newNail.parent.should.equal nail

Every new API inherits it's parents modules.

      it 'adds the parents modules to the copy', ->
        module1     = augment: 'module1'
        module2     = augment: 'module2'
        parentNail  = nail.use module1
        childNail   = parentNail.use module2
        should.equal childNail.modules[0], module1
        should.equal childNail.modules[1], module2