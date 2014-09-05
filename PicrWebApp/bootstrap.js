'use strict';

if (!GLOBAL.bootstrapped) {
    GLOBAL.APP_ROOT = __dirname;

    GLOBAL.appConfig = function() {
        return require(APP_ROOT + '/config/settings.js').configurations;
    };

    GLOBAL.appLogger = function() {
        return require(APP_ROOT + '/lib/logger.js');
    };

    appLogger().info('Mode = ' + appConfig().mode);
    appLogger().info('Bootstrap Completed');
}

GLOBAL.bootstrapped = true;