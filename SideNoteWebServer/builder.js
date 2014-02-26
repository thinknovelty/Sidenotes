//
// Builder web server.
//

'use strict';

require('./bootstrap');
var util    = require('util');
var express = require('express');
var path    = require('path');
var logger  = appLogger();
var config  = appConfig();

// controllers
var builder = require('./routes/builder/');


//
// Setup an express server for the 
// mobile architect.
// 
var app = express();
var server = require('http').createServer(app);
var sockio = require('socket.io').listen(server);

app.configure(function(){
	app.set('port', config.builder.port || 80);
	app.use(express.favicon());

	// middleware
	app.use(express.logger('dev'));
	// custom middleware that allows us to
	// get the raw post request from the body
	//app.use(require('./lib/rawparser.js').rawParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);

	// sessions
	//app.use(express.session());
	//app.use(express.cookieParser('23jk4b523jh423uyk4bv'));

	app.use(express.static(path.join(__dirname, config.builder.serverRoot)));
});

app.configure( 'development', function (){
	app.use( express.errorHandler({ dumpExceptions : true, showStack : true }) );
});

app.configure( 'production', function (){
	app.use( express.errorHandler() );
});


// Routes - only one for right now
app.post('/generate', builder.generate);


server.listen(app.get('port'), function(){
	logger.info('Serving ' + config.builder.serverRoot + ' on port ' + app.get('port'));
});

sockio.sockets.on('connection', function (socket) {
});



