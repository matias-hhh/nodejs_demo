module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        mochaTest:  {
            options: {
                reporter: 'spec'
            },
            src: ['app/tests/*.js']
        }
    });
};