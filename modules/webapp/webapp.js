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
        '../core',
        '../server',
        '../sockets',
        '../utils',
        'deferred',
        'path',
        'util'
    ];

    define(deps, function (Core, Server, Sockets, Utils, deferred, path, util) {
        var exports = module.exports = function CoreApp(resolver) {
            // Call super constructor
            CoreApp.super_.call(this, resolver);

            this.cli = this.resolver.get('cli');

            this.config = this.resolver.get('config');

            this.server = new Server(this.resolver);
            this.resolver.register('server', this.server);

            this.sockets = new Sockets(this.resolver);
            this.resolver.register('sockets', this.sockets);

        };

        util.inherits(exports, Core);

        exports.prototype.config = null;

        exports.prototype.cli = null;

        exports.prototype.parseCliOptions = function () {
            var argv = this.cli.args().argv;

            var opts = argv.o || argv.option;
            if (opts) {
                if (Object.prototype.toString.call(opts) !== '[object Array]') {
                    opts = [opts];
                }

                for (var i = 0; i < opts.length; i++) {
                    var opt = opts[i];
                    var tokens = opt.split("=");
                    Utils.setObjectProperty(this.config, tokens[0], tokens[1]);
                }
            }
        };

        exports.prototype.run = function () {
            var d = deferred();

            if (this.cli) {
                this.parseCliOptions();
            }

            var self = this;
            this.server.initialize().then(function (res) {
                return self.sockets.initialize();
            }).done(function (res) {
                d.resolve(self.server.main());
            }, function(err) {
                throw err;
            });

            return d.promise();
        };
    });
}());
