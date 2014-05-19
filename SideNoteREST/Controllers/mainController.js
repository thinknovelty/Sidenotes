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
	var router = express.Router();

	// app.use(require('express').urlencoded());

	//error handling...
	app.use(function(err, req, res, next){
	   res.send(500, err.toString());
	  appLogger().error(err.stack);
	});

	//api defined.

	//gets
	app.get('/:mod/:type/:id', function(req, res){
		request.getCallBackThree(req, res);
	});
	app.get('/:mod/:id', function(req, res){
		request.getCallBackTwo(req, res);
	});
	app.get('/:mod', function(req, res){
		request.getCallBack(req, res);
	});

	//posts
	app.post('/:mod/:type/:id', function(req, res){
		request.postCallBackThree(req, res);
	});
	app.post('/:mod/:id', function(req, res){
		request.postCallBackTwo(req, res);
	});
	app.post('/:mod', function(req, res){
		request.postCallBack(req, res);
	});

	//puts
	app.put('/:mod/:type/:id', function(req, res){
		request.putCallBackThree(req, res);
	});
	app.put('/:mod/:id', function(req, res){
		request.putCallBackTwo(req, res);
	});
	app.put('/:mod', function(req, res){
		request.putCallBack(req, res);
	});







	//shortcut function to defining routs
	// router.param('user_id', function(req, res, next, id) {
	//   // sample user, would actually fetch from DB, etc...
	//   req.user = {
	//     id: id,
	//     name: 'TJ'
	//   };
	//   next();
	// });

	// router.route('/users/:user_id')
	// .all(function(req, res, next) {
	//   // runs for all HTTP verbs first
	//   // think of it as route specific middleware!
	// })
	// .get(function(req, res, next) {
	//   res.json(req.user);
	// })
	// .put(function(req, res, next) {
	//   // just an example of maybe updating the user
	//   req.user.name = req.params.name;
	//   // save user ... etc
	//   res.json(req.user);
	// })
	// .post(function(req, res, next) {
	//   next(new Error('not implemented'));
	// })
	// .delete(function(req, res, next) {
	//   next(new Error('not implemented'));
	// })

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

