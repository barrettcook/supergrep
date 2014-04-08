module.exports = function(grunt) {

  grunt.initConfig({
    nodemon: {
      dev: {
        script: 'stream.js',
        options: {
          args: ['localConfig.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['nodemon']);

};
