nail-core
=========
The `nail-core` serves as a module host for nail build enviroments.

Setup
-----
Install the module with: `npm install nail-core --save`

Usage
-----
To create a new build enviroment use the api function [use][]:

```coffee
myNail = require('nail-core').use myModule, myOtherModule
```

It is recomended to define your nail builder in a seperate file and load it
with require:

```coffee
module.exports = require(nail-core).use myModule, myOtherModule
```

For a quick start you an use the [nail] bundle.It  already contains modules
for properties, methods and class inheritance.

Documentation
-------------
Further documentation can be found in the API [specification][]

[specification]: spec/api.coffee.md
[nail]: https://github.com/noptic/nail
[use]: spec/api.coffee.md#function-use