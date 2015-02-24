'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: ['public'],

    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd:    'app/',
            src:    [
              '**',
              '!**/*.jade',
              '!**/*.{sass,scss}'
            ],
            dest:   'public/',
            filter: 'isFile'
          }
        ]
      }
    },

    jade: {
      compile: {
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
        sourceMap: true
      },

      dist: {
        files: {
          'public/css/main.css': 'app/styles/main.scss'
        }
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('build', ['clean', 'copy', 'jade', 'sass']);
};
