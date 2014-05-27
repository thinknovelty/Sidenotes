//this is the start to the rest server.

require('./bootstrap'); //just loads globals, not catching return

// console.log(util.inspect(util, { showHidden: true, depth: null }));

//are we in development or not?
if (GLOBAL.bootstrapped && GLOBAL.getAppMode() == 'development') {

    var mainController = require(GLOBAL.CONTROLLERS + 'mainController');

    if (mainController.didLoadWithoutError()) {
        appLogger().info('starting rest server in development mode');
    } else {
        appLogger().error('Error starting rest server in development');
    }
}

if (GLOBAL.bootstrapped && GLOBAL.getAppMode() == 'production') {
    appLogger().info('starting reset server in production mode');
    //do the extra stuff needed for production..
}
