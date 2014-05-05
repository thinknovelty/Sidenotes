'use strict';

var addTestResponds = function(app){
	app.get('/testCall', function(req, res) {
	    res.send([{respondBack: 'Yes, the server is alive and kicking'}, {}]);
	});
};

var checkAPI = function(api) {
	 var modelAPI = require(GLOBAL.MODELS + 'ValidateAPI');
	 modelAPI.init(api);
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
		var api = null;
	    if(req.query.api){
	    	api = req.query.api;
	    }

	   	if(!checkAPI(api)){
	   		throw new Error("BAD API KEY!");
	   		return;
	   	}

	   	console.log('continue the call!');
	   	//we are free to retrun what the call requires.
	   	// res.send([{req:req.query('name')},{res:res.stringify}]);
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

