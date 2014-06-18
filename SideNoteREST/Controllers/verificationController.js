'use strict';
// -----------------------------------------------------------
//verificationController.js






//tables:
//user_verification, user_login

// ------------------------------------------------------------
var moduleName = 'verification';

// Usage: 
//this is the controller used for managering a user who activates his or her account.

//if fails should tell us why.
var validate = function(data) {
    var validator = getValidator();
    if (validator.isEmail(data.email) !== true) {
        return validator.isEmail(data.email);
    } else if (validator.isEmailInSystem(data.email) !== true) {
        return validator.isEmailInSystem(data.email);
    } else if (validator.isRegistrationKey(data.registrationKey) !== true) {
        return validator.isRegistrationKey(data.registrationKey);
    }
    //if everything is good return clean.
    return true;
};

module.exports = extend(getControllerBase(), {
    callType: 'PUT',
    email: null,
    registrationKey: null,
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

        // bundle the data
        var data = {
            email: this.email,
            registrationKey: this.registrationKey,
            password: this.password
        };

        if (validate(data) == true) {
            var model = require(MODELS + 'Register' + 'Model');

            model.init();
            model.update(data.email);
            model.cleanUp();

            return [{
                Message: 'Successfully registered'
            }];
        }

        return [{
            Error: validate(data)
        }];
    },

    cleanUp: function() {
        this.email = null;
        this.registerKey = null;
    }
});
