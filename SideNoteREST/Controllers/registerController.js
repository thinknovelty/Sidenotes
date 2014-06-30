// -----------------------------------------------------------
//registerController.js

//Call Types:
// POST:
// localhost/register/

// POST Variables:
// email = example@gmail.com
// password = 1234123
// first_name = John
// last_name = Doe
// birthday = MM-DD-YYYY
// sex = 0







//tables:
//USER, USER_CREDENTIALS, USER_ACCOUNT, USER_VERIFICATION
// ------------------------------------------------------------

//defaults
var first_name = null;
var last_name = null;
var apikey = null;
var email = null;
var password = null;
var birthday = null;
var sex = null;

//if fails should tell us why.
var validate = function() {

    var validatorModel = getValidator();
    var v = new validatorModel();

    if (v.checkAPIKEY(apikey) !== true) {
        return v.checkAPIKEY(apikey);
    } else if (v.isEmail(email) !== true) {
        return v.isEmail(email);
    } else if (v.isPassword(password) !== true) {
        return v.isPassword(password);
    } else if (v.isFirstname(first_name) !== true) {
        return v.isFirstname(first_name);
    } else if (v.isLastname(last_name) !== true) {
        return v.isLastname(last_name);
    } else if (v.isDateofbirth(birthday) !== true) {
        return v.isDateofbirth(birthday);
    } else if (v.isSex(sex) !== true) {
        return v.isSex(sex);
    }

    //TODO: check if email,username, are not used in DB
    return true;
};


module.exports = {

    init: function(req, res, call) {
        if (call.apikey) {
            apikey = call.apikey;
        }
        if (call.email) {
            email = call.email;
        }
        if (call.password) {
            password = call.password;
        }
        if (call.first_name) {
            first_name = call.first_name;
        }
        //this get turned into a date obj 
        if (call.birthday) {
            try {
                birthday = new Date(call.birthday);
            } catch (err) {
                appLogger.error('Error in controller init() ' + err);
            }
        }
        if (call.last_name) {
            last_name = call.last_name;
        }
        //1 = male , 0 = female
        if (call.sex) {
            sex = Boolean(call.sex);
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
            error: this.CODE_REGISTER_ERROR
        }]);
    },

    getResults: function(callback) {
        callback([{
            message: 'call is not set up for a get call.',
            success: 0,
            error: this.CODE_REGISTER_ERROR
        }]);
    },

    deleteResults: function(callback) {
        callback([{
            message: 'call is not set up for a get delete.',
            success: 0,
            error: this.CODE_REGISTER_ERROR
        }]);
    },

    postResults: function(callback) {
        //error codes
        var CODE_REGISTER_ERROR = this.CODE_REGISTER_ERROR;
        var ERROR_NO_ERROR = this.ERROR_NO_ERROR;

        var isvalid = validate();
        if (isvalid !== true) {
            callback([{
                message: 'Failed registion process.',
                error: CODE_REGISTER_ERROR,
                errormsg: validate()
            }]);
        } else if (isvalid == true) {

            var model = require(MODELS + this.moduleName + 'Model');
            var m = new model();
            m.init();
            // bundle the obj and adds salt and registrationKey;
            var userData = {
                email: email,
                first_name: first_name,
                last_name: last_name,
                birthday: birthday,
                password: password,
                sex: sex,
                salt: this.generateKey(),
                registrationKey: this.generateKey()
            };

            //salt to password, we pick a random spot to insert into the password hash.
            var hashpwd = getDecrypter().hashSync(userData.password);
            var pos = Math.floor(Math.random() * (hashpwd.length + 1));
            hashpwdSalted = hashpwd.substr(0, pos) + userData.salt + hashpwd.substr(pos);
            userData.password = hashpwdSalted;

            m.isRegistered(userData.email, function(isReg) {
                if (isReg) {
                    callback([{
                        message: 'Failed registion process.',
                        success: 00,
                        error: CODE_REGISTER_ERROR,
                        errormsg: 'User is already registered.'
                    }]);
                } else {
                    m.create(userData, function(bool, err) {
                        if (bool) {
                            callback([{
                                message: 'Successfully registered.',
                                success: 01,
                                error: ERROR_NO_ERROR
                            }]);
                        } else {
                            callback([{
                                message: 'Failed registered due to db issue.',
                                success: 00,
                                error: CODE_REGISTER_ERROR,
                                errormsg: err,
                            }]);
                        }
                        m.cleanUp();
                    });
                }
            });
        }
    },

    cleanUp: function() {
        apikey = null;
        email = null;
        password = null;
        first_name = null;
        last_name = null;
        birthday = null;
    }
};
