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
        '../../mongo/model',
        'events',
        'util'
    ];

    define(deps, function (Model, events, util) {
        var schema = Model.declareSchema('Permission', {
            name: String
        });

        var model = Model.declareModel('Permission', schema);

        var exports = module.exports = function Permission() {
            Permission.super_.call(this, schema, model);

            return this;
        };

        util.inherits(exports, Model);

        exports.Schema = schema;

        exports.Model = model;

        /*
        function Do(name, schemaDeclaration, exportsOut) {
            var schema = Model.declareSchema(name, schemaDeclaration);
            var model = Model.declareModel(name, schema);

            util.inherits(exportsOut, Model);

            exportsOut.Schema = schema;
            exportsOut.Model = model;
        };
        //*/
    });

})();