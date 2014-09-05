'use strict';

require('./bootstrap'); //just loads globals
var logger = appLogger();
var config = appConfig();

if (config.mode == 'development') {
    //addtional stuff can be added here.
    logger.info("Starting server in development mode");
    require('./server.js');
}

if (config.mode == 'production') {
    //addtional stuff can be added here.
    logger.info("Starting server in production mode");
    require('./server.js');
}