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

(function (global) {
    "use strict";

    var deps = [
        "ember",
        "moment"
    ];

    require(deps, function (Ember, moment) {
        Ember.Handlebars.registerBoundHelper('day', function (date) {
            if (!date) {
                return '';
            }

            date = moment(date);
            
            if (date.isAfter(moment().startOf('day'))) {
                return "Today";
            } else if (date.isAfter(moment().subtract("days", 1).startOf('day'))) {
                return "Yesterday";
            } else if (date.isAfter(moment().subtract("days", 7).startOf('day'))) {
                return date.format("dddd");
            }
            return date.format("D.MM.YYYY");
        });
        
        Ember.Handlebars.registerBoundHelper('datetime', function (date) {
            if (!date) {
                return '';
            }

            return moment(date).fromNow();
        });

        Ember.Handlebars.registerBoundHelper('dateShort', function (date) {
            return moment(date).format("HH:mm");
        });

        Ember.Handlebars.registerBoundHelper('elapsed', function (start, end) {
            return "N/A";
        });

        Ember.Handlebars.registerBoundHelper('xxx', function (date) {
            date = new Date(date);
            var hours = date.getHours() + (date.getMinutes() / 60);
            return ((hours / 24) * 100) + '%';
        });

        Ember.Handlebars.registerBoundHelper('yyy', function (start, end) {
            start = new Date(start);
            end   = end ? new Date(end) : new Date();
            var hours1 = start.getHours() + (start.getMinutes() / 60);
            var hours2 = end.getHours() + (end.getMinutes() / 60);
            return Math.max(0.1, ((hours2 / 24) - (hours1 / 24)) * 100) + '%';
        });

        Ember.Handlebars.registerBoundHelper('zzz', function (index) {
            return (((index + 1) / 24) * 100) + '%';
        });
    });

})(this);