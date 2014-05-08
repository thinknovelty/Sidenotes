// Decrypter.js
var modularName = 'Decrypter';

//this obj is used to dencryption a password or other user information.

module.exports = {

	init: function(argument) {
		console.log('init of the obj');
	},

	cleanUp: function(){
		console.log('init of the obj');
	},

	removeEncryptionFrom: function(redObj, objectType){
		switch(objectType) {
			case 'apikey':
			    
			    break;
			case 'password':
			 
			    break;
			case 'password':
			   
			    break;
			default: 
			    console.log('Removed encryption from ' + objectType);
			}
	}
}