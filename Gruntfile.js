/**
 ========TripComp========
 * Author: Eddie Zeltser
 * Create Date:  10/12/2016
 */
'use strict';
module.exports = function (grunt) {
    grunt.file.readJSON('package.json');

// Project configuration.
    grunt.initConfig({
        // Before generating any new files, remove any previously-created files.
        clean: {
            minify: ['target']
        },

        // Configuration to be run (and then tested).
        requirejs: {
            compile: {
                options: {
                    baseUrl: './Client/src/',
                    mainConfigFile: './Client/resources/paths.js',
                    paths: {
                        "jquery": "empty:",
                        "angular": "empty:",
                        "domReady": "empty:",
                        "bootstrap": "empty:",
                        "angular-animate": "empty:",
                        "ngRoute": "empty:",
                        "ngStorage": "empty:",
                        "ui-bootstrap": "empty:",
                        "ngSanitize": "empty:",
                        "ngFileUpload": "empty:",
                        "ngFileUploadShim": "empty:",
                        "bootstrap-dialog": "empty:"
                    },
                    include: './routes.js',
                    out: './target/tmp/Client/TripComp.js',
                    optimize: 'none',
                    error: function (done, err) {
                        grunt.log.warn(err);
                        done();
                    }
                }
            },
            compileForProduction: {
                options: {
                    baseUrl: './Client/src/',
                    mainConfigFile: './Client/resources/paths.js',
                    paths: {
                        "jquery": "empty:",
                        "angular": "empty:",
                        "domReady": "empty:",
                        "bootstrap": "empty:",
                        "angular-animate": "empty:",
                        "ngRoute": "empty:",
                        "ngStorage": "empty:",
                        "ui-bootstrap": "empty:",
                        "ngSanitize": "empty:",
                        "ngFileUpload": "empty:",
                        "ngFileUploadShim": "empty:",
                        "bootstrap-dialog": "empty:"
                    },
                    include: './routes.js',
                    out: './target/tmp/Client/TripComp.min.js',
                    optimize: 'uglify2',
                    uglify2: {mangle: false},
                    done: function (done, build) {
                        grunt.file.write('target/done-build.txt', build);
                        done();
                    },
                    error: function (done, err) {
                        grunt.log.warn(err);
                        done();
                    }
                }
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-internal');
    grunt.loadNpmTasks('grunt-contrib-requirejs');

    // Whenever the "minify" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('minify', ['requirejs']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['requirejs']);

};