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
        '../../../tests/resolver.js',
        '../../../modules/cli',
        '../../../modules/core',
        '../../../modules/mongo',
        '../../../modules/webapp',
        'chai',
        'dependable',
        'requirejs'
    ];

    define(deps, function (resolver, Cli, Core, Mongo, Webapp, chai, dependable, requirejs) {
        requirejs.config(require('../../../require.js'));

        var expect = chai.expect;

        describe('Webapp Module', function () {
            var webappModule = null;

            beforeEach(function (done) {
                var rslvr = resolver();

                var cli = new Cli(rslvr);
                rslvr.register('cli', cli);

                var mongo = new Mongo(rslvr);
                rslvr.register('mongo', mongo);
                mongo.initialize().then(function() {
                    webappModule = new Webapp(rslvr);
                    done();
                });

            });

            it('Loads module', function () {
                expect(Webapp).to.not.equal(null);
                expect(Webapp).to.not.equal(undefined);
            });

            it('Creates Instance', function () {
                expect(webappModule).to.not.equal(null);
                expect(webappModule).to.not.equal(undefined);
            });

            it('Is subclass of Core', function () {
                expect(webappModule instanceof Core).to.equal(true);
            });

            it('Is subclass of Webapp', function () {
                expect(webappModule instanceof Webapp).to.equal(true);
            });

            it('Implements \'run\' method', function () {
                expect(webappModule.run instanceof Function).to.equal(true);
            });

            it('Implements \'loadAllModules\' method', function () {
                expect(webappModule.loadAllModules instanceof Function).to.equal(true);

                var core = new Core();
            });
        });
    });
}());

