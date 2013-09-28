
[glob]: https://npmjs.org/package/glob
[grunt-contrib-coffee]: https://github.com/gruntjs/grunt-contrib-coffee
[grunt-istanbul-coverage]: https://github.com/daniellmb/grunt-istanbul-coverage
[grunt-istanbul]: https://github.com/taichi/grunt-istanbul
[grunt-simple-mocha]: https://github.com/yaymukund/grunt-simple-mocha
[grunt]: http://gruntjs.com/
[mocha]: https://npmjs.org/package/mocha
[should]: https://github.com/visionmedia/should.js
[underscore]: http://underscorejs.org

[nail]: https://github.com/noptic/nail
[npm]: https://github.com/noptic/nail

[About]: spec/About.coffee.md
[About.generic-commands]: spec/About/generic-commands.coffee.md
[About.meta-data]: spec/About/meta-data.coffee.md
[About.modules]: spec/About/modules.coffee.md
[NailApi]: spec/NailApi.coffee.md
[NailApi.lib]: spec/NailApi/lib.coffee.md
[NailApi.modules]: spec/NailApi/modules.coffee.md
[NailApi.parent]: spec/NailApi/parent.coffee.md
[NailApi.to]: spec/NailApi/to.coffee.md
[NailApi.use]: spec/NailApi/use.coffee.md

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

##Setup
Install with npm:
```bash
npm install nail-core
```

Clone with GIT:
```bash
git clone git://github.com/noptic/nail-core.git
```

##Documentation
Head here → [docs](docs)

##Dependencies
 - [underscore] ~1.5.1

##DevDependencies
 - [grunt-contrib-coffee] 0.7.0
 - [grunt] 0.4.1
 - [grunt-simple-mocha] ~0.4.0
 - [mocha] ~1.12.0
 - [should] ~1.2.2
 - [grunt-istanbul-coverage] 0.0.1
 - [grunt-istanbul] ~0.2.3
