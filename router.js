/* Copyright, 2013, by Moravia IT, a.s. */

(function () {
    'use strict';

    var fs = require('fs'),
        path = require('path'),
        utils = require('./utils.js');

    /**
     * Intializes router
     * @param craftsmen Craftsmen app which this router belongs to
     * @param app Express app which this router belongs to
     */
    module.exports.initialize = function (craftsmen, app) {

        // Root route
        app.get('/', function (req, res) {
            var data = {
                appName: craftsmen.config.appName
            };

            res.render("index", data);
        });

        app.get('/config', function (req, res) {
            res.json(craftsmen.config);
        });

        app.get('/query', function(req, res) {
           craftsmen.mongo.getCollection('datasets')
        });
    };

}());
