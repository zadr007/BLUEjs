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
        "../../../tests/resolver",
        "../../../modules/mongo",
        "../../../modules/scrapper",
        'chai',
        'dependable',
        'path',
        'requirejs'
    ];

    define(deps, function (resolver, Mongo, Scraper, chai, dependable, path, requirejs) {
        requirejs.config(require('../../../require.js'));

        var expect = chai.expect;
        var scraper = null;

        describe('Module Scrapper', function () {
            beforeEach(function() {
                var rslvr = resolver();

                var mongo = new Mongo(rslvr);
                rslvr.register('mongo', mongo);

                scraper = new Scraper(rslvr);
            });

            it('Module Exists', function (done) {
                expect(Scraper).to.not.equal(null);
                expect(Scraper).to.not.equal(undefined);
                done();
            });

            it('Has mongo instance', function () {
                expect(scraper.mongo).to.not.equal(null);
                expect(scraper.mongo).to.not.equal(undefined);
                expect(scraper.mongo instanceof Mongo).to.equal(true);
            });

            it('Scrapes Google', function (done) {
                var res = Scraper.deferredRequest('http://google.com').then(function (data) {
                    expect(data).to.not.equal(null);
                    expect(data).to.not.equal(undefined);
                    done();
                }, function () {
                    expect(false).to.equal(true);
                    done();
                });
            });
        });
    });
}());

