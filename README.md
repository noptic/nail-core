nail-core
=========
The `nail-core` serves as a module host for nail build enviroments.

Setup
-----
Install the module with [npm]:

```bash
npm install nail-core --save`
```

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
nail.to "myNamespace",
  MyClass:
    properties:
      name: 'anon'
    methods:
      hello: ()-> "hello #{@name}"
```

For a quick start use the [nail] bundle.

It already contains some modules and illustartes how to use nail builders
to create new classes.

Documentation
-------------
- [NailApi][NailApi]
    - [modules][NailApi.modules]
    - [to][NailApi.to]
    - [use][NailApi.use]


Dependencies
------------
 - [underscore] ~1.5.1


Dev-Dependencies
----------------
 - [grunt-contrib-coffee] 0.7.0
 - [grunt] 0.4.1
 - [grunt-simple-mocha] ~0.4.0
 - [mocha] ~1.12.0
 - [should] ~1.2.2
 - [grunt-istanbul-coverage] 0.0.1
 - [grunt-istanbul] ~0.2.3

[nail]: https://github.com/noptic/nail
[npm]: https://github.com/noptic/nail
[grunt]: http://gruntjs.com/
[grunt-coffeelint]: https://github.com/vojtajina/grunt-coffeelint
[grunt-contrib-coffee]: https://github.com/gruntjs/grunt-contrib-coffee
[grunt-contrib-concat]: https://github.com/gruntjs/grunt-contrib-concat
[grunt-contrib-nodeunit]: https://github.com/gruntjs/grunt-contrib-nodeunit
[grunt-istanbul]: https://github.com/taichi/grunt-istanbul
[grunt-istanbul-coverage]: https://github.com/daniellmb/grunt-istanbul-coverage
[grunt-jscoverage]: https://github.com/andrewkeig/grunt-jscoverage
[grunt-mocha-cov]: https://github.com/mmoulton/grunt-mocha-cov
[grunt-simple-mocha]: https://github.com/yaymukund/grunt-simple-mocha
[js-yaml]: https://github.com/nodeca/js-yaml
[mocha]: https://npmjs.org/package/mocha
[should]: https://github.com/visionmedia/should.js
[underscore]: http://underscorejs.org
[NailApi.modules]: ./spec/NailApi.modules.coffee.md
[NailApi.to]: ./spec/NailApi.to.coffee.md
[NailApi.use]: ./spec/NailApi.use.coffee.md
[NailApi]: ./spec/NailApi.coffee.md