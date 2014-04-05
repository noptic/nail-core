[NailApi].to
============
This function creates one or more new classes.
It accepts an object containing class definitions as the last parameter.

Definitions
-----------
Reuse the [NailApi] defined in [NailApi.use].

    should  = require 'should'
    modules = require '../About/modules'
    nail    = require './use'
    _       = require 'underscore'
    they    = it #more natural language for describing array properties

Structure
---------

    describe 'NailApi.to', ->

      it 'is a function', ->
        nail.to.should.be.a 'function'

Description
-----------

      it 'returns an empty object if called with no arguments', ->
        nail.to().should.eql({})

      it 'returns a object containing constructors', ->
        lib = nail.to
          MyClass: {}
        instance = new lib.MyClass()
        (instance instanceof lib.MyClass).should.be.ok

###Containers and Namespaces
`to(container, definitions)` Callng `to` with 2 parameters,
container and definitions, adds all new classes to the container.

The container must be an object.

A refference to the container will be added to the classes [meta data][About.meta-data].

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
`to(container, namespace, definitions)`.

        it 'adds classes to nail.lib and a container', ->
          lib = {}
          nail.to lib, 'MyNamespace', MyClass: {}
          lib.MyClass.should.equal nail.lib['MyNamespace.MyClass']

Classes can be accesed with the 'dot' syntax and the `cöasses` field.

        it 'adds classes to nail.classes and a container', ->
          lib = {}
          nail.to lib, 'MyNamespace', MyClass: {}
          lib.MyClass.should.equal nail.classes.MyNamespace.MyClass

All instances of `NailApi` share one class libary.

        it 'shares one class libary on all APIs',->
          newNail = nail.use()
          nail.to 'MyNamespace', MyClass: {}
          className = 'MyNamespace.MyClass'
          nail.lib[className].should.equal newNail.lib[className]

Every fully qualified name must be unique. Defining 2 classes with the same
fully qualifiedname will throw an error.

        it 'requires a unique class name', ->
          lib = nail.to 'MyNamespace', MyClass: {}
          (-> do nail.to('MyNamespace', MyClass: {}) for [1..2]).should.throw()

        nail.lib = {}