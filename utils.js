(function () {
    'use strict';

    var deferred = require('deferred'),
        fs = require('fs'),
        merge = require('node.extend'),
        moment = require('moment');
    /**
     * Returns loaded config with merged environments
     * @param path string Path to config file
     * @param env string Environment used
     */
    module.exports.loadConfig = function (path, env) {
        if (env === undefined || env === null) {
            env = "local";
        }

        var tmp = require(path);

        var glob = tmp._global || {};
        var loc = tmp[env] || {};

        return merge(true, glob, loc);
    };

    module.exports.timestamp = function() {
        return moment().format("YYYY/MM/DD HH:mm:ss");
    };


    module.exports.generateUUID = function() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
        });
        return uuid;
    };

}());
