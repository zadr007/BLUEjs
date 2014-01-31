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
    define(["config", "jquery", "bootstrap", "handlebars", "ember", "ember-data", "socketio", "exports"], function (config, $, bootstrap, handlebars, Ember, data, io, exports) {
        var App = window.App = Ember.Application.create({
            options: {},

            socket: null,

            initialize: function () {
            },

            config: config
        });

        // Exports
        exports.App = App;

        // globals
        global.App = App;

        // Google analytics
        if(config.app.googleAnalytics.enabled) {
            Ember.Application.initializer({
                name: "googleAnalytics",

                initialize: function(container, application) {
                    var router = container.lookup('router:main');
                    router.on('didTransition', function() {
                        var url = this.get('url');
                        if(!url || url == "") {
                            url = "/";
                        };

                        // console.log("GA: " + url);
                    });
                }
            });
        }

        return App;
    });
})(this);