'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
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

        src: ['public/scripts/main.min.js'],

        dest: 'public/scripts/main.min.js'
      }
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

    wiredep: {
      dev: {
        src: [
          'app/**/*.html',
          'app/**/*.jade'
        ]
      },

      build: {
        src: ['public/**/*.html']
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('build', [
    'clean',
    'copy',
    'jade',
    'sass',
    'combinejs'
  ]);
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
