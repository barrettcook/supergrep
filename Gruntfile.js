module.exports = function(grunt) {

  var configFile = grunt.option('config') || 'config.js';

  grunt.initConfig({
    nodemon: {
      dev: {
        script: 'server.js',
        options: {
          args: [configFile]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['nodemon']);

};
