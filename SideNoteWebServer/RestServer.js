'use strict';
//this is the start to the rest server.

require('./bootstrap'); //just loads globals, not catching return

var util    = require('util'); //native node thing...not being used
var logger  = appLogger();
var config  = appConfig();


//are we in development or not?
if (GLOBAL.bootstrapped && GLOBAL.getAppMode() == 'development') {

	var didWeStartWithoutError = require(GLOBAL.CONTROLLERS + 'MainController');

	if(didWeStartWithoutError.didLoadWithoutError()){
		appLogger().info('starting rest server in development mode');
	}else{
		appLogger().info('Error starting rest server in development');
	}

}

if (GLOBAL.bootstrapped &&  GLOBAL.getAppMode() == 'deployment') {
	appLogger().info('starting reset server in deployment mode');
	//do the extra stuff needed for deployment..
}

