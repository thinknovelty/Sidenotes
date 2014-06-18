'use strict';
// -----------------------------------------------------------
//activationController.js






//tables:
//user_verification, user

// ------------------------------------------------------------
var moduleName = 'activation';

// Usage: 
//this is the controller used for managering a user who activates his or her account.

module.exports = extend(getControllerBase(), {
	email: null,
	registerKey: null,

	init: function(req, res, call) {
     
    },

    results: function() {
        
    },

    cleanUp: function() {
       
    }
});
