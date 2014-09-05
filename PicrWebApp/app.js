'use strict';

require('./bootstrap'); //just loads globals, not catching return

var util    = require('util'); //native node thing...not being used
var watcher = require('./scss.js'); //sass compiler to do css. turned off right now
var logger  = appLogger();
var config  = appConfig();


//
// Use config to figure out which servers are going to 
// be started and whether to start the sass compiler. 
// 

//builder is skipped for now
if ( config.builder.enableServer ) {
	if ( config.builder.useSass ) {
		var builderSass = watcher.scssWatcher(config.builder.sassProps);

		// kill listener - kill sass
		process.once('SIGUSR2', function () {
			builderSass.cleanup(function(){
				process.kill(process.pid, 'SIGUSR2');
			});
		});
	}

	// start the builder server
	logger.info("Starting Mobile Architect");
	require('./builder.js');
}


if ( config.mobile.enableServer ) {
	if ( config.mobile.useSass ) {
		var mobileSass = watcher.scssWatcher(config.mobile.sassProps);

		// kill listener - kill sass
		process.once('SIGUSR2', function () {
			mobileSass.cleanup(function(){
				process.kill(process.pid, 'SIGUSR2');
			});
		});
	}

	// start the mobile/preview server
	logger.info("Starting Mobile Server");
	require('./mobile.js');
}

