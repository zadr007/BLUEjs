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
    var deferred = require('deferred'),
        express = require('express'),
        exphbs = require('express3-handlebars'),
        gzippo = require('gzippo'),
        http = require('http'),
        logger = require('../logger'),
        path = require('path'),
        utils = require('../utils');

    function MicroscratchApp(config) {
        this.config = config || {};

        var Mongo = require('../mongo');
        this.mongo = new Mongo(this.config);

        var Sockets = require('../sockets');
        this.sockets = new Sockets(this.config);
    };

    /**
     * Express application instance
     */
    MicroscratchApp.prototype.app = null;

    /**
     * Http Server
     * @type {null}
     */
    MicroscratchApp.prototype.server = null;

    /**
     * Instance of socket.io
     */
    MicroscratchApp.prototype.io = null;

    /**
     * Loaded config
     * @type {object}
     */
    MicroscratchApp.prototype.config = null;

    /**
     * Mongo wrapper
     * @type {null}
     */
    MicroscratchApp.prototype.mongo = null;

    /**
     * Sockets wrapper
     * @type {null}
     */
    MicroscratchApp.prototype.sockets = null;

    /**
     * Initializes Microscratch application
     * @returns {*} Promise
     */
    MicroscratchApp.prototype.initialize = function () {
        var self = this;

        this.app = express();
        this.server = http.createServer(this.app);

        return this.setup().then(function (res) {
            return self.mongo.initialize(self);
        }).then(function (res) {
                return self.sockets.initialize(self);
            }).then(function (res) {
                return deferred(self);
            });
    };

    /**
     * Logger middleware
     * @param req Request to be logged
     * @param res Response to be logged
     * @param next Next handler
     */
    MicroscratchApp.prototype.logger = function (req, res, next) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var ts = utils.timestamp();

        // TODO: use some templating, DRY!
        logger.log("[" + ts + "] " + ip + " " + req.method + " " + req.url);
        next(); // Passing the request to the next handler in the stack.
    };

    /**
     * Microscratch application entry-point
     */
    MicroscratchApp.prototype.setup = function () {
        this.app.set('view engine', 'hbs');
        this.app.set('views', this.config.server.dirs.views);
        this.app.set('layout', 'layout');
        // this.app.enable('view cache');
        this.app.engine('hbs', exphbs());

        this.app.use(express.bodyParser());
        this.app.use(express.methodOverride());
        this.app.use(this.logger);
        this.app.use(this.app.router);

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

        // TODO: Process config
        utils.preprocessFile(this.config.client.configTemplate,
            this.config.client.configDestination,
            {
                "$appName$": this.config.appName
            });

        var router = require('./router.js');
        return router.initialize(this, this.app);
    };

    /**
     * Microscratch application entry-point
     */
    MicroscratchApp.prototype.main = function () {
        this.server.listen(this.config.server.port);
        logger.log('Listening on port ' + this.config.server.port);
    };

    module.exports = MicroscratchApp;
}());
