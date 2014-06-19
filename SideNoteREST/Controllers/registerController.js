'use strict';
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

var moduleName = 'register';

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

    var validator = getValidator();

    if (validator.checkAPIKEY(apikey) !== true) {
        return validator.checkAPIKEY(apikey);
    } else if (validator.isEmail(email) !== true) {
        return validator.isEmail(email);
    } else if (validator.isPassword(password) !== true) {
        return validator.isPassword(password);
    } else if (validator.isFirstname(first_name) !== true) {
        return validator.isFirstname(first_name);
    } else if (validator.isLastname(last_name) !== true) {
        return validator.isLastname(last_name);
    } else if (validator.isDateofbirth(birthday) !== true) {
        return validator.isDateofbirth(birthday);
    } else if (validator.isSex(sex) !== true) {
        return validator.isSex(sex);
    }

    //TODO: check if email,username, are not used in DB
    return true;
};


module.exports = {
    callType: 'POST',

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
                appLogger().error('Error in controller init() ' + err);
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

    setApikey: function(apikey) {
        apikey = apikey;
    },

    getApikey: function() {
        return apikey;
    },
    setEmail: function(par) {
        email = par;
    },
    getEmail: function() {
        return email;

    },
    setpassword: function(par) {
        password = par;
    },
    getpassword: function() {
        return password;

    },
    setfirst_name: function(par) {
        first_name = par;
    },
    getFirsname: function() {
        return first_name;

    },
    setlast_name: function(par) {
        last_name = par;
    },
    getlast_name: function() {
        return last_name;

    },
    getbirthday: function() {
        return birthday;

    },
    setbirthday: function(par) {
        birthday = par;
    },

    results: function() {
        if (validate() == true) {
            var model = require(MODELS + moduleName + 'Model');
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

            m.create(userData);
            m.cleanUp();

            return [{
                Message: 'Successfully registered'
            }];
        }
        return [{
            Error: validate()
        }];
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
