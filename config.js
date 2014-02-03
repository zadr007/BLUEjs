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

    module.exports = {

        _global: {
            verbose: true,

            app: {
                name: "MicroScratch",

                // Google analytics section
                googleAnalytics: {
                    enabled: true,
                    id: 'UA-47699219-3',
                    host: 'microscratch.net'
                }
            },

            client: {
                configTemplate: path.join(__dirname, "public/js/config.template.js"),
                configDestination: path.join(__dirname, "public/js/config.js")
            },

            mongo: {
                uri: "mongodb://localhost:27017/data",
                watcher: false
            },

            server: {
                port: 8888,
                root: __dirname,
                dirs: {
                    public: path.join(__dirname, "public"),
                    views: path.join(__dirname, "public/views")
                },
                gzip: false,

                session: {
                    secret: "This is cookie secret, change this!"
                }
    
            },

            solr: {
                enabled: true,
                uri: "http://apollocrawler.com:8080/solr/apollo"
            }
        },

        local: {
        },

        development: {
        },

        test: {
        },

        production: {
            verbose: false
        }
    };

}());
