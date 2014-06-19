'use strict';

// -----------------------------------------------------------
//loginController.js


//Call Types:
// POST:
// localhost/login/

// POST Variables:
// email = example@gmail.com
// password = 1234123
// apiKey = 23tfwr234f234424





// ------------------------------------------------------------
//LoginController.js
var moduleName = 'login';

module.exports = {
    callType: 'POST',

    //defaults
    email: null,
    apiKey: null,
    password: null,

    init: function(req, res, call) {
        if (call.email) {
            this.email = call.email;
        }
        if (call.registrationKey) {
            this.registrationKey = call.registrationKey;
        }
        if (call.password) {
            this.password = call.password;
        }
    },

    results: function() {
        var data = {
            email: this.email,
            apiKey: this.apiKey,
            password: this.password
        };

        var model = require(MODELS + moduleName + 'Model');
        var m = new model();
        m.init();

        if (validate(data) == true) {
            var didLogin = m.create(data.email, false);
            if (didLogin) {
                return [{
                    message: 'Login Successfully',
                    success: 1,
                    error: 0
                }];
            } else {
                return [{
                    message: 'Login failed attempt recorded failed attempt has not been recorded due to DB issue.',
                    success: 0,
                    error: 0
                }];
            }

        }
        //true is set becuase we failed to vaildate. now we will record the failed attempt.
        var didLogin = m.create(data.email, true);
        if (didLogin) {
            return [{
                message: 'Login failed attempt recorded',
                success: 0,
                error: 1,
                errormsg: validate(data),

            }];

        } else {
        	return [{
                message: 'Login failed attempt recorded failed attempt has not been recorded due to DB issue.',
                success: 0,
                error: 1,
                errormsg: validate(data),

            }];
        }
    },

    cleanUp: function() {
        this.email = null;
        this.apiKey = null;
        this.password: null,
    },
    //if fails should tell us why.
    validate: function(data) {
        var validator = getValidator();

        if (validator.isEmailInSystem(data.email) !== true) {
            return validator.isEmailInSystem(data.email);
        } else if (validator.isPassword(data.password) !== true) {
            return validator.isPassword(data.password);
        } else if (validator.checkAPIKEY(data.apiKey) !== true) {
            return validator.checkAPIKEY(data.apiKey);
        }

        //if everything is good return clean.
        return true;
    },

    loginInProcess: function(email, didfailLogin) {
        var model = require(MODELS + moduleName + 'Model');
        var m = new model();
        m.init();
        m.create(email, didfailLogin);
        m.cleanUp();
    }
};
