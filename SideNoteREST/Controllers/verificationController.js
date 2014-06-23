'use strict';
// -----------------------------------------------------------
//verificationController.js

//variables:
// email
// registrationKey
// password

//Call Types:
// PUT:
// localhost/verification/

// PUT Variables:
// email = example@gmail.com
// password = 1234123
// registrationKey = 12321dqe1231dfqwe123fwe12345t



//tables:
//user_verification, user_login

// ------------------------------------------------------------

// Usage: 
//this is the controller used for managering a user who activates his or her account.

//if fails should tell us why.
var validate = function(data) {
    var validatorModel = getValidator();
    var v = new validatorModel(data.email);
    if (v.isEmail(data.email) !== true) {
        return v.isEmail(data.email);
    } else if (v.isEmailInSystem(data.email) !== true) {
        return v.isEmailInSystem(data.email);
    } else if (v.isRegistrationKey(data.registrationKey) !== true) {
        return v.isRegistrationKey(data.registrationKey);
    } else if (v.isPassword(data.password) !== true) {
        return v.isPassword(data.password);
    }

    //if everything is good return clean.
    return true;
};

module.exports = {
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

    results: function(callback) {
        // bundle the data
        var data = {
            email: this.email,
            registrationKey: this.registrationKey,
            password: this.password
        };

        //check for valid data.
        var isvalid = validate(data);

        if (isvalid !== true) {
            callback([{
                message: 'Verification failed please check errormsg for details.',
                success: 0,
                error: 03,
                errormsg: validate(data)
            }]);
        } else if (isvalid === true) {
            var model = require(MODELS + 'Register' + 'Model');
            var m = new model();
            m.update(data.email, function(bool, err) {
                if (bool) {
                    callback([{
                        message: 'Verification Successfully',
                        success: 1,
                        error: 00,
                        errormsg: err
                    }]);
                } else {
                    callback([{
                        message: 'Verification failed due to DB issue.',
                        success: 0,
                        error: 00,
                        errormsg: err
                    }]);
                }
                m.cleanUp();
            });
        }
    },

    cleanUp: function() {
        this.email = null;
        this.registerKey = null;
    }
};
