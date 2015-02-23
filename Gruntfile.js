'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.initConfig({
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'app/', src: ['**'], dest: 'public/', filter: 'isFile'}
        ]
      }
    },
    jade: {
      compile: {
        files: [{expand: true, cwd: 'app/', src: ['**/*.jade'], dest: 'public/', ext: '.html'}]
      }
    }
  });

  grunt.registerTask('default', []);
  grunt.registerTask('build', ['copy', 'jade']);
};
