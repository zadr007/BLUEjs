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
        "app",
        "moment"
    ];

    require(deps, function (Ember, App, moment) {
        var format = function (msg) {
            var ts = moment().format("YYYY/MM/DD HH:mm:ss");
            var usec = new Date().getMilliseconds().toFixed();

            return "[" + ts + "." + usec + "] " + msg;
        };

        App.reopen({

                logger: Ember.Object.create({
                    msg: function (severity, msg) {
                        switch (severity) {
                            case "log":
                                this.log(msg);
                                break;
                            case "debug":
                                this.debug(msg);
                                break;
                            case "error":
                                this.error(msg);
                                break;
                            case "info":
                                this.info(msg);
                                break;
                            case "warn":
                                this.warn(msg);
                                break;
                        }
                    },

                    log: function (msg) {
                        if (console && console.log) {
                            console.log(format(msg));
                        }
                    },

                    debug: function (msg) {
                        if (console && console.debug) {
                            console.debug(format(msg));
                        }
                    },

                    error: function (msg) {
                        if (console && console.error) {
                            console.error(format(msg));
                        }
                    },

                    info: function (msg) {
                        if (console && console.info) {
                            console.info(format(msg));
                        }
                    },

                    warn: function (msg) {
                        if (console && console.warn) {
                            console.warn(format(msg));
                        }
                    }
                })
            }
        );
    });
})(this);
