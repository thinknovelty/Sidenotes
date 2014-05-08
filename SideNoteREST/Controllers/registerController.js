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

//if fails should tell us why.
var validate = function(){

	var validator = getValidator();

	if (validator.checkAPIKEY(apikey) !== true){
		return 'BAD apikey';
	}
	else if (validator.isEmail(email) !== true){
		return validator.isEmail(email);
	}
	else if (validator.isUsername(username) !== true){
		return validator.isUsername(username);
	}
	else if (validator.isPassword(pw) !== true){
		return validator.isPassword(pw);
	} 
	else if (validator.isFirstname(firstname) !== true){
		return validator.isFirstname(firstname);
	} 
	else if (validator.isLastname(lastname) !== true){
		return validator.isLastname(lastname);
	} 
	else if (validator.isDateofbirth(dob) !== true){
		return validator.isDateofbirth(dob);
	}

	//TODO: check if email,username, are not used in DB
	return true;
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

	console.log('Writing  to DB ' + JSON.stringify(writeInto));
		//call my model and the model should do CRUD 
};


module.exports = {
	callType : 'POST',

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
			return [{Message : 'Successfully registered' }];
		}
		return  [{Error:  validate()}];
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
