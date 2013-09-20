[glob]: https://npmjs.org/package/glob
[grunt-contrib-coffee]: https://github.com/gruntjs/grunt-contrib-coffee
[grunt-istanbul-coverage]: https://github.com/daniellmb/grunt-istanbul-coverage
[grunt-istanbul]: https://github.com/taichi/grunt-istanbul
[grunt-simple-mocha]: https://github.com/yaymukund/grunt-simple-mocha
[grunt]: http://gruntjs.com/
[mocha]: https://npmjs.org/package/mocha
[should]: https://github.com/visionmedia/should.js
[underscore]: http://underscorejs.org

[About]: About.coffee.md
[About.meta-data]: About/meta-data.coffee.md
[About.modules]: About/modules.coffee.md
[About.namespaces]: About/namespaces.coffee.md
[NailApi]: NailApi.coffee.md
[NailApi.lib]: NailApi/lib.coffee.md
[NailApi.modules]: NailApi/modules.coffee.md
[NailApi.parent]: NailApi/parent.coffee.md
[NailApi.to]: NailApi/to.coffee.md
[NailApi.use]: NailApi/use.coffee.md

[nail]: https://github.com/noptic/nail
[npm]: https://github.com/noptic/nail

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