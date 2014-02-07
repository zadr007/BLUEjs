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

    var child_process = require('child_process'),
        chai = require('chai'),
        expect = chai.expect;


    describe('Module Logger', function () {
        var LoggerModule = null;

        beforeEach(function () {
            LoggerModule = require('../../../modules/logger');
        });

        it('Loads Logger module', function () {
            expect(LoggerModule).to.not.equal(null);
            expect(LoggerModule).to.not.equal(undefined);
        });

        it('Has \'error\' method', function () {
            expect(LoggerModule.error instanceof Function).to.equal(true);
        });

        it('Has \'info\' method', function () {
            expect(LoggerModule.info instanceof Function).to.equal(true);
        });

        it('Has \'log\' method', function () {
            expect(LoggerModule.log instanceof Function).to.equal(true);
        });

        it('Has \'warn\' method', function () {
            expect(LoggerModule.warn instanceof Function).to.equal(true);
        });
    });
}());

