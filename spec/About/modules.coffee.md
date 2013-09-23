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

       
