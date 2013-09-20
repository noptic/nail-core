About
=====
The `nail-core` serves as a module host for nail build enviroments.

Features
--------

 - create classes from structured objects
 - create custom builders with [modules][About.modules]
 - relevant [meta data][About.meta-data] is added to all constructors
 - optional [namespace][About.namespaces] support
 - lean [API][NailApi]
 
Usage
-----
To create a new build enviroment use [NailApi.use]:

```coffee
myNail = require('nail-core').use myModule, myOtherModule
```

It is recomended to define your nail builder in a seperate file and load it
with require:

```coffee
module.exports = require(nail-core).use myModule, myOtherModule
```

Once you have created a nail builder you can create new classes with the "[NailApi.to]"
function.

```coffee
myNail.to "myNamespace",
  MyClass:
    properties:
      name: 'anon'
    methods:
      hello: ()-> "hello #{@name}"
```

For a quick start use the [nail] bundle.

It already contains some modules and illustartes how to use nail builders
to create new classes.