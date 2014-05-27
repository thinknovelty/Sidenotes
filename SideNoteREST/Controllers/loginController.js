'use strict';

// -----------------------------------------------------------
//loginController.js








// ------------------------------------------------------------
//LoginController.js
var moduleName = 'Login';

// Usage: 

//this is the controller for the login process.

module.exports = extend(getControllerBase(),{
    callType: 'POST',
    init: function() {

    },

    results: function() {

        return [{
            results: 'Success'
        }];
    },

    cleanUp: function() {}
});
