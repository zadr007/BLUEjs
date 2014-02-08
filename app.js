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

    var deferred = require('deferred'),
        logger = require('./modules/logger'),
        path = require('path'),
        util = require('util'),
        utils = require('./modules/utils');

    ///*
    // Load Core Module
    var Core = require('./modules/core');
    var core = new Core({});

    // Load Command Line Interface Module
    var Cli = require('./modules/cli');
    var cli = new Cli(core.modules);
    core.modules.cli = cli;

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

    if (argv["h"] || argv["help"]) {
        console.log(args.help());
        return;
    }

    // Load app module
    var AppModule = require('./modules/core/app');

    var App = function(modules) {
        App.super_.call(this, modules);
    };

    util.inherits(App, AppModule);

    // Create app instance
    var app = new App(core.modules);
    app.run();
    //*/
}());
