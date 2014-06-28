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

module.exports = {
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
        callback([{
            message: 'call is not set up for a get put.',
            success: 0,
            error: this.CODE_LOGIN_ERROR
        }]);
    },

    getResults: function(callback) {
        callback([{
            message: 'call is not set up for a get call.',
            success: 0,
            error: this.CODE_LOGIN_ERROR
        }]);
    },

    deleteResults: function(callback) {
        callback([{
            message: 'call is not set up for a get delete.',
            success: 0,
            error: this.CODE_LOGIN_ERROR
        }]);
    },

    postResults: function(callback) {
        var data = {
            email: this.email,
            apiKey: this.apiKey,
            password: this.password
        };

        //error codes
        var CODE_LOGIN_ERROR = this.CODE_LOGIN_ERROR;
        var ERROR_NO_ERROR = this.ERROR_NO_ERROR;
        var isValid = this.validate(data);

        var model = require(MODELS + this.moduleName + 'Model');
        var m = new model();
        m.init();

        if (isValid !== true && data.email) {
            //true is set becuase we failed to vaildate. now we will record the failed attempt. We WILL GET THAT HACKER!!
            m.create(data.email, true, function(didLogin, err) {
                if (didLogin) {
                    callback([{
                        message: 'Login failed login attempt has been recorded.',
                        success: 00,
                        error: CODE_LOGIN_ERROR,
                        errormsg: isValid + '' + err,
                    }]);
                } else {
                    callback([{
                        message: 'Login failed login attempt has not been recorded.',
                        success: 00,
                        error: CODE_LOGIN_ERROR,
                        errormsg: isValid + '' + err,
                    }]);
                }
                m.cleanUp();
            });
        } else if (isValid !== true) {
            callback([{
                message: 'Login failed attempt please check errormsg for details.',
                success: 00,
                error: CODE_LOGIN_ERROR,
                errormsg: isValid,

            }]);
            m.cleanUp();
        } else if (isValid == true) {
            m.create(data.email, false, function(didLogin, err) {
                if (didLogin) {
                    callback([{
                        message: 'Login Successfully',
                        success: 1,
                        uuid: err,
                        error: ERROR_NO_ERROR,
                    }]);
                } else {
                    callback([{
                        message: 'Login failed due to DB issue.',
                        success: 0,
                        error: CODE_LOGIN_ERROR,
                        errormsg: err,
                    }]);
                }
            });
            m.cleanUp();
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
        var model = require(MODELS + this.moduleName + 'Model');
        var m = new model();
        m.init();
        m.create(email, didfailLogin);
        m.cleanUp();
    }
};
