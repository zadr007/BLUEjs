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
        "ember"
    ];

    require(deps, function (Ember) {
        /*
         @method link-to
         @for Ember.Handlebars.helpers
         @param {String} routeName
         @param {Object} [context]*
         @param [options] {Object} Handlebars key/value pairs of options, you can over-ride any property of {{#crossLink "Ember.LinkView"}}{{/crossLink}}
         @return {String} HTML string
         @see {Ember.LinkView}
         */
        Ember.Handlebars.registerHelper('my-link-to', function (name) {
            var options = [].slice.call(arguments, -1)[0],
                params = [].slice.call(arguments, 0, -1),
                hash = options.hash;

            hash.disabledBinding = hash.disabledWhen;

            hash.parameters = {
                context: this,
                options: options,
                params: params
            };

            return Ember.Handlebars.helpers.view.call(this, LinkView, options);
        });
    });

})(this);