module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-filerev-replace');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-sass');

  // Default task.
  grunt.registerTask('default', ['jshint','build']);
  grunt.registerTask('build', ['clean','html2js','concat','copy','sass:build']);
  grunt.registerTask('release', ['clean','html2js','uglify','jshint','concat:index','copy','sass:release','postcss','filerev','filerev_replace']);

  // Print a timestamp (useful for when watching)
  grunt.registerTask('timestamp', function() {
    grunt.log.subhead(Date());
  });

  // Project configuration.
  grunt.initConfig({
    distdir: 'web',
    pkg: grunt.file.readJSON('package.json'),
    banner:
    '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
    '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
    ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
    src: {
      js: ['src/**/*.js'],
      jsTpl: ['<%= distdir %>/templates/**/*.js'],
      specs: ['test/**/*.spec.js'],
      scenarios: ['test/**/*.scenario.js'],
      html: ['src/index.html'],
      tpl: {
        app: ['src/app/**/*.tpl.html']
      },
      scss: ['src/sass/app.scss'],
      scssWatch: ['src/sass/**/*.scss'],
      data: ['src/data/*.json']
    },
    clean: ['<%= distdir %>/*'],
    copy: {
      assets: {
        files: [{
          dest: '<%= distdir %>/assets',
          src : '**',
          expand: true,
          cwd: 'src/assets/'
        }]
      },
      data: {
        files: [{
          dest: '<%= distdir %>/data',
          src : '**',
          expand: true,
          cwd: 'src/data/'
        }]
      },
      fontAwesome: {
        files: [{
          dest: '<%= distdir %>/assets/fonts',
          src : '**',
          expand: true,
          cwd: 'vendor/bower_components/font-awesome/fonts/'
        }]
      },
      access: {
        files: [{
          dest: '<%= distdir %>',
          src : '.htaccess',
          expand: true,
          cwd: 'src/'
        }]
      }
    },
    html2js: {
      app: {
        options: {
          base: 'src/app'
        },
        src: ['<%= src.tpl.app %>'],
        dest: '<%= distdir %>/templates/app.js',
        module: 'templates.app'
      }
    },
    concat:{
      dist:{
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= src.js %>', '<%= src.jsTpl %>'],
        dest:'<%= distdir %>/<%= pkg.name %>.js'
      },
      index: {
        src: ['src/index.html'],
        dest: '<%= distdir %>/index.html',
        options: {
          process: true
        }
      },
      angular: {
        src:[
          'vendor/bower_components/angular/angular.js',
          'vendor/bower_components/angular-route/angular-route.js',
          'vendor/bower_components/angular-resource/angular-resource.js',
          'vendor/bower_components/angular-animate/angular-animate.js',
          'vendor/bower_components/angular-touch/angular-touch.js',
          'vendor/bower_components/angular-sanitize/angular-sanitize.js',
          'vendor/bower_components/angular-aria/angular-aria.js',
          'vendor/bower_components/angular-cookies/angular-cookies.js',
          'vendor/bower_components/angular-translate/angular-translate.js',
          'vendor/bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
          'vendor/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
          'vendor/bower_components/angular-bootstrap/ui-bootstrap-tpls.js'
        ],
        dest: '<%= distdir %>/angular.js'
      }
    },
    uglify: {
      dist:{
        options: {
          banner: "<%= banner %>"
        },
        src:['<%= src.js %>' ,'<%= src.jsTpl %>'],
        dest:'<%= distdir %>/<%= pkg.name %>.js'
      },
      angular: {
        src:['<%= concat.angular.src %>'],
        dest: '<%= distdir %>/angular.js'
      }
    },
    sass: {
      options: {
        sourceMap: true,
        includePaths: [
          'vendor/bower_components/bootstrap-sass/assets/stylesheets/',
          'vendor/bower_components/font-awesome/scss/'
        ]
      },
      build: {
        files: {
          '<%= distdir %>/assets/css/<%= pkg.name %>.css':
          ['<%= src.scss %>']
        }
      },
      release: {
        options: {
          sourceMap: false
        },
        files: {
          '<%= distdir %>/assets/css/<%= pkg.name %>.css':
          ['<%= src.scss %>']
        }
      }
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers:[
              "Android 2.3",
              "Android >= 4",
              "Chrome >= 20",
              "Firefox >= 24",
              "Explorer >= 8",
              "iOS >= 6",
              "Opera >= 12",
              "Safari >= 6"
            ]}),
          require('cssnano')()
        ]
      },
      build: {
        src: '<%= distdir %>/assets/css/<%= pkg.name %>.css'
      }
    },
    filerev: {
      css: {
        src: '<%= distdir %>/assets/css/<%= pkg.name %>.css'
      },
      js: {
        src: '<%= distdir %>/<%= pkg.name %>.js'
      }
    },
    filerev_replace: {
      options: {
        assets_root: '<%= distdir %>'
      },
      views: {
        src: '<%= distdir %>/index.html'
      }
    },
    watch:{
      all: {
        files:['<%= src.js %>', '<%= src.specs %>', '<%= src.scssWatch %>', '<%= src.tpl.app %>', '<%= src.html %>'],
        tasks:['default','timestamp']
      },
      build: {
        files:['<%= src.js %>', '<%= src.specs %>', '<%= src.scssWatch %>', '<%= src.tpl.app %>', '<%= src.html %>'],
        tasks:['build','timestamp']
      }
    },
    jshint:{
      files:['gruntFile.js', '<%= src.js %>', '<%= src.jsTpl %>', '<%= src.specs %>', '<%= src.scenarios %>'],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        globals:{}
      }
    }
  });

};
