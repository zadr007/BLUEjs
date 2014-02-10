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

    if (typeof define !== 'function') {
        var define = require('amdefine')(module);
    }

    define(['chai', 'dependable', 'requirejs'], function (chai, dependable, requirejs) {
        requirejs.config(require('../../../require.js'));

        var expect = chai.expect;

        describe('Module CLI', function () {
            var CoreModule = null;
            var CliModule = null;
            var cliModule = null;

            beforeEach(function () {
                CoreModule = require('../../../modules/core');

                CliModule = require('../../../modules/cli');
                cliModule = new CliModule();
            });

            it('Loads module', function () {
                expect(CliModule).to.not.equal(null);
                expect(CliModule).to.not.equal(undefined);
            });

            it('Creates Instance', function () {
                expect(cliModule).to.not.equal(null);
                expect(cliModule).to.not.equal(undefined);
            });

            it('Is subclass of CoreModule', function () {
                expect(cliModule instanceof CoreModule).to.equal(true);
            });

            it('Is subclass of CliModule', function () {
                expect(cliModule instanceof CliModule).to.equal(true);
            });
        });
    });
}());

