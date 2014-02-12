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
        'connect-mongo',
        'deferred',
        'express3-handlebars',
        'express',
        'gzippo',
        'http',
        'path',
        'util'
    ];

    define(deps, function(Core, Utils, Cm, deferred, exphbs, express, gzippo, http, path, util) {
        var MongoStore = Cm(express);

        var exports = module.exports = function ServerModule(resolver) {
            ServerModule.super_.call(this, resolver);

            this.config = this.resolver.get('config');

            this.logger = this.resolver.get('logger');

            this.mongo = this.resolver.get('mongo');

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
         * Loaded config
         * @type {object}
         */
        exports.prototype.config = null;

        /**
         * Logger
         * @type {object}
         */
        exports.prototype.logger = null;

        /**
         * Mongo wrapper
         * @type {null}
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
            this.app.set('view engine', 'hbs');
            this.app.set('views', this.config.server.dirs.views);
            this.app.set('layout', 'layout');
            // this.app.enable('view cache');
            this.app.engine('hbs', exphbs());

            this.app.use(express.bodyParser());
            this.app.use(express.methodOverride());

            var self = this;
            this.app.use(function (req, res, next) {
                var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                var ts = Utils.timestamp();

                // TODO: use some templating, DRY!
                self.logger.log("[" + ts + "] " + ip + " " + req.method + " " + req.url);
                next(); // Passing the request to the next handler in the stack.
            });
            this.app.use(this.app.router);

            // Initialize sessions
            this.initSessions();

            // Initialize gzip
            this.initGzip();

            // Preprocess config template
            Utils.preprocessFile(this.config.client.configTemplate,
                this.config.client.configDestination,
                {
                    '"$app$"': JSON.stringify(this.config.app)
                });

            var router = require('./router.js');
            return router.initialize(this, this.app);
        };

        /**
         * Microscratch application entry-point
         */
        exports.prototype.main = function () {
            this.server.listen(this.config.server.port);
            this.logger.log('Listening on port ' + this.config.server.port);
        };

        exports.prototype.initSessions = function() {
            this.app.cookieParser = express.cookieParser(this.config.server.session.secret);
            this.app.use(this.app.cookieParser);

            this.app.sessionStore = new MongoStore({ // jshint ignore:line
                url: this.config.mongo.uri,
                collection: 'Session',
                auto_reconnect: true
            });

            this.app.use(express.session({
                secret: this.config.server.session.secret,
                store: this.app.sessionStore
            }));
        };

        exports.prototype.initGzip = function() {
            // Gzipped serving of static content if needed
            if (this.config.server.gzip) {
                this.app.use(gzippo.staticGzip(this.config.server.dirs.public));
                this.app.use(gzippo.compress());
            } else {
                this.app.use(express.static(this.config.server.dirs.public));
            }

            this.app.use(function (err, req, res, next) {
                console.error(err.stack);
                res.send(500, 'Something broke!');
            });
        };
    });
}());
