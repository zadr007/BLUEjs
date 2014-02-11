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
        '../../../../modules/utils',
        'chai',
        'dependable',
        'requirejs'
    ];

    define(deps, function (Utils, chai, dependable, requirejs) {
        requirejs.config(require('../../../../require.js'));

        var expect = chai.expect;

        describe('Module Utils - Merge', function () {
            var personJoe = null,
                personJohny = null;

            beforeEach(function () {
                personJoe = {
                    firstName: "Joe",
                    lastName: "Doe",
                    address: {
                        country: "USA",
                        city: "New York"
                    }
                };

                personJohny = {
                    firstName: "Johny",
                    lastName: "Black",
                    address: {
                        country: "USB",
                        city: "Old York"
                    }
                };
            });

            it('Basic Merge works', function () {
                var res = Utils.merge(personJoe, personJohny);

                expect(res.firstName).to.equal("Johny");
                expect(res.lastName).to.equal("Black");
            });

            it('Shallow Merge works', function () {
                var res = Utils.merge(personJoe, personJohny);

                personJohny.firstName = "Carl";

                expect(res.firstName).to.equal("Carl");
                expect(res.lastName).to.equal("Black");
            });

            it('Deep Merge works', function () {
                var res = Utils.merge(personJoe, personJohny, true);

                personJohny.firstName = "Carl";

                expect(res.firstName).to.equal("Johny");
                expect(res.lastName).to.equal("Black");
            });
        });
    });
}());

