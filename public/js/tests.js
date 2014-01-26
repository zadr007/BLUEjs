(function (root) {
    require(["config"], function (configuration) {
        require.config(configuration);

        require(["mocha", "chai", "chai-jquery", "lib", "tests"], function (mocha, chai, chaiJquery, App) {
            //This function is called when scripts/helper/util.js is loaded.
            //If util.js calls define(), then this function is not fired until
            //util's dependencies have loaded, and the util argument will hold
            //the module value for "helper/util".

            // Chai
            var should = chai.should();
            chai.use(chaiJquery);

            mocha.setup('bdd');

            mocha.checkLeaks();
            mocha.globals(['jQuery']);

            require([
                '../tests/tests.js'
            ], function (require) {
                mocha.run();
            });
        });
    });
})(this);

