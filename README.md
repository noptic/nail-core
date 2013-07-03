nail-core
=========
Creates class prototypes and delegates the class creation to all registered
modules.

The core itself only creates a empty protype and a constructor with some metadata.

Metadata.
--------
Every constructor created with nail has the following properties:

 - *nail* the intance of nail which was used to create the class
 - *definition* the definition which is passed to nail when the class is created
 - *container* the container of the class constructor.
 - *className* the classes name within the conatiner (example: 'MyClass')
 - *namespace* a namespace for the class, which should be related or equal to the package name.
 - *fullyQualifiedName* the classes namespace and name connected with a '.'.

Modules
-------
In nail every aspect of a class (inheritance, properties,...) is handled by a
sepearte module.

A Moule is an object with the method `augment(newClass)`. On class creation
all modules augment methods get called.

Modules can not be added to an existing instance of nail. Instead calling nail.use
will return a new instance containing all modules of the called instance plus the modules
passed as arguments.

    myNail = require('nail-core').use( require('nail-extend'),require('my-module') )
