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

    var CoreModule = require('./index'),
        path = require('path'),
        util = require('util'),
        utils = require('../utils');

    var exports = module.exports = function CoreApp(modules) {
        this.modules = modules;
    };

    util.inherits(exports, CoreModule);

    exports.prototype.modules = {};

    exports.prototype.run = function() {
        var argv = this.modules.cli.args().argv;

        if (argv["v"] || argv["verbose"]) {
            console.log("Parsed options: " + JSON.stringify(argv, null, 4));
        }

        var opts = argv["o"] || argv["option"];
        if (opts) {
            if (Object.prototype.toString.call(opts) !== '[object Array]') {
                opts = [opts];
            }

            for (var i = 0; i < opts.length; i++) {
                var opt = opts[i];
                var tokens = opt.split("=");
                utils.setObjectProperty(config, tokens[0], tokens[1]);
            }
        }

        // Initialize config
        var env = argv["e"] || "local";

        var config = utils.loadConfig(path.join(__dirname, '../../config.js'), env);

        // Hard-coded load of config
        this.modules.config = config;

        // Initialize logger
        var Logger = require('../logger');
        this.modules.logger = Logger;

        if (this.modules.config.verbose) {
            this.modules.logger.log("Config loaded: " + JSON.stringify(this.modules.config, null, 4));
        }

        var Server = require('../server');
        var app = new Server(this.modules.config);
        app.initialize().done(function (res) {
            app.main();
        });
    };

}());