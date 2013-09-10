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
To create a new build enviroment use the api function [use]:

```coffee
myNail = require('nail-core').use myModule, myOtherModule
```

It is recomended to define your nail builder in a seperate file and load it
with require:

```coffee
module.exports = require(nail-core).use myModule, myOtherModule
```

Once you have created a nail builder you can create new classes with the "[to]"
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