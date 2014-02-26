//
// Mobile server
// 

'use strict';

require('./bootstrap');
var path    = require('path');
var express = require('express');
var logger  = appLogger();
var config  = appConfig();
//var fs = require('fs');
//var options = {
//	key  : fs.readFileSync('./keys/private.pem'),
//	cert : fs.readFileSync('./keys/cert.pem'),
//}
//var proxy = require('./routes/mobile/proxy.js'); //just in case we need it in the future


//
// Setup an express server for the 
// mobile web.
// 
var app = express();
//var server = require('https').createServer(options, app);

app.configure(function(){
	app.set('port', config.mobile.port || 3000); //DEFAULT = 3000
	
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);

	// sessions (if needed)
	//app.use(express.session());
	//app.use(express.cookieParser('23jk4b523jh423uyk4bv'));
	
	// static assets
	app.use(express.static(path.join(__dirname, config.mobile.serverRoot)));
});

app.configure( 'development', function (){
	app.use( express.errorHandler({ dumpExceptions : true, showStack : true }) );
});

app.configure( 'production', function (){
	app.use( express.errorHandler() );
});

// Routes
//app.post('/proxy', proxy.proxy);


app.listen(app.get('port'));
//server.listen(app.get('port'));
logger.info('Serving ' + config.mobile.serverRoot + ' on port ' + config.mobile.port);

