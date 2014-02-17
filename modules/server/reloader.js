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
        'dependable',
        'fs',
        'path',
        '../config',
        '../logger',
        '../mongo',
        '../utils'
    ];

    define(deps, function(dependable, fs, path, Config, Logger, Mongo, Utils) {
        function Reloader() {
            var Server = require('./index.js');

            var resolver = dependable.container();

            this.config = new Config();
            this.config.load(path.join(__dirname, '../../config.js'), "local");
            this.config.verbose = true;

            resolver.register('config', this.config);

            var logger = new Logger(resolver);
            resolver.register('logger', logger);

            var mongo = new Mongo(resolver);
            resolver.register('mongo', mongo);

            this.app = new Server(resolver);

            this.queue = this.app.initialize();
        }

        Reloader.prototype.config = null;

        Reloader.prototype.app = null;

        Reloader.prototype.queue = null;

        var reloader = new Reloader();

        module.exports = reloader.app.app;
    });

}());
