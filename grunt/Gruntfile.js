module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {
            	src: 'src/test.js',
            	dest: 'build/<%= pkg.name %>-v<%= pkg.version %>.js.min.js'
            }
        },

        jshint: {
        	build: ['Gruntfile.js', 'src/*.js'],
        	options: {
        		jshintrc: '.jshintrc'
        	}
        }


    });


    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint','uglify']);

}