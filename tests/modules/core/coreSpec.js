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


    var events = require('events');

    describe('Module Core', function () {
        var BaseModule = null;
        var baseModule = null;

        var CoreModule = null;
        var coreModule = null;

        beforeEach(function () {
            BaseModule = require('../../../modules/core/baseModule');
            baseModule = new BaseModule();

            CoreModule = require('../../../modules/core');
            coreModule = new CoreModule();
        });

        it('Loads Base module', function () {
            expect(BaseModule).to.not.equal(null);
            expect(BaseModule).to.not.equal(undefined);
        });

        it('Creates Base Module Instance', function () {
            expect(baseModule).to.not.equal(null);
            expect(baseModule).to.not.equal(undefined);
        });

        it('baseModule subclass of Events.EventEmitter', function () {
            expect(baseModule instanceof events.EventEmitter).to.equal(true);
        });

        it('baseModule subclass of BaseModule', function () {
            expect(baseModule instanceof BaseModule).to.equal(true);
        });

        it('Initializes Base Module \'modules\' property properly', function () {
            expect(baseModule.modules).to.be.empty;
        });

        it('Initializes Base Module \'options\' property properly', function () {
            expect(baseModule.options).to.be.empty;
        });

        it('Loads Core module', function () {
            expect(CoreModule).to.not.equal(null);
            expect(CoreModule).to.not.equal(undefined);
        });

        it('Creates Core Module Instance', function () {
            expect(coreModule).to.not.equal(null);
            expect(coreModule).to.not.equal(undefined);
        });

        it('coreModule subclass of BaseModule', function () {
            expect(coreModule instanceof BaseModule).to.equal(true);
        });

        it('coreModule subclass of CoreModule', function () {
            expect(coreModule instanceof CoreModule).to.equal(true);
        });

        it('Initializes Core Module \'modules\' property properly', function () {
            expect(coreModule).to.not.equal(null);
            expect(coreModule).to.not.equal(undefined);
            expect(coreModule.modules.core).to.equal(coreModule);
        });
    });
}());

