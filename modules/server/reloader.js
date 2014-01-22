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
        fs = require('fs'),
        path = require('path'),
        utils = require('../utils');

    var Reloader = function () {
        var Server = require('./index.js');

        this.config = utils.loadConfig(path.join(__dirname, "../../config.js"));

        this.app = new Server(this.config);

        this.queue = this.app.initialize();
    };

    Reloader.prototype.config = null;

    Reloader.prototype.app = null;

    Reloader.prototype.queue = null;

    /*
    Reloader.prototype.use = function() {
        console.log("*** USE ***");

        var args = arguments;
        var self = this;
        this.queue = this.queue.then(function(app) {
            app.server.use.apply(app.server, args);

            return deferred(self);
        })
    };

    Reloader.prototype.listen = function() {
        console.log("*** LISTEN ***");

        var args = arguments;
        var self = this;
        this.queue = this.queue.then(function(app) {
            app.server.listen.apply(app.server, args);

            return deferred(self);
        })
    }
    */

    var reloader = new Reloader();

    module.exports = exports = reloader.app.app;
}());
