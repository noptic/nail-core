[glob]: https://npmjs.org/package/glob
[grunt-contrib-coffee]: https://github.com/gruntjs/grunt-contrib-coffee
[grunt-istanbul-coverage]: https://github.com/daniellmb/grunt-istanbul-coverage
[grunt-istanbul]: https://github.com/taichi/grunt-istanbul
[grunt-simple-mocha]: https://github.com/yaymukund/grunt-simple-mocha
[grunt]: http://gruntjs.com/
[mocha]: https://npmjs.org/package/mocha
[should]: https://github.com/visionmedia/should.js
[underscore]: http://underscorejs.org

[About]: ..\About.coffee.md
[About.generic-commands]: generic-commands.coffee.md
[About.meta-data]: meta-data.coffee.md
[About.modules]: modules.coffee.md
[NailApi]: ..\NailApi.coffee.md
[NailApi.lib]: ..\NailApi\lib.coffee.md
[NailApi.modules]: ..\NailApi\modules.coffee.md
[NailApi.parent]: ..\NailApi\parent.coffee.md
[NailApi.to]: ..\NailApi\to.coffee.md
[NailApi.use]: ..\NailApi\use.coffee.md

[nail]: https://github.com/noptic/nail
[npm]: https://github.com/noptic/nail

[About].modules
===============
Nail delegates the creation of classes to modules.

Definitions
-----------

    nail    = require '../../coverage/instrument/lib/module.js'
    _       = require 'underscore'

Description
-----------

###Creating Modules
Any module implementing a `augment(newClss)` function can serve as a nail module.
Here we craete 2 sample modules to add properties and methods to new classes.
    
####Simple Properties
If the class definition contains a list of properties, the module adds them to 
the prototype:

    module.exports.simpleProperties =
      augment: (newClass) ->
        if  !(_.isUndefined newClass.definition.properties)
          _.extend newClass.prototype, newClass.definition.properties

####Simple Methods
If the class definition contains a list of methods, the module adds them to the 
protoytpe. If the methods value is not a function it creates wrapper function.
      
    module.exports.simpleMethods =
      augment: (newClass) ->
        if  !(_.isUndefined newClass.definition.methods)
          for name,value of newClass.definition.methods
            if _.isFunction value
              newClass::[name] = value
            else
              newClass::[name] = -> value

See
---

 - Create a new [NailApi] with modules and [NailApi.use].
 - Create classes with [NailApi.to]

       
