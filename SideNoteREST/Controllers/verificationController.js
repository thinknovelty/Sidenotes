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

module.exports = {
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
        if (this.callType === 'GET') {
            this.getResults(callback)
        } else if (this.callType === 'POST') {
            this.postResults(callback);
        } else if (this.callType === 'PUT') {
            this.putResults(callback);
        } else if (this.callType === 'DELETE') {
            this.deleteResults(callback);
        }
    },

    putResults: function(callback) {
        // bundle the data
        var data = {
            email: this.email,
            registrationKey: this.registrationKey,
            password: this.password
        };
        //error codes
        var CODE_VERIFCATION_ERROR = this.CODE_VERIFCATION_ERROR;
        var ERROR_NO_ERROR = this.ERROR_NO_ERROR;

        //check for valid data.
        this.validate(data, function(isvalid) {
            if (isvalid !== true) {
                callback([{
                    message: 'Verification failed please check errormsg for details.',
                    success: 0,
                    error: CODE_VERIFCATION_ERROR,
                    errormsg: isvalid
                }]);
            } else if (isvalid === true) {
                var model = require(MODELS + 'Register' + 'Model');
                var m = new model();
                m.isVerified(data.email, function(isVerified, err) {
                    if (isVerified) {
                        callback([{
                            message: 'Verification process failed',
                            success: 00,
                            error: CODE_VERIFCATION_ERROR,
                            errormsg: err
                        }]);
                    } else {
                        m.update(data.email, function(bool, err) {
                            if (bool) {
                                callback([{
                                    message: 'Verification Successfully',
                                    success: 1,
                                    uuid: err,
                                    error: ERROR_NO_ERROR
                                }]);
                            } else {
                                callback([{
                                    message: 'Verification failed due to DB issue.',
                                    success: 0,
                                    error: CODE_VERIFCATION_ERROR,
                                    errormsg: err
                                }]);
                            }
                            m.cleanUp();
                        });
                    }
                });
            }
        });
    },

    getResults: function(callback) {
        callback([{
            message: 'call is not set up for a get call.',
            success: 0,
            error: this.CODE_VERIFCATION_ERROR
        }]);
    },

    deleteResults: function(callback) {
        callback([{
            message: 'call is not set up for a get delete.',
            success: 0,
            error: this.CODE_VERIFCATION_ERROR
        }]);
    },

    postResults: function(callback) {
        callback([{
            message: 'call is not set up for a get post.',
            success: 0,
            error: this.CODE_VERIFCATION_ERROR
        }]);
    },

    cleanUp: function() {
        this.email = null;
        this.registerKey = null;
    },
    //if fails should tell us why.
    validate: function(data, callback) {
        var validatorModel = getValidator();
        var v = new validatorModel(data.email);
        if (v.isEmail(data.email) !== true) {
            callback(v.isEmail(data.email));
            return;
        }
        v.isEmailInSystem(data.email, function(didfail, err) {
            if (didfail) {
                callback(err);
            } else {
                v.isPassword(data.password, function(didfail, err) {
                    if (didfail) {
                        callback(err);
                    } else {
                        v.isRegistrationKey(data.registrationKey, function(didfail, err) {
                            if (didfail) {
                                callback(err);
                            } else {
                                callback(true);
                            }
                        });
                    }
                });
            }
        });
    }
};
