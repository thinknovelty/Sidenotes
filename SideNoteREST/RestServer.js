//this is the start to the rest server.

//loads GLOBAL stuff..
require('./bootstrap');

if (!GLOBAL.bootstrapped) {
    cosole.log('Error: bootstrapped has failed.');
} else if (GLOBAL.getAppMode() == 'development') {
    var mainController = require(GLOBAL.CONTROLLERS + 'mainController');
    // -- extra code for development --
    if (mainController.didLoadWithoutError()) {
        appLogger.info('Started server in development mode');
    } else {
        appLogger.error('Failed to start server in development');
    }
} else if (GLOBAL.getAppMode() == 'production') {
    var mainController = require(GLOBAL.CONTROLLERS + 'mainController');
    // -- extra code for production --
    if (mainController.didLoadWithoutError()) {
        appLogger.info('Started server in production mode');
    } else {
        appLogger.error('Failed to start server server in production');
    }
}
