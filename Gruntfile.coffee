module.exports = (grunt) ->
  fs = require 'fs'
  configuration = grunt.file.readJSON('build.json')
  #each component requires a .coffe file in src and a coffe.md file in spec
  components  = configuration.build?.components ?[]
  #non component source files
  sourceFiles = configuration.build?.sourceFiles ?[]

  for component in components
    sourceFiles.push "src/#{component}.coffee"

  if fs.existsSync('src/head.coffee')
    sourceFiles.unshift('src/head.coffee')

  if fs.existsSync('src/foot.coffee')
    sourceFiles.push('src/foot.coffee')

  tests = "#{configuration.path.tests}/**/*.js"
  tasks = "lib/**/*.js"

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    coffee:
      options:
        bare: true
      compile:
        files:
          "lib/module.js": sourceFiles
      specs:
        expand: true
        cwd: configuration.path.specs
        src: ['*.coffee.md','*.coffee','*.litcoffee']
        dest: configuration.path.tests
        ext: '.js'

    simplemocha:
      options:
        globals: ['should']
        timeout: 3000
        ignoreLeaks: false
        ui: 'bdd'
        reporter: 'spec'
      all:
        src: tests

    instrument:
      files: tasks
      options:
        lazy: false
        basePath: "#{configuration.path.coverage}/instrument/"

    storeCoverage:
      options:
        dir: configuration.path.coverage

    reloadTasks:
      rootPath: "#{configuration.path.coverage}/instrument/lib"

    makeReport:
      src: "#{configuration.path.coverage}/**/*.json"
      options:
        type: "lcov"
        dir: configuration.path.docs
        print: "detail"


    coverage:
      options:
        thresholds:
          'statements': configuration.coverage.statements
          'branches':   configuration.coverage.branches
          'lines':      configuration.coverage.lines
          'functions':  configuration.coverage.functions
        dir: 'coverage/reports',
        root: '.'


  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-simple-mocha'
  grunt.loadNpmTasks 'grunt-istanbul-coverage'
  grunt.loadNpmTasks 'grunt-istanbul'

  grunt.registerTask 'test', ['coffee','simplemocha']

  grunt.registerTask 'default', [
    'docs'
    'validate'
    'coffee'
    'coverageReport'
    'coverage'
  ]

  grunt.registerTask 'coverageReport', [
    'coffee'
    'instrument'
    'reloadTasks'
    'simplemocha'
    'storeCoverage'
    'makeReport'
  ]

  grunt.registerTask 'validate', ->
    fs = require 'fs'
    for component in components
      if ! fs.existsSync("#{configuration.path.specs}/#{component}.coffee.md")
        grunt.warn "Missing spec for component #{component}"

  grunt.registerTask 'docs', ->
    fs = require 'fs'
    _ = require 'underscore'
    packageInfo = grunt.file.readJSON('package.json')
    #links from configuration
    related = configuration.see

    #links from moules
    for module in fs.readdirSync('./node_modules')
      infoPath = "./node_modules/#{module}/package.json"
      if fs.existsSync(infoPath)
        moduleInfo = grunt.file.readJSON(infoPath)
        #usemodules homepageif it is set
        if moduleInfo.homepage
          related[module] = moduleInfo.homepage
        #or fallback to the npm page
        else
          related[module] ="https://npmjs.org/package/#{module}"

    about = fs.readFileSync('about.md').toString().trim()

    #Documentation
    about += "\n\nDocumentation\n-------------"
    componentTree = {}
    for component in components
      node = componentTree
      for part in component.split('.')
        if _.isUndefined node.children
          node.children = {}
        if _.isUndefined node.children[part]
          node.children[part] = {}
        node = node.children[part]
      node.link = component

    printTree = (currentNode,indent,callback) ->
      for name,value of currentNode.children
        if value.link
          about += "\n#{indent}- [#{name}][#{value.link}]"
        else
          about += "\n[indent- #{name}"
        if value.children
          callback(value,'    '+indent,callback)

    printTree(componentTree,'',printTree)
    about += "\n"

    #Dependencies
    about += "\n\nDependencies\n------------"
    for name,version of packageInfo.dependencies
      if related[name]
        about += "\n - [#{name}] #{version}"
      else
        about += "\n - #{name} #{version}"
    about += "\n"

    #Dev-Devendencies
    about += "\n\nDev-Dependencies\n----------------"
    for name,version of packageInfo.devDependencies
      if related[name]
        about += "\n - [#{name}] #{version}"
      else
        about += "\n - #{name} #{version}"
    about += "\n"

    externalLinks = ''
    for name,link of related
      externalLinks += "\n[#{name}]: #{link}"
    externalLinks +="\n\n"

    #write README.md
    for component in components
      about = "[#{component}]: ./#{configuration.path.docs}/#{component}.coffee.md\n"+about
    fs.writeFileSync('README.md',externalLinks+about)

    #other docs
    internalLinks = ""
    for component in components
      internalLinks += "[#{component}]: ./#{component}.coffee.md\n"
    for component in components
      spec = fs.readFileSync(
        "./#{configuration.path.specs}/#{component}.coffee.md"
      ).toString().trim()

      fs.writeFileSync(
        "./#{configuration.path.docs}/#{component}.coffee.md"
        [externalLinks,internalLinks,spec].join "\n"
      )
