'use strict';
/* jshint camelcase: false */

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-deploy-semver');

    grunt.initConfig({
        deploy: {
            options: {
                versionFiles: [
                    'package.json',
                    'bower.json'
                ],
                postDeployFn: function (grunt, newVersion, done) {
                    if (!grunt.option('soft')) {
                        var exec = require('child_process').exec;
                        exec('npm publish', null, function (err, stdout) {
                            console.log(stdout);
                            done();
                        });
                    }
                }
            }
        }
    });

};
