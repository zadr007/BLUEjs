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
        'chai',
        'dependable',
        'requirejs',
        '../../../modules/auth',
        '../../../modules/core',
        '../../../modules/mongo'
    ];

    define(deps, function(chai, dependable, requirejs, AuthModule, CoreModule, MongoModule) {
        requirejs.config(require('../../../require.js'));

        var expect = chai.expect;

        describe('Module Auth', function () {
            var authModule = null;

            beforeEach(function () {

                var resolver = dependable.container();
                resolver.register("config", {});
                resolver.register("mongo", new MongoModule());

                authModule = new AuthModule(resolver);
            });

            it('Loads module', function () {
                expect(AuthModule).to.not.equal(null);
                expect(AuthModule).to.not.equal(undefined);
            });

            it('Creates Instance', function () {
                expect(authModule).to.not.equal(null);
                expect(authModule).to.not.equal(undefined);
            });

            it('Is subclass of CoreModule', function () {
                expect(authModule instanceof CoreModule).to.equal(true);
            });

            it('Is subclass of AuthModule', function () {
                expect(authModule instanceof AuthModule).to.equal(true);
            });

            it('Mongo is set', function () {
                expect(authModule.mongo instanceof MongoModule).to.equal(true);
            });
        });
    });
}());

