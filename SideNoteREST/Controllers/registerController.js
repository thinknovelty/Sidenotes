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
var username 	= null;


var validate = function(){
		if(apikey == null){
			return 'apikey'
		}
		else if (email == null){
			return 'email'
		}
		else if (username == null){
			return 'username'
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

	var writeInto ={
		apikey : apikey,
		email : email,
		pw : pw,
		firstname : firstname,
		lastname : lastname,
		dob : dob,
		username : username};

	appLogger().info('Writing  to DB ' + JSON.stringify(writeInto));
		//call my model and the model should do CRUD 
};


module.exports = {
	init: function (req, res, call){
		if(call.apikey){
			apikey = call.apikey;
		}
		if(call.email){
			email = call.email;
		}
		if(call.pw){
			pw = call.pw;
		}
		if(call.firstname){
			firstname = call.firstname;
		}
		if(call.lastname){
			lastname = call.lastname;
		}
		if(call.dob){
			dob = call.dob;
		}
		if(call.username){
			username = call.username;
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
			return [{results: 'Success'}];
		}
		var err = 'missing parameter' + ' ' +  validate();
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
