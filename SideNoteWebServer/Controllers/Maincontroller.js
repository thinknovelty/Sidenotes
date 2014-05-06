'use strict';

var addTestResponds = function(app){
	app.get('/testCall', function(req, res) {
	    res.send([{respondBack: 'Yes, the server is alive and kicking'}, {}]);
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
	 
	// app.get('/test', function(req, res) {
	//     res.send([{respondBack: 'Yes, the server is alive and kicking'}]);
	// });
	// app.get('/wines/:id', function(req, res) {
	//     res.send({id:req.params.id, name: "The Name", description: "description"});
	// });
	app.listen(1000);

	if(app){
	addTestResponds(app);
	appLogger().info('Listening on port 1000...');
	return app;
	}else{
		return false;
	}
};

var app = startExrepss();

if(app){

// the call well have the controller we want to invoke. 
	app.get('/sidenotes', function(req, res) {
		var apikey = null;
		var modular = null;

	    if(req.query.apikey){
	    	apikey = req.query.apikey;
	    	console.log(apikey);
	    }
	   	if(!checkAPI(apikey)){
	   		throw new Error("BAD API KEY!");
	   		return;
	   	}

	   	if(req.query.modular){

	   		modular = req.query.modular;
	   		console.log(modular);
	   	}else{
	   		throw new Error("BAD MODULAR, MODULAR is a required parameter.");
	   		return;
	   	}

	   	var gModular  = require(GLOBAL.CONTROLLERS  + modular + 'Controller');
	   	gModular.init(req, res);

	   	var finalObj = gModular.results();
	   	res.send(finalObj);
	   	// console.log('continue the call!');
	   	// //we are free to retrun what the call requires.
	   	// // res.send([{req:req.query('name')},{res:res.stringify}]);
	});

	app.post('/sidenotes', function(req, res){

	});











//error handling...
	app.use(function(err, req, res, next){
	   res.send(500, err.toString());
	  console.error(err.stack);
	});




















return true;

}else{
	//we must have a error!
	return false;
}

