(function() {
    "use strict";

    var utils = require("../utils");

    var log = function(msg) {
        console.log("[" + utils.timestamp() + "] " + msg);
    };

    var exports = module.exports = {

    };

    exports.info = function(msg) {
        log(msg);
    };

    exports.debug = function(msg) {
        log(msg);
    };

    exports.warn = function(msg) {
        log(msg);
    };

    exports.error = function(msg) {
        log(msg);
    };

    exports.log = function(msg) {
        log(msg);
    };

}());