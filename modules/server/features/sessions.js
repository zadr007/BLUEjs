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
        'connect-mongo',
        'express'
    ];

    define(deps, function(Cm, express) {
        var MongoStore = Cm(express);

        function FeatureSessions(server) {
            server.app.cookieParser = express.cookieParser(server.config.server.session.secret);
            server.app.use(server.app.cookieParser);

            server.app.sessionStore = new MongoStore({ // jshint ignore:line
                url: server.config.mongo.uri,
                collection: 'Session',
                auto_reconnect: true
            });

            server.app.use(express.session({
                secret: server.config.server.session.secret,
                store: server.app.sessionStore
            }));
        };

        module.exports = FeatureSessions;
    });

}());
