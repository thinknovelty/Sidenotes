'use strict';

//registerController.js

//this is the controll is used to manage the registration of a new patron.
var apikey 		= null;
var email 		= null;
var password 	= null;
var firstname 	= null; 
var lastname 	= null;
var birthday 	= null;


module.exports = {
	init: function (req, res){
		if(req.query.apikey){
			apikey = req.query.apikey;
		}
		if(req.query.email){
			email = req.query.email;
		}
		if(req.query.password){
			password = req.query.password;
		}
		if(req.query.firstname){
			firstname = req.query.firstname;
		}
		if(req.query.lastname){
			lastname = req.query.lastname;
		}
		if(req.query.dob){
			birthday = req.query.dob;
		}

	},

	setApikey : function(apikey){
		this.apikey = apikey;
	},

	getApikey : function(){
		return this.apikey;
	},
	setEmail :function(){

	},
	getEmail : function(){
		return this.email;

	},
	setPassword : function(){

	},
	getPassword : function(){
		return this.password;

	},
	setFirstname : function(){

	},
	getFirsname : function(){
		return this,firstname;

	},
	setLastname : function(){


	},
	getLastname : function(){
		return this.lastname;

	},
	getBirthday : function(){
		return this.birthday;

	},
	setBirthday : function(){

	},

	results : function(){
		if(!this.validate()){
			return false;
		}

		this.writeToDB();

		//retrun my Array of objects.

		return [{results: 'Success'}];
	},

	validate : function(){
		return true;
	},

	writeToDB : function(){
		//make model and save to datebase.
	},
};
