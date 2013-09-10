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
    'validate'
    'coffee'
    'coverageReport'
    'coverage'
    'docs'
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
    packageInfo = grunt.file.readJSON('package.json')
    related = configuration.see
    for module in fs.readdirSync('./node_modules')
      infoPath = "./node_modules/#{module}/package.json"
      if fs.existsSync(infoPath)
        moduleInfo = grunt.file.readJSON(infoPath)
        if moduleInfo.homepage
          related[module] = moduleInfo.homepage
        else
          related[module] ="https://npmjs.org/package/#{module}"
    for component in components
      related[component] = "./#{configuration.path.specs}/#{component}.coffee.md"
    about = fs.readFileSync('about.md').toString().trim()

    about += "\n\nDocumentation\n-------------"
    for component in components
      about += "\n - [#{component}][]"
    about += "\n"

    about += "\n\nDependencies\n------------"
    for name,version of packageInfo.dependencies
      if related[name]
        about += "\n - [#{name}] #{version}"
      else
        about += "\n - #{name} #{version}"
    about += "\n"

    about += "\n\nDev-Dependencies\n----------------"
    for name,version of packageInfo.devDependencies
      if related[name]
        about += "\n - [#{name}] #{version}"
      else
        about += "\n - #{name} #{version}"
    about += "\n"

    for name,link of related
      about += "\n[#{name}]: #{link}"

    fs.writeFileSync('README.md',about)