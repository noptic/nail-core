About.meta-data
===============
[NailApi.to] adds meta dat to every new class.
The nail modules require this data to augment the class

Definitions
-----------

    should  = require 'should'
    nail    = require '../../coverage/instrument/lib/module.js'
    _       = require 'underscore'

Structure
---------
###meta data
Meta data about each class is added to the class constructor.
This meta data includes:

    describe 'meta data', ->
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

      nail.lib = {}
      
 - name - The class name
 - nail - The NailApi which was used to define the class
 - container - The class the container was added to
 - namespace - The classes namespace
 - fullyQualifiedName - The classes fully qualified class name
 - definition - The normalized class definition

