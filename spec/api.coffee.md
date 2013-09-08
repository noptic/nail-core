nail-core
=========
nail creates classes from structured objects, using a seperate module for every
aspect of the class like properties and methods. The `nail-core` offers an API
to bundle modules into a new `NailApi`.

The core itself is a instance of `NailApi`and adds important meta data to the
constructor.

Definitions
----------

    should  = require 'should'
    nail    = require '../coverage/instrument/lib/module.js'
    _       = require 'underscore'
    they    = it #more natural language for describing array properties

Module Structure
----------------
The module exports an instance of `NailApi`.

    describe 'NailApi', ->

The instance is an object.

      it 'is an object', ->
        nail.should.be.a 'object'

The intance has the properties

 - parent
 - modules
 - lib
 - use
 - to

      it 'has a "parent" property', ->
        nail.should.have.property 'parent'

      it 'has a "modules" property', ->
        nail.should.have.property 'modules'

      it 'has a "lib" property', ->
        nail.should.have.property 'lib'

      it 'has a "use" property', ->
        nail.should.have.property 'use'

      it 'has a "to" property', ->
        nail.should.have.property 'to'

function use
------------
The `use` function creates a new instance of NailApi.

    describe 'the function "use"', ->
      it 'is a function', ->
        nail.use.should.be.a 'function'

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

function to
-----------
This function creates one or more new classes.
It accepts an object containing class definitions as it´s last parameter.

    describe 'the function "to"', ->

      it 'is a function', ->
        nail.to.should.be.a 'function'

      it 'returns an empty object ifcalled with no arguments', ->
        nail.to().should.eql({})

      it 'returns a object containing constructors', ->
        lib = nail.to
          MyClass: {}
        instance = new lib.MyClass()
        (instance instanceof lib.MyClass).should.be.ok

###containers and namespaces
`to(container, definitions)` Callng `to` with 2 parameters,
container and definitions, adds all new classes to the container.

The container must be an object.

A refference to the container will be added to the classes meta data.

      describe 'using a container', ->

        it 'adds classes to a existing container', ->
          lib = {}
          nail.to lib,
            MyClass: {}
          instance = new lib.MyClass()
          (instance instanceof lib.MyClass).should.be.ok

        it 'keeps the containers properties', ->
          lib = foo: 'bar'
          nail.to lib,
            MyClass: {}
          lib.foo.should.equal 'bar'

`to(namespace, definitions)` Callng `to` with 2 parameters,
namespace and definitions, adds all new classes to a namespace.

The namespace must be a string.

Every class with a namespace has a fully qualified name containing the
namespace and the class name.

The namespace and the fully qulified class name are added to the classes meta
data.

      describe 'using a namespace', ->

        beforeEach -> nail.lib = {}

        it 'adds classes to nail.lib', ->
          lib = nail.to 'MyNamespace', MyClass: {}
          nail.lib['MyNamespace.MyClass'].should.equal lib.MyClass

Classes can be added to a container and a namespace by calling
`to(container, namespace, definitions`.

        it 'adds classes to nail.lib and a container', ->
          lib = {}
          nail.to lib, 'MyNamespace', MyClass: {}
          lib.MyClass.should.equal nail.lib['MyNamespace.MyClass']

By default all instances of `NailApi` share one class libary.

        it 'shares one class libary on all APIs',->
          newNail = nail.use()
          nail.to 'MyNamespace', MyClass: {}
          className = 'MyNamespace.MyClass'
          nail.lib[className].should.equal newNail.lib[className]


        it 'can use a seperate class libary',->
          newNail = nail.use()
          newNail.lib = {}
          nail.to 'MyNamespace', MyClass: {}
          className = 'MyNamespace.MyClass'
          newNail.lib.should.not.have.property className

Every fully qualified name must be unique. Defining 2 classes with the same
fully qualifiedname will throw an error.

        it 'requires a unique class name', ->
          lib = nail.to 'MyNamespace', MyClass: {}
          (-> do nail.to('MyNamespace', MyClass: {}) for [1..2]).should.throw()

###meta data
Meta data about each class is added to the class constructor.
Thus meta data includes:

 - name - The class name
 - nail - The NailApi which was used to define the class
 - container - The class the container was added to
 - namespace - The classes namespace
 - fullyQualifiedName - The classes fully qualified class name
 - definition - The normalized class definition

      describe 'adds meta data to the constructor, which', ->
        lib = {}
        classDefinition = {}
        nail.to lib, 'MyNamespace',
          MyClass: classDefinition
        instance = new lib.MyClass()

        it 'contains the class name', ->
          instance.constructor.className.should.equal 'MyClass'

        it 'contains the NailApi', ->
          instance.constructor.nail.should.equal nail

        it 'contains the class container', ->
          instance.constructor.container.should.equal lib

        it 'contains the namespace', ->
          instance.constructor.namespace.should.equal 'MyNamespace'

        it 'contains the fully qualified class name', ->
          instance.constructor.fullyQualifiedName.should.equal 'MyNamespace.MyClass'

        it 'contains the original class definition', ->
          instance.constructor.definition.should.equal classDefinition

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