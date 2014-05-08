// Request.js
var moduleName = 'Request';

var validator = require(GLOBAL.LIB + 'Validator');
var decrypter = require(GLOBAL.LIB + 'Decrypter');


var timeStamp = function(){
	var currentdate = new Date(); 
	var timeStamped = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

	return timeStamped;
};

module.exports = {
	getCB: function(req, res){
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

	  	//check for API KEY.
		if(req.query.apikey){
			apikey = req.query.apikey;
		}

		if(!validator.checkAPIKEY(apikey)){
			appLogger().error('apikey = ' + apikey);
			throw new Error("BAD API KEY, APIKEY is required parameter.");
			return;
		}

	   	appLogger().info(JSON.stringify(call));
	
	   	gModular  = require(GLOBAL.CONTROLLERS  + call.module + 'Controller');
	   	gModular.init(req, res);

	   	finalObj = gModular.results();
	   	if(finalObj && Array.isArray(finalObj)){
	   		appLogger().info('Get call ' + call.module + ' complete..');
	   		finalObj.push({timeStamp: timeStamp()});
	   		res.send(finalObj);
	   	}else{
	   		throw new Error("Issue with returned data.");
	   	}
	   	gModular.cleanUp();
	},

	postCallBack: function(req, res) {
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

	   	//check for API KEY.
		if(req.query.apikey){
			apikey = req.query.apikey;
		}

		if(!validator.checkAPIKEY(apikey)){
			appLogger().error('apikey = ' + apikey);
			throw new Error("BAD API KEY, APIKEY is required parameter.");
			return;
		}

	   	appLogger().info(JSON.stringify(call));
	
	   	gModular  = require(GLOBAL.CONTROLLERS  + call.module + 'Controller');
	   	gModular.init(req, res);

	   	finalObj = gModular.results();
	   	if(finalObj && Array.isArray(finalObj)){
	   		appLogger().info('Get call ' + call.module + ' complete..');
	   		finalObj.push({timeStamp: timeStamp()});
	   		res.send(finalObj);
	   	}else{
	   		throw new Error("Issue with returned data.");
	   	}
	   	gModular.cleanUp();
	},

	getCallBack: function(req, res) {
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

	   	//check for API KEY.
		if(req.query.apikey){
			apikey = req.query.apikey;
		}

		if(!validator.checkAPIKEY(apikey)){
			appLogger().error('apikey = ' + apikey);
			throw new Error("BAD API KEY, APIKEY is required parameter.");
			return;
		}

	   	appLogger().info(JSON.stringify(call));
	
	   	gModular  = require(GLOBAL.CONTROLLERS  + call.module + 'Controller');
	   	gModular.init(req, res);

	   	finalObj = gModular.results();
	   	if(finalObj && Array.isArray(finalObj)){
	   		appLogger().info('Get call ' + call.module + ' complete..');
	   		finalObj.push({timeStamp: timeStamp()});
	   		res.send(finalObj);
	   	}else{
	   		throw new Error("Issue with returned data.");
	   	}
	   	gModular.cleanUp();
	},

}