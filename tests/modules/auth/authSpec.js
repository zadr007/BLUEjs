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
        '../../../tests/resolver',
        '../../../modules/auth',
        '../../../modules/auth/models/user',
        '../../../modules/core',
        '../../../modules/logger',
        '../../../modules/mongo',
        '../../../modules/mongo/model',
        'chai',
        'dependable',
        'requirejs'
    ];

    define(deps, function(resolver, Auth, User, Core, Logger, Mongo, Model, chai, dependable, requirejs) {
        requirejs.config(require('../../../require.js'));

        var expect = chai.expect;

        describe('Auth Module', function () {
            /**
             * Auth module instance
             * @type {Auth}
             */
            var authModule = null;

            /**
             * Mongo module instance
             * @type {Mongo}
             */
            var mongo = null;

            beforeEach(function (done) {
                var rslvr = resolver();

                var mongo = new Mongo(rslvr);
                rslvr.register('mongo', mongo);

                mongo.initialize().then(function() {
                    authModule = new Auth(rslvr);
                    done();
                });
            });

            it('Loads module', function () {
                expect(Auth).to.not.equal(null);
                expect(Auth).to.not.equal(undefined);
            });

            it('Creates Instance', function () {
                expect(authModule).to.not.equal(null);
                expect(authModule).to.not.equal(undefined);
            });

            it('Is subclass of Core', function () {
                expect(authModule instanceof Core).to.equal(true);
            });

            it('Is subclass of Auth', function () {
                expect(authModule instanceof Auth).to.equal(true);
            });

            it('Mongo is set', function () {
                expect(authModule.mongo instanceof Mongo).to.equal(true);
            });

            it('Has Permission model defined', function () {
                expect(Model.models.Permission).to.not.equal(null);
                expect(Model.models.Permission).to.not.equal(undefined);
            });

            it('Has Role model defined', function () {
                expect(Model.models.Role).to.not.equal(null);
                expect(Model.models.Role).to.not.equal(undefined);
            });

            it('Has User model defined', function () {
                expect(Model.models.User).to.not.equal(null);
                expect(Model.models.User).to.not.equal(undefined);
            });

            it('Creates User', function () {
                var user = {
                    username: "Joe Doe"
                };

                authModule.userAdd(user);
            });
        });
    });
}());

