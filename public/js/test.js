require.config({
    app_name: "microscratch",
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        },
        "ember": {
            deps: ["handlebars", "jquery"],
            exports: "Ember"
        },
        'jquery': {
            exports: '$'
        },
        'mocha': {
            exports: 'mocha'
        },
        'socketio': {
            exports: 'io'
        },
        'chai-jquery': {
            deps: ['jquery', 'chai']
        }
    },
    paths: {
        "app": "/js/app",
        "bootstrap": "/components/bootstrap/dist/js/bootstrap",
        "ember": "/components/ember/ember",
        "handlebars": "/components/handlebars/handlebars",
        "jquery": "/components/jquery/jquery",
        "mocha": "/components/mocha/mocha",
        "chai": "/components/chai/chai",
        "chai-jquery": "/components/chai-jquery/chai-jquery",
        "socketio": "/components/socket.io-client/dist/socket.io"
    }
});

require(["mocha", "chai", "chai-jquery", "app"], function(mocha, chai, chaiJquery, App) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".

    App.initialize();

    // Chai
    var should = chai.should();
    chai.use(chaiJquery);

    /*globals mocha */
    mocha.setup('bdd');

    mocha.checkLeaks();
    mocha.globals(['jQuery']);
    mocha.run();
});
