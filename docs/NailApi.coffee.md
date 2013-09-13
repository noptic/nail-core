
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


[NailApi.modules]: ./NailApi.modules.coffee.md
[NailApi.to]: ./NailApi.to.coffee.md
[NailApi.use]: ./NailApi.use.coffee.md
[NailApi.parent]: ./NailApi.parent.coffee.md
[NailApi.lib]: ./NailApi.lib.coffee.md
[NailApi]: ./NailApi.coffee.md

NailApi
=============
nail creates classes from structured objects, using a seperate module for every
aspect of the class like properties and methods. The `nail-core` offers an API
to bundle modules into a new `NailApi`.

The core itself is a instance of `NailApi`and adds important meta data to the
constructor.

Definitions
-----------

    should  = require 'should'
    nail    = require '../coverage/instrument/lib/module.js'
    _       = require 'underscore'
    they    = it #more natural language for describing array properties

Creating an API
---------------
`nail-core` does not expose the constructor of `NailApi`.
To create a new API use [NailApi.use].

Structure
---------
The module exports an instance of `NailApi`.

    describe 'nail-core', ->

The instance is an object.

      it 'is an object', ->
        nail.should.be.a 'object'

The object has 3 properties:

APIs must be created with the factory method [NailApi.use].
The API which creates a new API is considered the
new API's [parent][NailApi.parent].

      it 'has a "parent" property', ->
        nail.should.have.property 'parent'

The array [modules][NailApi.modules] contains all modules this API uses.

      it 'has a "modules" property', ->
        nail.should.have.property 'modules'

The object [lib][NailApi.lib] containing namespaced classes
created by *all* APIs.

      it 'has a "lib" property', ->
        nail.should.have.property 'lib'

The object has 2 methods:

[NailApi.use] creates a new API with additional modules.

      it 'has a "use" property', ->
        nail.should.have.property 'use'

[NailApi.to] creates new classes.

      it 'has a "to" property', ->
        nail.should.have.property 'to'