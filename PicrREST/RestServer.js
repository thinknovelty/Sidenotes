//this is the start to the rest server.
//loads GLOBAL stuff..
require('./bootstrap');
if (!GLOBAL.bootstrapped) {
    cosole.log('Error: bootstrapped has failed.');
} else if (GLOBAL.getAppMode() === 'development') {
    getSettingsFromDB(function(bool) {
        if (!bool) {
            appLogger.error('Failed to get server settings in ' + getAppMode() +' mode.');
            appLogger.info('Pulling from local config file.');
        }
        var mainController = require(GLOBAL.CONTROLLERS + 'mainController');
        if (mainController.didLoadWithoutError()) {
            appLogger.info('Started server in ' + getAppMode() + ' mode.');
        } else {
            appLogger.error('Failed to start server server in production');
        }
    });
} else if (GLOBAL.getAppMode() === 'production') {
    getSettingsFromDB(function(bool) {
        if (!bool) {
            appLogger.error('Failed to get server settings in ' + getAppMode() +' mode.');
            return;
        }
        var mainController = require(GLOBAL.CONTROLLERS + 'mainController');
        if (mainController.didLoadWithoutError()) {
            appLogger.info('Started server in ' + getAppMode() + ' mode.');
        } else {
            appLogger.error('Failed to start server server in production');
        }
    });
}
