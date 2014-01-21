/*
 Copyright, 2013, by Tomas Korcak. <korczis@gmail.com>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

module.exports = function (grunt) {
    'use strict';

    var templatesDir = "./public/views/";

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-ember-templates');
    grunt.loadNpmTasks('grunt-neuter');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            banner: '/*! <%=pkg.name%> - v<%=pkg.version%> (build <%=pkg.build%>) - ' +
                '<%=grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT")%> */'
        },

        clean: [
            './public/assets/*.js'
        ],

        emberTemplates: {
            compile: {
                options: {
                    templateName: function (filename) {
                        var res = filename;

                        res = res.replace(templatesDir, '');
                        res = res.replace(/^routes\//, "");

                        return res;
                    }
                },
                files: {
                    "./public/assets/templates.js": [
                        templatesDir + "**/*.hbs"
                    ]
                }
            }
        },

        watch: {
            css: {
                files: [
                    './public/css/**/*.css',
                    './public/css/**/*.less',
                    './public/css/**/*.sass',
                    './public/views/**/*.hbs'
                ],
                tasks: ['build']
            },
        },
    });

    // Build all assets required for running the app
    grunt.registerTask('build', [
        'emberTemplates'
    ]);

    // Default tasks.
    grunt.registerTask('default', [
        'build'
    ]);
};