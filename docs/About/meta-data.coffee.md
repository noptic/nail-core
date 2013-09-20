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
[About.meta-data]: meta-data.coffee.md
[About.modules]: modules.coffee.md
[About.namespaces]: namespaces.coffee.md
[NailApi]: ../NailApi.coffee.md
[NailApi.lib]: ../NailApi/lib.coffee.md
[NailApi.modules]: ../NailApi/modules.coffee.md
[NailApi.parent]: ../NailApi/parent.coffee.md
[NailApi.to]: ../NailApi/to.coffee.md
[NailApi.use]: ../NailApi/use.coffee.md

[nail]: https://github.com/noptic/nail
[npm]: https://github.com/noptic/nail

[About].meta-data
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

    describe 'About.meta-data', ->
      lib = {}
      classDefinition = {}
      nail.to lib, 'MyNamespace',
        MyClass: classDefinition
      instance = new lib.MyClass()

Meta data about each class is added to the class constructor.
This meta data includes:

name - The class name.

      it 'contains the class name', ->
        instance.constructor.className.should.equal 'MyClass'

nail - The NailApi which was used to define the class.

      it 'contains the NailApi', ->
        instance.constructor.nail.should.equal nail

container - The container the class was added to.

      it 'contains the class container', ->
        instance.constructor.container.should.equal lib

namespace - The classes namespace.

      it 'contains the namespace', ->
        instance.constructor.namespace.should.equal 'MyNamespace'

fullyQualifiedName - The classes fully qualified class name.

      it 'contains the fully qualified class name', ->
        instance.constructor.fullyQualifiedName.should.equal 'MyNamespace.MyClass'

definition - The class definition.

      it 'contains the original class definition', ->
        instance.constructor.definition.should.equal classDefinition

      nail.lib = {}
      




