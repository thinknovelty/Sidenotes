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

    results: function(callback) {
        var data = {
            email: this.email,
            apiKey: this.apiKey,
            password: this.password
        };
        var isValid = this.validate(data);
        if (isValid !== true && data.email) {
            //true is set becuase we failed to vaildate. now we will record the failed attempt. We WILL GET THAT HACKER!!
            m.create(data.email, true, function(didLogin) {
                if (didLogin) {
                    callback([{
                        message: 'Login failed login attempt has been recorded.',
                        success: 0,
                        error: 1,
                        errormsg: isValid,
                    }]);
                } else {
                    callback([{
                        message: 'Login failed login attempt has not been recorded.',
                        success: 0,
                        error: 1,
                        errormsg: isValid,
                    }]);
                }
            });
        } else if (isValid !== true) {
            callback([{
                message: 'Login failed attempt please check errormsg for details.',
                success: 0,
                error: 1,
                errormsg: isValid,

            }]);
        } else if (isValid == true) {
            var model = require(MODELS + moduleName + 'Model');
            var m = new model();
            m.init();
            m.create(data.email, false, function(didLogin) {
                if (didLogin) {
                    callback([{
                        message: 'Login Successfully',
                        success: 1,
                        error: 0
                    }]);
                } else {
                    callback([{
                        message: 'Login failed due to DB issue.',
                        success: 0,
                        error: 0
                    }]);
                }
            });
        }
    },

    cleanUp: function() {
        this.email = null;
        this.apiKey = null;
        this.password = null;
    },
    //if fails should tell us why.
    validate: function(data) {
        var validatorModel = getValidator();
        var v = new validatorModel(data.email);
        v.init();
        if (v.isEmailInSystem(data.email) !== true) {
            return v.isEmailInSystem(data.email);
        } else if (v.isPassword(data.password) !== true) {
            return v.isPassword(data.password);
        } else if (v.checkAPIKEY(data.apiKey) !== true) {
            return v.checkAPIKEY(data.apiKey);
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
