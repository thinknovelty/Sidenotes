// Credential Validator
// Validator.js

var moduleName = 'Validator';

module.exports = {

	sanitize : function(value) {
	// Sanitize value and return it
	return value;
	},

	isValidEmailString : function(email) {
	// Validate e-mail string
	
	return true;
	},

// we currently just check for a number.
	checkAPIKEY : function(apikey){

		if(GLOBAL.getAppMode() == 'development'){
			return true;
		}

		if (isNaN(apikey) || apikey == null){
			return false;
		}
		return true;

	},

	validate : function(){
		return true;
	},
};