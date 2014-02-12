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

    if (typeof define !== 'function') {
        var define = require('amdefine')(module);
    }

    var requirejs = require('requirejs');
    requirejs.config(require('./require.js'));

    var deps = [
        './apps/default',
        './modules/cli',
        './modules/core',
        './modules/config',
        './modules/etl',
        './modules/logger',
        './modules/mongo',
        './modules/utils',
        './modules/webapp',
        'deferred',
        'dependable',
        'util',
        'path'
    ];

    define(deps, function (DefaultApp, Cli, Core, Config, Etl, Logger, Mongo, Utils, Webapp, deferred, dependable, util, path) {
        ///*
        var resolver = dependable.container();

        // Load Command Line Interface Module
        var cli = new Cli(resolver);

        resolver.register('cli', cli);

        // Setup CLI options
        cli.args()
            .usage('Simple Microscratch Application.\nUsage: $0')
            .describe('h, help', 'Show Help')
            .describe('c, config', 'Config file')
            .default('c, config', path.join(__dirname, './config'))
            .describe('e, env', 'Specify environment')
            .default('e, env', 'local')
            .describe('o, option', 'Override option (name=value, server.port=1234)')
            .describe('v, verbose', 'Verbose output');

        var args = cli.args();
        var argv = args.argv;

        if (argv["v"] || argv["verbose"]) {
            console.log("Parsed options: " + JSON.stringify(argv, null, 4));
        }

        if (argv["h"] || argv["help"]) {
            console.log(args.help());
            return;
        }

        var config = new Config();
        config.load(path.join(__dirname, 'config.js'), argv['e'] || "local");

        resolver.register('config', config);

        var logger = new Logger(resolver);
        resolver.register('logger', logger);

        if (argv['v'] || argv['verbose']) {
            config.verbose = true;
        }

        var mongo = new Mongo(resolver);
        resolver.register('mongo', mongo);

        if(config.verbose) {
            logger.log("Config loaded: " + JSON.stringify(config, null, 4));
        }

        // Create app instance
        var app = new DefaultApp(resolver);
        app.run();
        //*/
    });
}());
