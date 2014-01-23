require.config({
    app_name: "TermcheckApplication",
    shim: {
        "ember": {
            deps: ["handlebars", "jquery"],
            exports: "Ember"
        },
        'socketio': {
            exports: 'io'
        },
    },
    paths: {
        "app": "/js/app",
        "ember": "/components/ember/ember",
        "handlebars": "/components/handlebars/handlebars",
        "jquery": "/components/jquery/jquery",
        "socketio": "/components/socket.io-client/dist/socket.io"
    }
});

require(["app"], function(App) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".

    App.initialize();
});
