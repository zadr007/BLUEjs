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

    /**
     * Array of modules this one depends on.
     * @type {Array}
     */
    var deps = [];

    define(deps, function() {
        module.exports = function (microscratch, app) {

            app.post('/entry/new', function (req, res) {
                var data = req.body;

                var username = data.user.username;
                var now = new Date();

                var Entry = microscratch.mongo.models['entry'].model;

                Entry.findOne({username: username}, null, {sort: {startedAt: -1 }}, function(err, doc) {
                    if(doc && !doc.endedAt) {
                        doc.endedAt = now;
                        doc.save();
                        res.json(doc);
                    } else {
                        var entry = new Entry({
                            username: username,
                            startedAt: now
                        });
                        entry.save();
                        res.json(entry);
                    }
                });
            });

            app.get('/entry/list', function (req, res) {
                var Entry = microscratch.mongo.models['entry'].model;
                Entry.find({}, null, {sort: {startedAt: -1 }}, function(err, docs) {
                    if(docs) {
                        res.json(docs);
                    } else {
                       res.json([]);
                    }
                });
            });
        };
    });

}());
