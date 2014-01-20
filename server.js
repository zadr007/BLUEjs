(function () {
    'use strict';

    var deferred = require('deferred'),
        express = require('express'),
        exphbs = require('express3-handlebars'),
        fs = require('fs'),
        http = require('http'),
        path = require('path'),
        utils = require('./utils.js');

    function CraftsmenApp(config) {
        this.config = config || {};

        var Mongo = require('./mongo.js');
        this.mongo = new Mongo(this.config);

        var Sockets = require('./sockets.js');
        this.sockets = new Sockets(this.config);
    };

    /**
     * Express Application
     * @type {null} Express application instance
     */
    CraftsmenApp.prototype.app = null;

    /**
     * Http Server
     * @type {null} Http Server instance
     */
    CraftsmenApp.prototype.server = null;

    /**
     * Instance of socket.io
     * @type {null}
     */
    CraftsmenApp.prototype.io = null;

    /**
     * Loaded config
     * @type {object}
     */
    CraftsmenApp.prototype.config = null;

    /**
     * Mongo wrapper
     * @type {null}
     */
    CraftsmenApp.prototype.mongo = null;

    /**
     * Sockets wrapper
     * @type {null}
     */
    CraftsmenApp.prototype.sockets = null;

    /**
     * Initializes Craftsmen application
     * @returns {*} Promise
     */
    CraftsmenApp.prototype.initialize = function () {
        var self = this;

        this.app = express();
        this.server = http.createServer(this.app);

        return this.mongo.initialize(arguments).then(function (res) {
            return self.sockets.initialize(self);
        });
    };

    /**
     * Logger middleware
     * @param req Request to be logged
     * @param res Response to be logged
     * @param next Next handler
     */
    CraftsmenApp.prototype.logger = function (req, res, next) {
        var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        var ts = utils.timestamp();

        // TODO: use some templating, DRY!
        console.log("[" + ts + "] " + ip + " " + req.method + " " + req.url);
        next(); // Passing the request to the next handler in the stack.
    };

    /**
     * Craftsmen application entry-point
     */
    CraftsmenApp.prototype.main = function () {
        this.app.set('view engine', 'hbs');
        this.app.set('views', './public/views');
        this.app.set('layout', 'layout');
        // this.app.enable('view cache');
        this.app.engine('hbs', exphbs());

        this.app.use(express.bodyParser());
        this.app.use(express.methodOverride());
        this.app.use(this.logger);
        this.app.use(this.app.router);
        this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.use(function (err, req, res, next) {
            console.error(err.stack);
            res.send(500, 'Something broke!');
        });

        var router = require('./router.js');
        router.initialize(this, this.app);

        this.server.listen(this.config.server.port);
        console.log('Listening on port ' + this.config.server.port);
    };

    var defaultConfig = "config.js";
    var defaultEnv = "local";

    var opts = require('optimist')
            .usage('Simple Web GUI for Craftsmen Listing.\nUsage: $0')
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

    var app = new CraftsmenApp(config);
    app.initialize().done(function (res) {
        app.main();
    });

}());
