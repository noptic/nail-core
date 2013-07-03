subjectName = 'nail-core'
subject = require("../lib/#{subjectName}.js")
_ = require('underscore')

module.exports =
  'stucture':
    setUp: (done) ->
      @apiMethods = ['use','to']
      @apiProperties = ['modules','parent']
      done()

    'require returned a object ': (test) ->
      test.expect 1
      test.ok (_.isObject subject),
        "subject must be an objet"
      test.done()

    'API methods exist': (test)->
      test.expect @apiMethods.length
      for method in @apiMethods
        test.ok (_.isFunction subject[method]),
          "Missing API method '#{method}'"
      test.done()

    'API properties exists': (test) ->
      test.expect @apiProperties.length
      for property in @apiProperties
        test.ok !(_.isUndefined subject[property]),
          "Missing API property '#{property}'"
      test.done()

  "method 'use'":
    "returns a new NailAPI": (test) ->
      test.expect 5
      returned = subject.use()
      test.notStrictEqual subject, returned,
        "'use' must not return the original subject"
      test.ok (_.isObject returned), "'use ' must return an object"
      for key in ['use','to','modules']
        test.ok !(_.isUndefined returned[key]), "#{key} must be defined"
      test.done()

    "adds modules": (test) ->
      test.expect 2
      modules = [{augment: ->},{augment: ->}]
      newSubject = subject.use modules[0], modules[1]
      test.strictEqual newSubject.modules[0], modules[0],
        "Module must be added to the new instance"
      test.strictEqual newSubject.modules[1], modules[1],
        "Module must be added to the new instance"
      test.done()

  "method 'to'":
    setUp: (done) ->
      @container = {}
      subject.to @container, 'test',
        TestClass: {}

      @instance = new @container.TestClass
      done()

    "creates new constructors": (test) ->
      test.expect 2
      test.ok (_.isFunction @container.TestClass),
        "to must create a new function"
      test.ok _.isObject(@instance),
        "the function create by 'to' must be a constructor"
      test.done()

    "adds meta data to the constructor": (test) ->
      test.expect 4
      test.ok !(_.isUndefined @container.TestClass.container),
        "constructor.container must be defined"
      test.ok !(_.isUndefined @container.TestClass.className),
        "constructor.className must be defined"
      test.equals @container.TestClass.container, @container,
        "constructor.container must reference the object containing the class definition"
      test.equals @container.TestClass.className, 'TestClass',
        "container.className should be 'TestClass' but is '#{@container.TestClass.className}'"
      test.done()

    "uses modules added with 'use'": (test) ->
      out = false
      container = {}
      testModule = augment: (newClass) ->
        out = arguments
      newSubject = subject.use testModule
      testDefinition =
        testClass:
          foo: 'bar'
      newSubject.to container,
        testDefinition
      test.strictEqual out[0], container.testClass,
        "The new class must be passed as first argument"
      test.done()

  "init":
    "is called": (test) ->
      classes = {}
      subject.to classes, 'test',
        Dummy: {}
      classes.Dummy::init = () -> @text = 'foo'
      instance = new classes.Dummy()
      test.equals instance.text, 'foo'
      test.done()

    "passes on the arguments": (test) ->
      classes = {}
      subject.to classes, 'test',
        Dummy: {}
      classes.Dummy::init = (text) -> @text = text
      instance = new classes.Dummy('foo')
      test.equals instance.text, 'foo'
      test.done()

