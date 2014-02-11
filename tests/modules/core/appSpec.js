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
        '../../../modules/core/app',
        'chai',
        'dependable',
        'requirejs',
    ];

    define(deps, function (resolver, Cli, Core, App, chai, dependable, requirejs) {
        requirejs.config(require('../../../require.js'));

        var expect = chai.expect;

        describe('Module Core - App', function () {
            var appModule = null;

            beforeEach(function () {
                var cli = new Cli(resolver);
                resolver.register('cli', cli);
                appModule = new App(resolver);
            });

            it('Loads module', function () {
                expect(App).to.not.equal(null);
                expect(App).to.not.equal(undefined);
            });

            it('Creates Instance', function () {
                expect(appModule).to.not.equal(null);
                expect(appModule).to.not.equal(undefined);
            });

            it('Is subclass of Core', function () {
                expect(appModule instanceof Core).to.equal(true);
            });

            it('Is subclass of App', function () {
                expect(appModule instanceof App).to.equal(true);
            });

            it('Implements \'run\' method', function () {
                expect(appModule.run instanceof Function).to.equal(true);
            });

            it('Implements \'loadAllModules\' method', function () {
                expect(appModule.loadAllModules instanceof Function).to.equal(true);

                var core = new Core();
            });
        });
    });
}());

