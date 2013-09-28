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
[About.x-calls]: x-calls.coffee.md
[NailApi]: ../NailApi.coffee.md
[NailApi.lib]: ../NailApi/lib.coffee.md
[NailApi.modules]: ../NailApi/modules.coffee.md
[NailApi.parent]: ../NailApi/parent.coffee.md
[NailApi.to]: ../NailApi/to.coffee.md
[NailApi.use]: ../NailApi/use.coffee.md

[nail]: https://github.com/noptic/nail
[npm]: https://github.com/noptic/nail

[About].x-calls
===============
Definitions
-----------
This document reuses the example API from [NailApi.use]
    should  = require 'should'
    nail    = require '../NailApi/use'
    _       = require 'underscore'
    
Description
-----------
In coffe- and javascript some concepts are very common but do not follow a
common naming convention (initialization,events,errors).

Instead of enforcing a naming convention nail provides 'x-calls' as an indirect 
way to call standart functions.

x-calls are functions which serve as placeholders for a later implementation.

x-calls SHOULD not be used abovv the [nail-module][About.modules] level.

Example
-------
Some grameworks use a gunction called `init` to initialize an instance and some
use a function called `construct`.

    describe 'The x-call x:core:init', ->
    
We can map the initialization to `construct`
      
      describe 'canbe maped to "construct"', ->
        modConstruct = augment: (newClass) ->
          newClass::['x:core:init'] -> @construt.apply this, arguments
        
        myNail = nail.use(modConstruct)
        
        lib = myNail.to Person:
          properties:
            name: 'anon'
            location: 'unknown'
          methods:
            construct: (name, location) ->
              @name = name if arguments.length >0
              @location = location if arguments.length >1
              
        ben = new lib.Person('Ben','home')
        ben.name.should.equal 'Ben'
        ben.location.should.equal 'home'
Core level x-calls
--------------....
The nail-core defines the following x-calls:

###x:core:init(argument1, ..., argumentN)
Called by the class constructor to initilize an instance.

###x:core:error(Error e)
Handles [nail-module][About.modules] level errors.

###x:core:event(object EventParameters)
###x:core:get(string name)
Rreturns the property 'name' of the instance.

### x:core:set(string name,value)
Sets the instance property 'name' to 'value'
