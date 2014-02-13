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
        '../core',
        '../utils',
        'deferred',
        'express',
        'http',
        'path',
        'util'
    ];

    define(deps, function(Core, Utils, deferred, express, http, path, util) {
        var exports = module.exports = function ServerModule(resolver) {
            ServerModule.super_.call(this, resolver);

            this.config = this.resolver.get('config');

            this.logger = this.resolver.get('logger');

            this.mongo = this.resolver.get('mongo');

            // this.auth = this.resolver.get('auth');

            var modelsDir = path.join(__dirname, "models");
            this.mongo.initializeModelsDir(modelsDir);
        };

        util.inherits(exports, Core);

        /**
         * Express application instance
         */
        exports.prototype.app = null;

        /**
         * Http Server
         * @type {null}
         */
        exports.prototype.server = null;

        /**
         * Auth module instance
         * @type {Auth}
         */
        exports.prototype.auth = null;

        /**
         * Config module instance
         * @type {Config}
         */
        exports.prototype.config = null;

        /**
         * Logger module instance
         * @type {Logger}
         */
        exports.prototype.logger = null;

        /**
         * Mongo module instance
         * @type {Mongo}
         */
        exports.prototype.mongo = null;

        /**
         * Initializes Microscratch application
         * @returns {*} Promise
         */
        exports.prototype.initialize = function () {
            var d = deferred();

            var self = this;

            this.app = express();
            this.server = http.createServer(this.app);

            this.setup().then(function (res) {
                return self.mongo.initialize(self);
            }).then(function (res) {
                return deferred(self);
            }).done(function(res) {
                d.resolve(res);
            }, function(err) {
                throw err;
            });

            return d.promise();
        };

        /**
         * Microscratch application entry-point
         */
        exports.prototype.setup = function () {
            // Initialize views
            this.initFeature('./features/views');

            this.app.use(express.bodyParser());
            this.app.use(express.methodOverride());

            // Initialize router
            var res = this.initFeature('./features/router');

            // Initialize logger
            this.initFeature('./features/logger');

            // Initialize sessions
            this.initFeature('./features/sessions');

            // Initialize gzip
            this.initFeature('./features/gzip');

            // TODO: Preprocess generated client config somewhere else
            // Preprocess config template
            Utils.preprocessFile(this.config.client.configTemplate,
                this.config.client.configDestination,
                {
                    '"$app$"': JSON.stringify(this.config.app)
                });

            return res;
        };

        /**
         * Microscratch application entry-point
         */
        exports.prototype.main = function () {
            this.server.listen(this.config.server.port);
            this.logger.log('Listening on port ' + this.config.server.port);
        };

        exports.prototype.initFeature = function(path) {
            var Feature = require(path);
            var feature = new Feature(this);
            return feature;
        };
    });
}());
