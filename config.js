// Copyright, 2013-2014, by Tomas Korcak. <korczis@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included inso
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

    var path = require('path');

    /**
     * Application settings
     * @type {{name: string, googleAnalytics: {enabled: boolean, id: string, host: string}}}
     */
    var app = {
        name: "MicroScratch"
    };

    /**
     * Client Settings
     * @type {{configTemplate: *, configDestination: *}}
     */
    var client = {
        configTemplate: path.join(__dirname, "public/js/config.template.js"),
        configDestination: path.join(__dirname, "public/js/config.js")
    };

    /**
     * Mongo settings
     * @type {{uri: string, watcher: boolean}}
     */
    var mongo = {
        uri: "mongodb://localhost:27017/" + app.name,
        watcher: false
    };

    /**
     * Server settings
     * @type {{port: number, root: *, dirs: {public: *, views: *}, gzip: boolean, session: {secret: string}, authentication: {enabled: boolean}}}
     */
    var server = {
        port: 8888,
        root: __dirname,
        dirs: {
            public: path.join(__dirname, "public"),
            views: path.join(__dirname, "modules/server/views")
        },
        gzip: false,

        session: {
            secret: "This is cookie secret, change this!"
        },

        authentication: {
            enabled: true
        }
    };

    /**
     * Solr settings
     * @type {{enabled: boolean, uri: string}}
     */
    var solr = {
        enabled: true,
        uri: "http://apollocrawler.com:8080/solr/apollo"
    };

    module.exports = {

        _global: {
            verbose: true,

            app: app,

            client: client,

            mongo: mongo,

            server: server,

            solr: solr
        },

        local: {
            mongo: {
                uri: mongo.uri + "-local"
            }
        },

        development: {
            mongo: {
                uri: mongo.uri + "-development"
            }
        },

        test: {
            mongo: {
                uri: mongo.uri + "-test"
            }
        },

        production: {
            verbose: false,
            mongo: {
                uri: mongo.uri + "-production"
            }
        }
    };

}());
