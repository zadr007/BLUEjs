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

    var CoreModule = require('../../../modules/core');

    describe('Module Core - App', function () {
        var AppModule = null;
        var appModule = null;

        beforeEach(function () {
            AppModule = require('../../../modules/core/app');
            appModule = new AppModule();
        });

        it('Loads module', function () {
            expect(AppModule).to.not.equal(null);
            expect(AppModule).to.not.equal(undefined);
        });

        it('Creates Instance', function () {
            expect(appModule).to.not.equal(null);
            expect(appModule).to.not.equal(undefined);
        });

        it('Is subclass of CoreModule', function () {
            expect(appModule instanceof CoreModule).to.equal(true);
        });

        it('Is subclass of AppModule', function () {
            expect(appModule instanceof AppModule).to.equal(true);
        });

        it('Implements \'run\' method', function() {
            expect(appModule.run instanceof Function).to.equal(true);
        });
    });
}());

