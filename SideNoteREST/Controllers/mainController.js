'use strict';
//--------------------------------------------------------------------------
	// Post - 	Create 
	// Get - 	Read 
	// Put - 	Update
	// Delete - Delete

	//Get call example.   /<mod>/variable
	//					   /<mod>/<type>/variable

	//Post call example.   /<mod>
	
//--------------------------------------------------------------------------

var addTestResponds = function(app){
	app.get('/test', function(req, res) {
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		appLogger().info(ip + ' is testing the server.');
	    res.send([{respondBack: 'Yes, the server is alive and kicking', Error: 'No error yet!...'}]);
	    appLogger().info('Testing completed.');
	});
};

var checkAPI = function(apikey) {
	 var modelAPI = require(GLOBAL.MODELS + 'ValidateAPIKEY');
	 modelAPI.init(apikey);
	 return modelAPI.validate();
}; 

var startExpress = function() {
	var express = require('express');
	var compress = require('compression');
	var bodyParser = require('body-parser');
	
	var app = express();

	app.use(compress());
	app.use(bodyParser());

	//error handling...
	app.use(function(err, req, res, next){
	   res.send(500, err.toString());
	  appLogger().error(err.stack);
	});

	app.listen(appConfig().restPort);

	if(app){
		addTestResponds(app);
		appLogger().info('Listening on port ' + appConfig().restPort);
		return app;
	}else{
		appLogger().info('Failed to start server on port ' + appConfig().restPort);
		return false;
	}
};
//starts express obj
var app = startExpress();

if(app){
	var request = GLOBAL.getRequest();

	// app.use(require('express').urlencoded());

	//error handling...
	app.use(function(err, req, res, next){
	   res.send(500, err.toString());
	  appLogger().error(err.stack);
	});

	//api defined.
	app.get('/:mod/:type/:id', function(req, res){
		request.getCallBackThree(req, res);
	});
	app.get('/:mod/:id', function(req, res){
		request.getCallBackTwo(req, res);
	});
	app.post('/:mod', function(req, res){
		request.postCallBack(req, res);
	});
};

module.exports = {
	didLoadWithoutError: function(){
		if (app){
			return true;
		}else{
			return false;
		}
	},
};

