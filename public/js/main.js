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
        "ember": "/js/ember",
        "handlebars": "/js/handlebars-v1.3.0",
        "jquery": "/js/jquery-2.0.3",
        "socketio": "/js/socket.io"
    }
});

require(["app"], function(App) {
    //This function is called when scripts/helper/util.js is loaded.
    //If util.js calls define(), then this function is not fired until
    //util's dependencies have loaded, and the util argument will hold
    //the module value for "helper/util".

    App.initialize();
});
