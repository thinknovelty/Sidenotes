'use strict';

//registerController.js
var moduleName = 'Register';

// Example Call 
// /sidenotes?apikey=00000000&module=Register&email=hubbertj@gmail.com&pw=encrptyed&firstname=jerum&lastname=hubbert&dob=01/09/1982

//this is the controller used to manage the registration process.


//defaults
var apikey 		= null;
var email 		= null;
var pw 			= null;
var firstname 	= null; 
var lastname 	= null;
var dob 		= null;


var validate = function(){
		if(apikey == null){
			return 'apikey'
		}
		else if (email == null){
			return 'email'
		}
		else if (pw == null){
			return 'pw'
		} 
		else if (firstname == null){
			return 'firstname'
		} 
		else if (lastname == null){
			return 'lastname'
		} 
		else if (dob == null){
			return 'dob'
		}else{
				return true;
		}
};

var writeToDB = function(){
		//call my model and the model should do CRUD 
};


module.exports = {
	init: function (req, res){
		if(req.query.apikey){
			apikey = req.query.apikey;
		}
		if(req.query.email){
			email = req.query.email;
		}
		if(req.query.pw){
			pw = req.query.pw;
		}
		if(req.query.firstname){
			firstname = req.query.firstname;
		}
		if(req.query.lastname){
			lastname = req.query.lastname;
		}
		if(req.query.dob){
			dob = req.query.dob;
		}

	},

	setApikey : function(apikey){
		apikey = apikey;
	},

	getApikey : function(){
		return apikey;
	},
	setEmail :function(par){
		email = par;
	},
	getEmail : function(){
		return email;

	},
	setPw : function(par){
		pw = par;
	},
	getPw : function(){
		return pw;

	},
	setFirstname : function(par){
		firstname = par;
	},
	getFirsname : function(){
		return firstname;

	},
	setLastname : function(par){
		lastname = par;
	},
	getLastname : function(){
		return lastname;

	},
	getDob : function(){
		return dob;

	},
	setDob : function(par){
		dob = par;
	},

	results : function(){

		if(validate() == true){
			writeToDB();
			// cleanup();
			return [{results: 'Success'}];
		}

		var err = 'missing parameter' + ' ' +  validate();
		// cleanup();
		return  [{results: 'Failed', Error: err}];
	},

	cleanUp : function(){
		apikey 		= null;
		email 		= null;
		pw 			= null;
		firstname 	= null; 
		lastname 	= null;
		dob 		= null;
	}
};
