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
    "use strict";

    var deps = [
        "ember"
    ];

    require(deps, function (Ember) {
        // See http://stackoverflow.com/questions/8853396/logical-operator-in-a-handlebars-js-if-conditional

        function cond(context, v1, operator, v2, options) {
            var self = context;
            switch (operator) {
                case "==":
                    return (v1 === v2) ? options.fn(self) : options.inverse(self);

                case "!=":
                    return (v1 !== v2) ? options.fn(self) : options.inverse(self);

                case "===":
                    return (v1 === v2) ? options.fn(self) : options.inverse(self);

                case "!==":
                    return (v1 !== v2) ? options.fn(self) : options.inverse(self);

                case "&&":
                    return (v1 && v2) ? options.fn(self) : options.inverse(self);

                case "||":
                    return (v1 || v2) ? options.fn(self) : options.inverse(self);

                case "<":
                    return (v1 < v2) ? options.fn(self) : options.inverse(self);

                case "<=":
                    return (v1 <= v2) ? options.fn(self) : options.inverse(self);

                case ">":
                    return (v1 > v2) ? options.fn(self) : options.inverse(self);

                case ">=":
                    return (v1 >= v2) ? options.fn(self) : options.inverse(self);
            }

            /*jshint -W061 */
            var res = eval("" + v1 + operator + v2) ? options.fn(self) : options.inverse(self);
            /*jshint +W061 */

            return res;
        }


        Ember.Handlebars.registerHelper("ifCondBound", function (boundV1, operator, v2, options) {
            var v1 = Ember.get(options.contexts[0], boundV1);
            return cond(this, v1, operator, v2, options);
        });

        Ember.Handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
            return cond(this, v1, operator, v2, options);
        });
    });

})();
