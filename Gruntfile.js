module.exports = function(grunt) {

  grunt.initConfig({
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          args: ['config.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['nodemon']);

};
