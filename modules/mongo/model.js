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

(function() {
    'use strict';

    var define = require('amdefine')(module);

    /**
     * Array of modules this one depends on.
     * @type {Array}
     */
    var deps = [
        'events',
        'mongoose',
        'mongoose-times',
        'util'
    ];

    define(deps, function(events, mongoose, timestamps, util) {
        var exports = module.exports = function Model(schema, model) {
            this.schema = schema;
            this.model = model;
        };

        util.inherits(exports, events.EventEmitter);

        exports.schemas = {};

        exports.models = {};

        exports.prototype.schema = null;

        exports.prototype.model = null;

        exports.wirePlugin = function(schema, plugin) {
            var p = require(plugin.path);
            schema.plugin(p, plugin.options);

        };

        exports.declareSchema = function(name, schema) {
            /**
             * Client Schema
             */
            var res = new  mongoose.Schema(schema, { collection: name });

            res.plugin(timestamps, {
                created: "createdAt",
                lastUpdated: "updatedAt"
            });

            exports.schemas[name] = res;

            return res;
        };

        exports.declareModel = function(name, schema) {
            var res = mongoose.model(name, schema);

            exports.models[name] = res;

            return res;
        };
    });

})();
