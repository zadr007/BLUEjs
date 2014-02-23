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
    var deps = [
        "ember",
        "app"
    ];

    require(deps, function (Ember, App) {

        App.ApplicationView = Ember.View.extend({
            classNames: ['app-view'],
            templateName: "application",

            /**
             * Called when inserted to DOM.
             * @memberof Application.ApplicationView
             * @instance
             */
            didInsertElement: function () {
	    	var log = App.logger && App.logger.log  ? App.logger.log : console.log;
		log("App.ApplicationView.didInsertElement()");
            },

            content: function() {
                return this.get('controller.content');
            }.property('controller.content')
        });

        App.ApplicationRoute = Ember.Route.extend({
            beforeModel: function () {
                this._super();
                if (!App.get('user')) {
                    this.transitionTo('login');
                }
            },

            model: function () {
                var self = this;
                return new Ember.RSVP.Promise(function (resolve) {
                    App.xhr.xhr({
                        type: "GET",
                        url: "/entry/list"
                    }).done(function (data) {
                        resolve(data);
                    });
                });
            },

            setupController: function (controller, model) {
                controller.set('content', Ember.A(model));
            },

            actions: {
                xxx: function () {
                    var self = this;
                    App.xhr.xhr({
                        type: "POST",
                        url: "/entry/new",
                        data: {
                            user: App.get('user')
                        }
                    }).done(function (data) {
                        App.xhr.xhr({
                            type: "GET",
                            url: "/entry/list"
                        }).done(function (data) {
                            self.get('controller').set('content', Ember.A(data));
                        });
                    });
                }
            }
        });

        App.ApplicationController = Ember.Controller.extend({
            entries: Ember.A([])
        });
    });
})
(this);