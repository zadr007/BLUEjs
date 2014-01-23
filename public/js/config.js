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