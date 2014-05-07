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

var validator = require(GLOBAL.LIB + 'Validate');
var decrypter = require(GLOBAL.LIB + 'Decrypter');

// var decryptCredentials = function(post) {
// 	// Step 1 - Get Post parameters
// 	var post = req.body;

// 	// Step 2 - Decrypt Post parameters
// 	var apiKey = decrypter.decrypt(post['apiKey']);
// 	var email = decrypter.decrypt(post['email']);
// 	var password = decrypter.decrypt(post['password']);
	
// 	return [apiKey, email, password];
// };

// var validateCredentials = function(apiKey, email, password) {
// 	// Step 1 - Decrypt Post parameters
// 	var credentials = decryptCredentials(post);
// 	var apiKey = credentials['apiKey'];
// 	var email = credentials['email'];
// 	var password = credentials['password'];
	
// 	// Step 2 - Validate API KEY
// 	validator.validateApiKey(apiKey);
// 	validator.isValidEmailString(email);
// 	validator.isValidPasswordString(password);
	
// 	// Step 3 - Validate e-mail / password combination
// 	if(validator.validateCredential(email, password)) {
// 		// Everything went well
// 		// Return the credentials
// 		return [apiKey, email, password];
// 	}
// 	else {
// 		// Couldn't validate
// 		return null;
// 	}
// };

// var registerUser = function(req, res) {
//     if(req.query.api){
//     	api = req.query.api;
//     }

// 	if(!checkAPI(api)){
// 		throw new Error("BAD API KEY!");
// 	   	return;
// 	}

// 	console.log('continue the call!');
// };

// var loginUser = function(req, res) {
// 	var credentials = decryptCredentials(req.body);
	
// 	if(credentials) {
// 		// The credentials checked out
// 		if(!validator.validateApiKey(credentials['apiKey']) {
// 			// Invalid Api Key
// 		}
		
// 		if(!validator.validateEmail(credentials['email'])) {
// 		}
		
// 		if(!validator.validatePassword(credentials['password']) {
// 		}
		
		
// 	}
// };

// var getNote = function(req, res) {
// 	var credentials = validateCredentials(req.body);
		
// 	if(credentials) {
// 		// The credentials checked out
// 	}
// };

// var getBundle = function(req, res) {
// };




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
		appLogger().info('Failed to start server on port ' + appConfig().restPort);
		return false;
	}
};

var app = startExrepss();

if(app){

	app.get('/:mod/:type/:id', function(req, res) {

		//required parameters
		var apikey = null; 
		var call = {
							module: null,
							callType: 'get',
							type: null,
							id:null };

		var gModular = null;
		var finalObj = null;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		appLogger().info('Get call from ' + ip);

		//this should be here if not we have a issue.
		if(req.params.mod){
	   		call.module = req.params.mod;
	   	}else{
	   		throw new Error("BAD MODULAR, MODULAR is a required.");
	   		return;
	   	}

	   	//this should be here if not we have a issue.
	   	if(req.params.type){
	   		call.type = req.params.type;
	   	}else{
	   		throw new Error("BAD TYPE, TYPE is a required.");
	   		return;
	   	}

	   	//this should be here if not we have a issue.
	   	if(req.params.id){
	   		call.id = req.params.id;
	   	}else{
	   		throw new Error("BAD ID, ID is a required, it cannot be found or is incorrect.");
	   		return;
	   	}

	   	if(GLOBAL.getAppMode() !== 'development'){
	   		   	//check for API KEY.
			    if(req.query.apikey){
			    	apikey = req.query.apikey;
			    	appLogger().info('API Key = ' + apikey);
			    }
			   	if(!checkAPI(apikey)){
			   		throw new Error("BAD API KEY, APIKEY is required parameter.");
			   		return;
			   	}
	   	}

	   	appLogger().info(JSON.stringify(call));
	
	   	gModular  = require(GLOBAL.CONTROLLERS  + call.module + 'Controller');
	   	gModular.init(req, res);

	   	finalObj = gModular.results();
	   	if(finalObj && Array.isArray(finalObj)){
	   		appLogger().info('Get call ' + call.module + ' complete..');
	   		res.send(finalObj);
	   	}else{
	   		throw new Error("Issue with returned data.");
	   	}
	   	gModular.cleanUp();
	});

	app.get('/:mod/:id', function(req, res) {
		//required parameters
		var apikey = null; 
		var call = {
							module: null,
							callType: 'get',
							type: null,
							id:null };

		var gModular = null;
		var finalObj = null;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		appLogger().info('Get call from ' + ip);

		//this should be here if not we have a issue.
		if(req.params.mod){
	   		call.module = req.params.mod;
	   	}else{
	   		throw new Error("BAD MODULAR, MODULAR is a required.");
	   		return;
	   	}

	   	//this should be here if not we have a issue.
	   	if(req.params.id){
	   		call.id = req.params.id;
	   	}else{
	   		throw new Error("BAD ID, ID is a required, it cannot be found or is incorrect.");
	   		return;
	   	}

	   	if(GLOBAL.getAppMode() !== 'development'){
	   		   	//check for API KEY.
			    if(req.query.apikey){
			    	apikey = req.query.apikey;
			    	appLogger().info('API Key = ' + apikey);
			    }
			   	if(!checkAPI(apikey)){
			   		throw new Error("BAD API KEY, APIKEY is required parameter.");
			   		return;
			   	}
	   	}

	   	appLogger().info(JSON.stringify(call));
	
	   	gModular  = require(GLOBAL.CONTROLLERS  + call.module + 'Controller');
	   	gModular.init(req, res);

	   	finalObj = gModular.results();
	   	if(finalObj && Array.isArray(finalObj)){
	   		appLogger().info('Get call ' + call.module + ' complete..');
	   		res.send(finalObj);
	   	}else{
	   		throw new Error("Issue with returned data.");
	   	}
	   	gModular.cleanUp();
	});

	app.post('/:mod', function(req, res) {
		//required parameters
		var apikey = null; 
		var call = {
							module: null,
							callType: 'post' };

		var gModular = null;
		var finalObj = null;
		var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

		appLogger().info('Post from ' + ip);

		//this should be here if not we have a issue.
		if(req.params.mod){
	   		call.module = req.params.mod;
	   	}else{
	   		throw new Error("BAD MODULAR, MODULAR is a required.");
	   		return;
	   	}

	   	if(GLOBAL.getAppMode() !== 'development'){
	   		   	//check for API KEY.
			    if(req.query.apikey){
			    	apikey = req.query.apikey;
			    	appLogger().info('API Key = ' + apikey);
			    }
			   	if(!checkAPI(apikey)){
			   		throw new Error("BAD API KEY, APIKEY is required parameter.");
			   		return;
			   	}
	   	}

	   	appLogger().info(JSON.stringify(call));
	
	   	gModular  = require(GLOBAL.CONTROLLERS  + call.module + 'Controller');
	   	gModular.init(req, res);

	   	finalObj = gModular.results();
	   	if(finalObj && Array.isArray(finalObj)){
	   		appLogger().info('Get call ' + call.module + ' complete..');
	   		res.send(finalObj);
	   	}else{
	   		throw new Error("Issue with returned data.");
	   	}
	   	gModular.cleanUp();
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

