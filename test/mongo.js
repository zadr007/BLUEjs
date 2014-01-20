/*
 Copyright, 2013, by Tomas Korcak. <korczis@gmail.com>

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

(function () {

    var child_process = require('child_process'),
        events = require('events'),
        chai = require('chai'),
        expect = chai.expect;

    chai.use(require('sinon-chai'));
    require('mocha-sinon');

    var path = require('path'),
        utils = require('../modules/utils/utils.js');

    // See http://chaijs.com/
    // See http://sinonjs.org/
    // See https://github.com/elliotf/mocha-sinon
    // See https://github.com/domenic/sinon-chai

    describe('Mongo', function () {
        var mongo = null;

        beforeEach(function () {
            var config = utils.loadConfig(path.join(__dirname, "../config.js"), "test");

            var Mongo = require('../modules/mongo');
            mongo = new Mongo(config);
        });

        it('Connect to Existing Host', function (done) {
            mongo.initialize().then(function (res) {
                expect(res).to.not.equal(null);
                done();
            }, function () {
                expect(false).to.equal(true);
                done();
            });
        });

    });
}());

