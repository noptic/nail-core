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
[NailApi]: ../NailApi.coffee.md
[NailApi.lib]: lib.coffee.md
[NailApi.modules]: modules.coffee.md
[NailApi.parent]: parent.coffee.md
[NailApi.to]: to.coffee.md
[NailApi.use]: use.coffee.md

[nail]: https://github.com/noptic/nail
[npm]: https://github.com/noptic/nail

[NailApi].modules
===============

Definitions
-----------

    should  = require 'should'
    nail    = require '../../coverage/instrument/lib/module.js'
    _       = require 'underscore'
    they    = it #more natural language for describing array properties

Description
-----------

    describe 'NailApi.modules', ->
      it 'is an array', ->
        _.isArray(nail.modules).should.be.ok

      it 'is empty by default', ->
        nail.modules.length.should.equal 0

      they 'augment the created class', ->
        flagsModule =
          augment: (newClass) ->
            flags = newClass.definition.flags ? {}
            for name,value of flags
              newClass::[name] = !!value

        myNail = nail.use flagsModule

        lib = myNail.to MyClass:
          flags:
            empty:    false
            useable:  0
            positive: true
            even:     'yes'

        instance = new lib.MyClass()
        instance.empty.should.equal false
        instance.useable.should.equal false
        instance.positive.should.equal true
        instance.even.should.equal true

      they 'are called in the same order as in the array', ->
        calls = []
        module1 = augment: -> calls.push 'module1 calling'
        module2 = augment: -> calls.push 'module2 calling'
        myNail = nail.use()
        myNail.modules = [module1, module2]
        myNail.to myclass: {}
        calls[0].should.equal 'module1 calling'
        calls[1].should.equal 'module2 calling'