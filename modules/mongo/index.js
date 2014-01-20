(function () {
    'use strict';

    var deferred = require('deferred'),
        mongodb = require('mongodb');

    /**
     * Mongo wrapper
     * @type {Mongo}
     */
    var exports = module.exports = function Mongo(config) {
        this.config = config;
        this.collections = {};
    };

    /**
     * Config to be used
     * @type {object}
     */
    exports.prototype.config = null;

    /**
     * Active MongoDB database
     * @type {object}
     */
    exports.prototype.db = null;

    /**
     * Preloaded collections
     * @type {array}
     */
    exports.prototype.collections = null;

    /**
     * Connects to mongo
     * @returns {*} Promise
     */
    exports.prototype.connect = function () {
        var d = deferred();

        var MongoClient = require('mongodb').MongoClient;

        var self = this;

        MongoClient.connect(this.config.mongo.uri, function (err, db) {
            if (err) {
                d.reject(new Error("Cannot connect to DB '" + self.config.mongo.uri + "'"));
                return;
            }

            if (self.config.verbose) {
                console.log("Connected to DB '" + self.config.mongo.uri + "'");
            }

            self.db = db;
            d.resolve(self.db);
        });

        return d.promise();
    };

    /**
     * Loads collection by name and caches it (do not use for BIG collections!)
     * @param collectionName {string} Name of the collection to be loaded
     * @returns {*} Promise
     */
    exports.prototype.loadCollection = function (collectionName) {
        var d = deferred();

        if (this.config.verbose) {
            console.log("Loading collection '" + collectionName + "'");
        }


        var collection = this.db.collection(collectionName);

        var self = this;
        collection.find().toArray(function (err, data) {
            if (err) {
                d.reject(new Error(err));
                return;
            }

            self.collections[collectionName] = data;

            d.resolve(data);
        });

        return d.promise();
    };

    exports.prototype.getCollectio = function(collectionName) {
        if (this.config.verbose) {
            console.log("Loading collection '" + collectionName + "'");
        }

        var collection = this.db.collection(collectionName);

        return deferred(collection);
    };

    /**
     * Initializes Mongo wrapper
     * @returns {*} Promise
     */
    exports.prototype.initialize = function () {
        var d = deferred();

        var self = this;
        this.connect().then(function (res) {
            d.resolve(res);
        });

        return d.promise();
    };

}());