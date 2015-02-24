'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    autoprefixer: {
      options: {
        browsers: ['> 1% in US', 'last 2 versions']
      },

      build: {
        src: 'public/css/main.css'
      }
    },

    clean: {
      temp: ['.tmp'],
      dist: ['public']
    },

    concat: {
      iife: {
        options: {
          banner: ';(function(){',
          footer: '}());'
        },

        src: ['public/js/main.min.js'],

        dest: 'public/js/main.min.js'
      }
    },

    connect: {
      options: {
        port: 9000,
        open: true,
        useAvailablePort: true,
        hostname: 'localhost'
      },

      server: {
        options: {
          livereload: true,

          middleware: function (connect) {
            return [
              connect.static('public'),
              connect().use('/scripts', connect.static('./app/scripts')),
              connect().use('/bower_components', connect.static('./bower_components'))
            ];
          }
        }
      },
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd:    'app/',
            src:    [
              '**',
              '!**/*.jade',
              '!**/*.{sass,scss}',
              '!**/*.js'
            ],
            dest:   'public/',
            filter: 'isFile'
          }
        ]
      }
    },

    jade: {
      compile: {
        options: {
          pretty: true
        },

        files: [{
          expand: true,
          cwd:    'app/',
          src:    [
            '**/*.jade',
            '!**/_*.jade'
          ],
          dest:   'public/',
          ext:    '.html'
        }]

      }
    },

    sass: {
      options: {
        includePaths: ['bower_components'],
        outputStyle: 'compressed',
        sourceMap:    true
      },

      dist: {
        files: {
          'public/css/main.css': 'app/styles/main.scss'
        }
      }
    },

    usemin: {
      html: ['public/**/*.html']
    },

    useminPrepare: {
      html: ['public/index.html'],

      options: {
        dest: 'public',
        root: 'app'
      }
    },

    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },

      livereload: {
        options: {
            livereload: true
        },

        files: [
          'public/**/*.html',
          'public/css/**/*.css',
          'public/js/**/*.js',
          'app/scripts/**/*.js'
        ]
      },

      other: {
        files: [
          'app/**',
          '!app/**/*.jade',
          '!app/styles/**/*.{sass,scss}',
          '!app/scripts/**'
        ],
        tasks: ['copy']
      },

      jade: {
        files: ['app/**/*.jade'],
        tasks: ['jade']
      },

      sass: {
        files: ['app/styles/**/*.{scss,sass}'],
        tasks: ['sass', 'autoprefixer']
      }
    },

    wiredep: {
      build: {
        src: ['public/**/*.html']
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('setup', [
    'clean',
    'copy',
    'jade',
    'sass',
    'autoprefixer'
  ]);
  grunt.registerTask('build', ['setup', 'combinejs']);
  grunt.registerTask('serve', ['setup', 'wiredep', 'connect', 'watch']);
  grunt.registerTask('combinejs', [
    'clean:temp',
    'wiredep:build',
    'useminPrepare',
    'concat:generated',
    'uglify:generated',
    'usemin',
    'concat:iife',
    'clean:temp'
  ]);
};
