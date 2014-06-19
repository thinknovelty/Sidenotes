'use strict';

// -----------------------------------------------------------
//loginController.js


//Call Types:
// POST:
// localhost/login/

// POST Variables:
// email = example@gmail.com
// password = 1234123





// ------------------------------------------------------------
//LoginController.js
var moduleName = 'login';
module.exports = {
    callType: 'POST',
    init: function() {

    },

    results: function() {

        return [{
            results: 'Success'
        }];
    },

    cleanUp: function() {}
};
