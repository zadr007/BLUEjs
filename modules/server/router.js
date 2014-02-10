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
        module.exports.initialize = function (microscratch, app) {
            var d = deferred();

            var readdir = deferred.promisify(fs.readdir);

            var self = this;
            var routesDir = path.join(__dirname, './routes');
            readdir(routesDir).then(function (files) {
                for (var i = 0; i < files.length; i++) {
                    var routePath = "./routes/" + files[i];

                    var route = require(routePath);
                    route(microscratch, app);
                }

                d.resolve(self);
            });

            return d.promise();

        };
    });

}());
