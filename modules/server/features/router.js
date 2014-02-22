// Copyright, 2013-2014, by Tomas Korcak. <korczis@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(function () {
    'use strict';

    var define = require('amdefine')(module);

    /**
     * Array of modules this one depends on.
     * @type {Array}
     */
    var deps = [
        'deferred',
        'fs',
        'path'
    ];

    define(deps, function(deferred, fs, path) {
        /**
         * Intializes router
         * @param microscratch Microscratch app which this router belongs to
         * @param app Express app which this router belongs to
         */
        var exports = module.exports = function FeatureRouter(server) {
            this.server = server;

            var controllersDir = path.join(__dirname, '../controllers');
            return this.initializeControllers(controllersDir);
        };

        exports.prototype.server = null;

        exports.prototype.microscratch = null;

        exports.prototype.app = null;

        /** 
         * Initialize routes dir
         * @param routesDir Path of directory including routes to load
         * @returns {*} Promise
         */
        exports.prototype.initializeControllers = function(controllersDir) {
            var d = deferred();

            var self = this;
            fs.readdir(controllersDir, function (err, files) {
                var res = {};

                files.forEach(function (file) {
                    var parts = file.split(".");
                    if(parts.length === 2 && parts[1].toLowerCase() === "js") {
                        var fullPath = controllersDir + '/' + file;

                        var relPath = path.relative(__dirname, fullPath);
                        self.server.logger.log("Loading controller file '" + relPath + "'");

                        var controllerName = parts[0];

                        var Controller = require(fullPath);
                        var controller = new Controller(self.server);
                        res[controllerName] = controller;
                        controller.init();
                    }
                });

                self.migrations = res;

                d.resolve(self);
            });

            return d.promise();
        };
    });

}());
