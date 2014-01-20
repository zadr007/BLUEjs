(function () {

    var child_process = require('child_process'),
        events = require('events'),
        chai = require('chai'),
        expect = chai.expect;

    chai.use(require('sinon-chai'));
    require('mocha-sinon');

    var path = require('path'),
        utils = require('../utils.js');

    // See http://chaijs.com/
    // See http://sinonjs.org/
    // See https://github.com/elliotf/mocha-sinon
    // See https://github.com/domenic/sinon-chai

    describe('Mongo', function () {
        var mongo = null;

        beforeEach(function () {
            var config = utils.loadConfig(path.join(__dirname, "../config.js"), "test");

            var Mongo = require('../modules/mongo/mongo');
            mongo = new Mongo(config);
        });

        it('Connect to Existing Host', function (done) {
            mongo.initialize().then(function (res) {
                expect(res).to.not.equal(null);
                done();
            }, function () {
                expect(false).to.equal(true);
                done();
            });
        });

    });
}());