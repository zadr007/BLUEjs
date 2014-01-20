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

(function () {
    'use strict';

    var deferred = require('deferred'),
        path = require('path'),
        utils = require('./modules/utils');

    var defaultConfig = "config.js";
    var defaultEnv = "local";

    var opts = require('optimist')
            .usage('Simple Microscratch Application.\nUsage: $0')
            .describe('h, help', 'Show Help')
            .describe('c, config', 'Config file')
            .default('c, config', defaultConfig)
            .describe('e, env', 'Specify environment')
            .default('e, env', defaultEnv)
            .describe('o, option', 'Override option (name=value, server.port=1234)')
            .describe('v, verbose', 'Verbose output')
        ;

    var argv = opts.argv;

    if (argv["v"] || argv["verbose"]) {
        console.log("Parsed options: " + JSON.stringify(argv, null, 4));
    }

    if (argv["h"] || argv["help"]) {
        console.log(opts.help());
        return;
    }

    var configPath = argv["c"] || argv["config"] || defaultConfig;
    var env = argv["e"] || argv["env"] || defaultEnv;

    /**
     * Loaded config file
     * @type {*}
     */
    var config = utils.loadConfig(path.join(__dirname, configPath), env);

    if (argv["v"] !== undefined || argv["verbose"] !== undefined) {
        config.verbose = argv["v"] || argv["verbose"];
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

    if (config.verbose) {
        console.log("Config loaded: " + JSON.stringify(config, null, 4));
    }

    //*
    var Server = require('./modules/server');
    var app = new Server(config);
    app.initialize().done(function (res) {
        app.main();
    });
    //*/
}());
