
//this is the model which we will use to validate the API KEY.
var apikey = null;
var whoAmI = 'anonymous';

module.exports = {
	init: function (apikey){

	if(apikey == null){
			whoAmI = 'anonymous';
			return;
	}

	if(GLOBAL.getAppMode() == 'development'){
		whoAmI = '00000000';
	}

	//getting date and find the person who wons the API
	//set whoAmI to the person who owns this api key. db call
	// appLogger().info('Checking who owns api key = ' + apikey);

	},

	setAPIKEY : function(apikey){
		this.apikey = apikey;
	},

	getAPIKEY : function(){
		return this.apikey;
	},

	validate : function(){
		if (whoAmI == 'anonymous'){
			return false;
		}

		return true;
	},
};
