(function () {
    'use strict';

    var deferred = require('deferred'),
        merge = require('node.extend'),
        path = require('path');
    /**
     * sockets.io wrapper
     * @type {Mongo}
     */
    var exports = module.exports = function Mongo(config) {
        this.config = config;
    };

    /**
     * Config to be used
     * @type {object}
     */
    exports.prototype.config = null;

    /**
     * Application to be used
     * @type {object}
     */
    exports.prototype.app = null;

    /**
     * Initializes Mongo wrapper
     * @returns {*} Promise
     */
    exports.prototype.initialize = function (app) {
        var d = deferred();

        this.app = app;

        var socketOptions = {
            log: this.config.verbose
        };

        this.io = require('socket.io').listen(this.app.server, socketOptions);

        var self = this;

        this.io.sockets.on('connection', function (socket) {
            socket.on('msg', function (data) {
                // TODO: Process here
            });
        });

        return deferred(this);
    };

}());