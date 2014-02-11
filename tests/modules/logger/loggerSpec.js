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
        '../../../modules/logger',
        'chai',
        'dependable',
        'requirejs'
    ];

    define(deps, function (resolver, Logger, chai, dependable, requirejs) {
        requirejs.config(require('../../../require.js'));

        var expect = chai.expect;
        var logger = null;

        describe('Module Logger', function () {
            beforeEach(function () {
                logger = new Logger(resolver);
            });

            it('Loads Logger module', function () {
                expect(Logger).to.not.equal(null);
                expect(Logger).to.not.equal(undefined);
            });

            it('Has \'error\' method', function () {
                expect(logger.error instanceof Function).to.equal(true);
            });

            it('Has \'info\' method', function () {
                expect(logger.info instanceof Function).to.equal(true);
            });

            it('Has \'log\' method', function () {
                expect(logger.log instanceof Function).to.equal(true);
            });

            it('Has \'warn\' method', function () {
                expect(logger.warn instanceof Function).to.equal(true);
            });
        });

    });
}());

