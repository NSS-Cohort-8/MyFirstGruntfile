'use strict';

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    clean: ['public'],
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'app/', src: ['**', '!**/*.jade'], dest: 'public/', filter: 'isFile'}
        ]
      }
    },
    jade: {
      compile: {
        files: [{expand: true, cwd: 'app/', src: ['**/*.jade', '!**/_*.jade'], dest: 'public/', ext: '.html'}]
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('build', ['clean', 'copy', 'jade']);
};
