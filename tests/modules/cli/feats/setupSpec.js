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
        '../../../../tests/resolver',
        '../../../../modules/cli',
        'chai',
        'dependable',
        'optimist',
        'requirejs'
    ];

    define(deps, function (resolver, Cli, chai, dependable, Optimist, requirejs) {
        requirejs.config(require('../../../../require.js'));

        var expect = chai.expect;

        describe('Module CLI - setup', function () {
            var cliModule = null;

            beforeEach(function () {
                cliModule = new Cli(resolver);
            });

            it('Optimist object exists', function () {
                var optimist = cliModule.args();
                expect(optimist).to.not.equal(null);
                expect(optimist).to.not.equal(undefined);
            });

            it('Implements \'default\' method', function () {
                expect(Optimist.default instanceof Function).to.equal(true);
            });

            it('Implements \'describe\' method', function () {
                expect(Optimist.describe instanceof Function).to.equal(true);
            });

            it('Implements \'usage\' method', function () {
                expect(Optimist.usage instanceof Function).to.equal(true);
            });
        });
    });
}());

