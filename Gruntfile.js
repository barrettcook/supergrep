module.exports = function(grunt) {

  grunt.initConfig({
    nodemon: {
      dev: {
        script: 'stream.js',
        options: {
          args: ['config.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('default', ['nodemon']);

};
