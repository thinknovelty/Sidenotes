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

module.exports = {
    first_name: null,
    last_name: null,
    apikey: null,
    email: null,
    password: null,
    birthday: null,
    sex: null,
    init: function(req, res, call) {
        if (call.apikey) {
            this.apikey = call.apikey;
        }
        if (call.email) {
            this.email = call.email;
        }
        if (call.password) {
            this.password = call.password;
        }
        if (call.first_name) {
            this.first_name = call.first_name;
        }
        //this get turned into a date obj 
        if (call.birthday) {
            try {
                this.birthday = new Date(call.birthday);
            } catch (err) {
                appLogger.error('Error in controller init() ' + err);
            }
        }
        if (call.last_name) {
            this.last_name = call.last_name;
        }
        //1 = male , 0 = female
        if (call.sex) {
            this.sex = Boolean(call.sex);
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

        var isvalid = this.validate();
        if (isvalid !== true) {
            callback([{
                message: 'Failed registration process.',
                error: CODE_REGISTER_ERROR,
                errormsg: isvalid
            }]);
        } else if (isvalid == true) {

            var model = require(MODELS + this.moduleName + 'Model');
            var m = new model();
            m.init();
            // bundle the obj and adds salt and registrationKey;
            var userData = {
                email: this.email,
                first_name: this.first_name,
                last_name: this.last_name,
                birthday: this.birthday,
                password: this.password,
                sex: this.sex,
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
        this.apikey = null;
        this.email = null;
        this.password = null;
        this.first_name = null;
        this.last_name = null;
        this.birthday = null;
    },
    //if fails should tell us why.
    validate: function() {
        var validatorModel = getValidator();
        var v = new validatorModel();

        if (v.checkAPIKEY(this.apikey) !== true) {
            return v.checkAPIKEY(this.apikey);
        } else if (v.isEmail(this.email) !== true) {
            return v.isEmail(this.email);
        } else if (v.isPassword(this.password) !== true) {
            return v.isPassword(this.password);
        } else if (v.isFirstname(this.first_name) !== true) {
            return v.isFirstname(this.first_name);
        } else if (v.isLastname(this.last_name) !== true) {
            return v.isLastname(this.last_name);
        } else if (v.isDateofbirth(this.birthday) !== true) {
            return v.isDateofbirth(this.birthday);
        } else if (v.isSex(this.sex) !== true) {
            return v.isSex(this.sex);
        }
        //TODO: check if email,username, are not used in DB
        return true;
    }
};
