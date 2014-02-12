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
        'archy',
        'deferred',
        'fs',
        'node.extend',
        'moment',
        'path'
    ];

    define(deps, function (archy, deferred, fs, merge, moment, path) {
        var exports = module.exports = {};

        /**
         * Returns loaded config with merged environments
         * @param path string Path to config file
         * @param env string Environment used
         */
        exports.loadConfig = function (configPath, env) {
            if (env === undefined || env === null) {
                env = "local";
            }

            var tmp = require(configPath);

            var glob = tmp._global || {};
            var loc = tmp[env] || {};

            var res = merge(true, glob, loc);

            var userConfig = configPath + ".user";
            if (fs.existsSync(userConfig)) {
                tmp = require(userConfig);

                glob = tmp._global || {};
                loc = tmp[env] || {};

                var override = merge(true, glob, loc);
                res = merge(true, res, override);
            }

            return res;
        };

        /**
         * Sets objects property by name (dot nototation)
         * @param obj Object to be updated
         * @param prop Propert name in dot notation
         * @param value Value
         */
        exports.setObjectProperty = function (obj, prop, value) {
            if (typeof prop === "string") {
                prop = prop.split(".");
            }

            if (prop.length > 1) {
                var e = prop.shift();
                module.exports.setObjectProperty(obj[e] =
                    Object.prototype.toString.call(obj[e]) === "[object Object]"
                        ? obj[e]
                        : {},
                    prop,
                    value);
            } else {
                obj[prop[0]] = value;
            }
        };

        /**
         * Returns formatted time as timestamp
         * @param fmt Optional format string
         * @param dt Optional date time
         * @returns {*} Formatted timestamp
         */
        exports.timestamp = function (fmt, dt) {
            if (!fmt) {
                fmt = "YYYY/MM/DD HH:mm:ss.SSS";
            }

            return moment(dt).format(fmt);
        };

        /**
         * Returns UUID - Universaly Unique Identifier
         * @returns {*|string}
         */
        exports.generateUUID = function () {
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16);
            });
            return uuid;
        };

        /**
         * Constructs filesystem chart in formatted consumed by archy (https://github.com/substack/node-archy)
         * @param dirPath Directory to process
         * @returns {Array} Array of nodes of that directory
         */
        exports.getPathNodes = function (dirPath) {
            var res = [];

            var files = fs.readdirSync(dirPath);
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                var fullPath = path.join(dirPath, file);

                var stat = fs.statSync(fullPath).isDirectory();
                var node = {
                    label: file,
                    nodes: stat ? module.exports.getPathNodes(fullPath) : []
                };

                res.push(node);
            }

            return res;
        };

        /**
         * Print directory to console in `npm list` style using archy (https://github.com/substack/node-archy)
         * @param dirPath Path to print
         */
        exports.printFileTree = function (dirPath) {
            var archy = require('archy');
            var s = archy({
                label: dirPath,
                nodes: module.exports.getPathNodes(dirPath)
            });

            console.log(s);
        };

        /**
         * Simple templating function, takes source file, replaces replacements and writes result to destination file
         * @param source Path to Source file including placeholders to be replaced
         * @param destination Path to destination file where to write processed (with placeholders replaced) result file
         * @param replacements Map with replacements, key will be replaced with target
         */
        exports.preprocessFile = function (source, destination, replacements) {
            var src = fs.readFileSync(source, 'utf8');
            var result = src.toString();

            for (var key in replacements) {
                if (!replacements.hasOwnProperty(key)) {
                    continue;
                }

                result = result.replace(key, replacements[key]);
            }

            fs.writeFileSync(destination, result, 'utf8');
        };

        /**
         * Merges to javascript objects
         * @param orig Original object to be extended
         * @param override Object with overrides
         * @param deep True if deep merge is needed
         * @returns {*}
         */
        exports.merge = function (orig, override, deep) {
            if (deep) {
                return merge(true, orig, override);
            }

            return (orig, override);
        };

    });

}());
