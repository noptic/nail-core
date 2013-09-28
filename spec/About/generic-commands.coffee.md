[About].generic-commands
========================

Definitions
-----------
Reuse the [NailApi] defined in [NailApi.use]. 

    should      = require 'should'
    parentNail  = require '../NailApi/use'
    nailCore    = require '../../coverage/instrument/lib/module'
    _           = require 'underscore'
    
Description
-----------

    describe 'gerneric-commands', ->

Generic commands provide a consisten interface for common methods:

  - `GEN:construct([arg1], [...], [argN])`
  - `GEN:get(propertyName)`
  - `GEN:set(propertyName, newValue)`
 
###GEN:constructor

      describe 'GEN:constructor', ->

Nail allows you to call your constructor method how ever you want (construct,
init, bigBang) but in order to have it called it has to bound to GEN::construct. 
    
        it 'can be bound to a method', ->
          initMod = 
            augment: (newClass) ->
              newClass::['GEN:constructor'] = @callInit
            callInit: ->
              @init?.apply this, arguments
              return @
          nail = parentNail.use initMod
          
          lib = nail.to Person:
            properties:
              name: 'anon'
            methods:
              init: (name) ->
                if name
                  @name = name

          dave = new lib.Person 'Dave'   
          dave.name.should.equal 'Dave'    

If you want to you can enforce one constructor to rule them all.

        it 'can use a fixed constructor', ->
          injectMod =
            augment: (newClass) ->
              newClass::['GEN:constructor'] = @inject
            inject: (properties) ->
              for name,value of properties
                @[name] = value
              return @
                
          nail = parentNail.use injectMod
          
          lib = nail.to Person:
            properties:
              name: 'anon'
              
          mike = new lib.Person name: 'Mike'
          mike.name.should.equal 'Mike'    

###GEN:set and GEN:get

      describe 'GEN:set and GEN:get', ->
      
The injectMod in the previous example will only work if properties can be set 
without a getter setter method.

To create a inject module which works with or without seters we use GEN:set

        injectMod =
          augment: (newClass) ->
            newClass::['GEN:constructor'] = @inject
          inject: (properties) ->
            for name,value of properties
              @['GEN:set'] name, value
            return @
            
Now that we have module which uses GEN:set we need a property modules which 
supports it

The new Property module can simply assign the value...

        it 'works with simple assignemnets', ->
          simplePropertiesMod =
            augment: (newClass) ->
              newClass::['GEN:set'] =  @genSet
              if !_.isUndefined newClass.definition.properties
                for name,value of newClass.definition.properties
                  newClass::[name] = value
              return @
              
            genSet: (name, value) ->
              @[name] = value
              return @
              
          nail = nailCore.use simplePropertiesMod, injectMod
          
          lib = nail.to Person:
            properties:
              name: 'anon'
            
          sam = new lib.Person
            name: 'Sam'
          
          anon = new lib.Person
          
          sam.name.should.equal 'Sam'
          anon.name.should.equal 'anon'
            
...or use a accessor.

        it 'works with a accessor', ->
          accessorPropertiesMod =
            augment: (newClass) ->
              newClass::['GEN:set'] =  (property,value) -> @[property](value)
              newClass::['GEN:get'] =  (property) -> @[property]()
              
              if ! _.isUndefined newClass.definition.properties
                for name,value of newClass.definition.properties
                  newClass::["_#{name}"] = value
                  newClass::[name] = (newValue) ->
                    if arguments.length == 0
                      return @["_#{name}"]
                    else
                      @["_#{name}"] = newValue
                  
              return @

          nail = nailCore.use accessorPropertiesMod, injectMod
          
          lib = nail.to Person:
            properties:
              name: 'anon'
            
          sam = new lib.Person
            name: 'Sam'
          
          anon = new lib.Person
          sam.name().should.equal 'Sam'
          anon.name().should.equal 'anon'    
              