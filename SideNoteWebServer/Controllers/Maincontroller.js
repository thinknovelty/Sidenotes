'use strict';

var addTestResponds = function(app){
	app.get('/sidenotes/test', function(req, res) {
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
		appLogger().info(ip + ' is testing the server.');
	    res.send([{respondBack: 'Yes, the server is alive and kicking', Error: 'No error yet!...'}]);
	    appLogger().info('Testing the completed.');
	});
};

var checkAPI = function(apikey) {
	 var modelAPI = require(GLOBAL.MODELS + 'ValidateAPIKEY');
	 modelAPI.init(apikey);
	 return modelAPI.validate();
}; 

//starts express obj
var startExrepss = function() {
	var express = require('express');
	var app = express();
	app.listen(appConfig().restPort);

	if(app){
		addTestResponds(app);
		appLogger().info('Listening on port ' + appConfig().restPort);
		return app;
	}else{
		return false;
	}
};

var app = startExrepss();

if(app){

// the call well have the controller we want to invoke. 
	app.get('/sidenotes', function(req, res) {

		//required parameters
		var apikey = null; 
		var module = null;
		var gModular = null;
		var finalObj = null;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		if(req.query.module){
	   		module = req.query.module;
	   		appLogger().info('Get call from ' + ip + ' for ' + module + ' request');
	   	}else{
	   		throw new Error("BAD MODULAR, MODULAR is a required parameter.");
	   		return;
	   	}

	    if(req.query.apikey){
	    	apikey = req.query.apikey;
	    	appLogger().info('API Key = ' + apikey);
	    }
	   	if(!checkAPI(apikey)){
	   		throw new Error("BAD API KEY, APIKEY is required.");
	   		return;
	   	}

	   	gModular  = require(GLOBAL.CONTROLLERS  + module + 'Controller');
	   	gModular.init(req, res);

	   	finalObj = gModular.results();
	   	if(finalObj && Array.isArray(finalObj)){
	   		appLogger().info('Get call ' + module + ' complete..');
	   		res.send(finalObj);
	   	}else{
	   		throw new Error("Issue with returned data.");
	   	}

// 		note: objects seem to stay behind after a call so a cleanup function is needed.
	   	gModular.cleanUp();
	});

	app.post('/sidenotes', function(req, res){
	});

//error handling...
	app.use(function(err, req, res, next){
	   res.send(500, err.toString());
	  appLogger().error(err.stack);
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

