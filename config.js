(function () {
    'use strict';

    var path = require('path');

    module.exports = {

        _global: {
            verbose: true,
            mongo: {
                uri: "mongodb://localhost:27017/data"
            },

            server: {
                port: 8888,
                root: __dirname,
                data: path.join(__dirname, 'data')
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
