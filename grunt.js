/*global module:false*/
module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib');

  grunt.initConfig({
    min: {
      dist: {
        src: ['src/*.js'],
        dest: 'dist/sort.min.js'
      }
    },
	copy: {
		dist: {
	        src: ['src/**/index.html', 'src/**/*.css', 'src/lib/*.js'],
	        dest: 'dist/'
      	}
	 }
  });

  grunt.registerTask('default', 'min copy');
};
