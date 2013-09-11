[NailApi.use]: ./NailApi.use.coffee.md
[NailApi.to]: ./NailApi.to.coffee.md

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

APIs must be created with calls to [NailApi.use].
Parent is a reference to the API´s parent API.

      it 'has a "parent" property', ->
        nail.should.have.property 'parent'

An array containing all modules this API uses.

      it 'has a "modules" property', ->
        nail.should.have.property 'modules'

An array of namespaced classes created by *all* APIs

      it 'has a "lib" property', ->
        nail.should.have.property 'lib'

The object has 2 methods:

[NailApi.use] creates a new API with additional modules.

      it 'has a "use" property', ->
        nail.should.have.property 'use'

[NailApi.to] creates new classes.

      it 'has a "to" property', ->
        nail.should.have.property 'to'



property modules
----------------

    describe 'modules', ->
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