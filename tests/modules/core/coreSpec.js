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
        '../../../modules/core',
        'chai',
        'dependable',
        'events',
        'requirejs'
    ];

    define(deps, function (Core, chai, dependable, events, requirejs) {
        requirejs.config(require('../../../require.js'));

        var expect = chai.expect;

        describe('Module Core', function () {
            var coreModule = null;

            beforeEach(function () {
                coreModule = new Core();
            });

            it('Loads Core module', function () {
                expect(Core).to.not.equal(null);
                expect(Core).to.not.equal(undefined);
            });

            it('Creates Core Module Instance', function () {
                expect(coreModule).to.not.equal(null);
                expect(coreModule).to.not.equal(undefined);
            });

            it('coreModule subclass of Core', function () {
                expect(coreModule instanceof Core).to.equal(true);
            });

            it('coreModule subclass of Events.EventEmitter', function () {
                expect(coreModule instanceof events.EventEmitter).to.equal(true);
            });

            it('Has Resolver', function () {
                expect(coreModule.resolver).to.not.equal(null);
                expect(coreModule.resolver).to.not.equal(undefined);
            });
        });

    });
}());

