(function(root) {
    require(["config"], function(configuration) {
        require.config(configuration);

        require(["app"], function(App) {
            //This function is called when scripts/helper/util.js is loaded.
            //If util.js calls define(), then this function is not fired until
            //util's dependencies have loaded, and the util argument will hold
            //the module value for "helper/util".

            App.initialize();
        });
    });
})(this);
