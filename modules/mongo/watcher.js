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
        logger = require('../logger'),
        merge = require('node.extend'),
        mongodb = require('mongodb'),
        mongoose = require('mongoose');

    var defaultOpts = {
        onDebug: logger.log
    };

    /**
     * Mongo wrapper
     * @type {Mongo}
     */
    var exports = module.exports = function Watcher(mongo) {
        this.mongo = mongo;
    };

    exports.prototype.initialize = function (opts) {
        if (!opts) {
            opts = {};
        }

        var MongoWatch = require('mongo-watch');
        this.watcher = new MongoWatch(merge(true, defaultOpts, opts));

        this.watcher.watch(function (err, data) {
            logger.log("Changed - " + JSON.stringify(data));
        });

        return deferred(this);
    }

    exports.prototype.mongo = null;

    exports.prototype.watcher = null;

}());