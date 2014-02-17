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
        App.reopen({
            PersistentObject: Ember.Object.extend({
                _impl: null,

                // https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage
                implementationDummy: {
                    getItem: function (sKey) {
                        if (!sKey || !this.hasOwnProperty(sKey)) {
                            return null;
                        }
                        return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
                    },

                    key: function (nKeyId) {
                        return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
                    },

                    setItem: function (sKey, sValue) {
                        if (!sKey) {
                            return;
                        }
                        document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
                        this.length = document.cookie.match(/\=/g).length;
                    },

                    length: 0, // document.cookie.match(/\=/g).length,

                    removeItem: function (sKey) {
                        if (!sKey || !this.hasOwnProperty(sKey)) {
                            return;
                        }
                        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                        this.length--;
                    },

                    /*jshint -W001 */
                    hasOwnProperty: function (sKey) {
                        return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
                    }
                },

                implementationReal: {
                    getItem: function (key) {
                        return localStorage.getItem(key);
                    },

                    setItem: function (key, value) {
                        return localStorage.setItem(key, value);
                    },

                    removeItem: function (key) {
                        return localStorage.removeItem(key);
                    }
                },

                initialize: function () {
                    if (Modernizr.localstorage) {
                        this._impl = this.implementationReal;
                    } else {
                        this._impl = this.implementationDumy;
                    }
                },

                get: function (key) {
                    if (!this._impl) {
                        this.initialize();
                    }

                    return JSON.parse(this._impl.getItem(key));
                },

                set: function (key, value) {
                    if (!this._impl) {
                        this.initialize();
                    }

                    return this._impl.setItem(key, JSON.stringify(value));
                },

                remove: function (key) {
                    if (!this._impl) {
                        this.initialize();
                    }

                    return this._impl.removeItem(key);
                }
            })
        });

        // If you want access one persistent configuration via followin API:
        // App.get('storage').get('key');
        // App.get('storage').set('key', 'value');
        // App.get('storage').remove('key');

        App.reopen({
            storage: App.PersistentObject.create({})
        });
    });
})(window.App);