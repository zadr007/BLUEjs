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
        "../../../tests/resolver",
        "../../../modules/auth",
        "../../../modules/mongo",
        "../../../modules/mongo/model",
        "../../../modules/server",
        'chai',
        'dependable',
        'path',
        'request',
        'requirejs'
    ];

    define(deps, function (resolver, Auth, Mongo, Model, Server, chai, dependable, path, request, requirejs) {
        requirejs.config(require('../../../require.js'));

        var expect = chai.expect;
        var config = null;
        var mongo = null;
        var server = null;

        describe('Server Module', function () {
            beforeEach(function(done) {
                var rslvr = resolver();
                config = rslvr.get('config');

                var mongo = new Mongo(rslvr);
                rslvr.register('mongo', mongo);

                mongo.initialize().then(function() {
                    // Create test specific Auth module instance
                    var auth = new Auth(rslvr);
                    rslvr.register('auth', auth);

                    // Create test specific Server module instance
                    server = new Server(rslvr);
                    rslvr.register('server', server);

                    done();
                })
            })

            it('Module Exists', function () {
                expect(Server).to.not.equal(null);
                expect(Server).to.not.equal(undefined);
            });

            it('Has Session model defined', function () {
                expect(Model.models['Session']).to.not.equal(null);
                expect(Model.models['Session']).to.not.equal(undefined);
            });
        });
    });
}());

